/**
 * Build-time script: generates public/build-info.json with commit metadata.
 *
 * Reads from Netlify build env vars (COMMIT_REF, CONTEXT, BRANCH)
 * and falls back to git CLI for local builds.
 */

const { execSync } = require('child_process')
const { writeFileSync, mkdirSync } = require('fs')
const { dirname } = require('path')

const OUTPUT_PATH = 'public/build-info.json'

function getEnvOrExec(envVar, cmd) {
  const env = process.env[envVar]
  if (env && env.length > 0) return env
  try {
    return execSync(cmd, { encoding: 'utf8' }).trim()
  } catch {
    return 'unknown'
  }
}

const info = {
  commit: getEnvOrExec('COMMIT_REF', 'git rev-parse HEAD'),
  builtAt: new Date().toISOString(),
  context: getEnvOrExec('CONTEXT', 'echo local'),
  branch: getEnvOrExec('BRANCH', 'git rev-parse --abbrev-ref HEAD'),
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true })
writeFileSync(OUTPUT_PATH, JSON.stringify(info, null, 2))

console.log(`[build-info] wrote ${OUTPUT_PATH}:`, info)
