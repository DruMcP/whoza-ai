async function sendAlert(checks: IntegrityCheck[], now: Date) {
  const failedChecks = checks.filter(c => c.status !== "ok");
  const priority = failedChecks.some(c => c.status === "error") ? "P1" : "P2";
  
  const alertPayload = {
    title: `[${priority}] Whoza.ai Database Integrity Alert`,
    message: `${failedChecks.length} integrity checks failed`,
    priority,
    source: "whoza-db-integrity",
    alias: `whoza-db-integrity-${now.toISOString().split("T")[0]}`,
    tags: ["database", "integrity", "autonomous-agent"],
    details: {
      failed_checks: String(failedChecks.length),
      checks: failedChecks.map(c => `${c.check_name}: ${c.status}`).join("; "),
      timestamp: now.toISOString(),
    },
  };

  const alertopsKey = Deno.env.get("ALERTOPS_API_KEY");
  const opsgenieKey = Deno.env.get("OPSGENIE_API_KEY");
  
  if (alertopsKey) {
    const res = await fetch("https://api.alertops.com/v2/alerts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${alertopsKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alertPayload),
    });

    if (!res.ok) {
      console.error("Failed to send AlertOps alert:", await res.text());
    } else {
      console.log(`✅ AlertOps ${priority} alert sent`);
    }
  } else if (opsgenieKey) {
    const res = await fetch("https://api.opsgenie.com/v2/alerts", {
      method: "POST",
      headers: {
        "Authorization": `GenieKey ${opsgenieKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alertPayload),
    });

    if (!res.ok) {
      console.error("Failed to send Opsgenie alert:", await res.text());
    } else {
      console.log(`✅ Opsgenie ${priority} alert sent (legacy)`);
    }
  }
}
