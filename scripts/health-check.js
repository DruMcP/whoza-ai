#!/usr/bin/env node
/**
 * Health Check Script
 *
 * Tests critical endpoints for whoza.ai staging and production.
 * Run with: node scripts/health-check.js [baseUrl]
 * Default baseUrl: https://whoza-ai-staging.netlify.app
 */

const BASE_URL = process.argv[2] || "https://whoza-ai-staging.netlify.app";
const TIMEOUT_MS = 5000;

const ENDPOINTS = [
  { path: "/", name: "Homepage", method: "GET" },
  { path: "/privacy", name: "Privacy Policy", method: "GET" },
  { path: "/terms", name: "Terms of Service", method: "GET" },
  { path: "/dashboard", name: "Dashboard", method: "GET" },
  { path: "/api/rex", name: "Rex API", method: "GET" },
  { path: "/api/trillet-webhook", name: "Trillet Webhook", method: "GET" },
  { path: "/api/enquiries", name: "Enquiries API", method: "GET" },
];

async function checkEndpoint({ path, name, method }) {
  const url = `${BASE_URL}${path}`;
  const start = Date.now();

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(url, {
      method,
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    clearTimeout(timer);
    const duration = Date.now() - start;
    const ok = response.status === 200;

    return {
      name,
      url,
      status: response.status,
      duration,
      ok,
    };
  } catch (error) {
    const duration = Date.now() - start;
    return {
      name,
      url,
      status: error.name === "AbortError" ? "TIMEOUT" : "ERROR",
      duration,
      ok: false,
      error: error.message,
    };
  }
}

async function runHealthCheck() {
  console.log(`\n🔍 Health Check: ${BASE_URL}\n`);

  const results = await Promise.all(ENDPOINTS.map(checkEndpoint));

  let passed = 0;
  let failed = 0;

  for (const result of results) {
    const icon = result.ok ? "✅" : "❌";
    const statusText =
      typeof result.status === "number" ? `HTTP ${result.status}` : result.status;
    console.log(
      `${icon} ${result.name.padEnd(20)} ${statusText.padEnd(12)} ${result.duration}ms`
    );
    if (!result.ok && result.error) {
      console.log(`   → ${result.error}`);
    }
    if (result.ok) passed++;
    else failed++;
  }

  console.log(`\n${"─".repeat(50)}`);
  console.log(`Passed: ${passed} / ${results.length}`);
  console.log(`Failed: ${failed} / ${results.length}`);

  if (failed > 0) {
    console.log("\n⚠️  Health check failed.");
    process.exit(1);
  } else {
    console.log("\n🎉 All systems operational.");
    process.exit(0);
  }
}

runHealthCheck();