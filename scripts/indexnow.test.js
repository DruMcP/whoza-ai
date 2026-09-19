/**
 * node:test suite for IndexNow gating policy.
 * Run: node --test scripts/indexnow.test.js
 */
const { test } = require('node:test')
const assert = require('node:assert/strict')
const {
  selectUrls,
  applySubmission,
  MAX_URLS_PER_RUN,
} = require('./indexnow-core')

const DAY = 24 * 60 * 60 * 1000
const NOW = Date.parse('2026-09-19T12:00:00Z')

function hashes(n) {
  const h = {}
  for (let i = 0; i < n; i++) h[`https://whoza.ai/page-${i}`] = `hash-${i}`
  return h
}

test('hard cap: more than 50 eligible URLs aborts the run', () => {
  const store = { urls: {} }
  const result = selectUrls(store, hashes(51), NOW)
  assert.equal(result.urls.length, 0)
  assert.match(result.aborted, /HARD CAP/)
})

test('hard cap: exactly 50 eligible URLs passes', () => {
  const store = { urls: {} }
  const result = selectUrls(store, hashes(50), NOW)
  assert.equal(result.urls.length, 50)
  assert.equal(result.aborted, null)
})

test('30-day rule: recently submitted URL is skipped even when hash changed', () => {
  const store = {
    urls: {
      'https://whoza.ai/a': { hash: 'old', lastSubmittedAt: NOW - 10 * DAY },
    },
  }
  const result = selectUrls(store, { 'https://whoza.ai/a': 'new' }, NOW)
  assert.deepEqual(result.urls, [])
  assert.match(result.reasons['https://whoza.ai/a'], /30 days/)
})

test('changed hash after 30 days is eligible again', () => {
  const store = {
    urls: {
      'https://whoza.ai/a': { hash: 'old', lastSubmittedAt: NOW - 31 * DAY },
    },
  }
  const result = selectUrls(store, { 'https://whoza.ai/a': 'new' }, NOW)
  assert.deepEqual(result.urls, ['https://whoza.ai/a'])
})

test('unchanged hash after 30 days is not resubmitted', () => {
  const store = {
    urls: {
      'https://whoza.ai/a': { hash: 'same', lastSubmittedAt: NOW - 31 * DAY },
    },
  }
  const result = selectUrls(store, { 'https://whoza.ai/a': 'same' }, NOW)
  assert.deepEqual(result.urls, [])
})

test('applySubmission records hash and timestamp for next run', () => {
  const store = { urls: {} }
  const h = { 'https://whoza.ai/a': 'hash-a' }
  const next = applySubmission(store, ['https://whoza.ai/a'], h, NOW)
  assert.equal(next.urls['https://whoza.ai/a'].hash, 'hash-a')
  assert.equal(next.urls['https://whoza.ai/a'].lastSubmittedAt, NOW)
  // And it is then skipped by the 30-day rule
  const follow = selectUrls(next, h, NOW + 5 * DAY)
  assert.deepEqual(follow.urls, [])
})
