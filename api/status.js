// Step 6 · /api/status · single health endpoint
export default async function handler(req, res) {
  const now = new Date().toISOString();
  const memUsage = process.memoryUsage();
  // Fetch live counts from CDN endpoints (server-side)
  const probes = await Promise.allSettled([
    fetch('https://atlasos.me/arms-pages/_index.json', {cache:'no-cache'}).then(r => r.json()).catch(() => null),
    fetch('https://atlasos.me/projects/_index.json', {cache:'no-cache'}).then(r => r.json()).catch(() => null),
    fetch('https://atlasos.me/moat-f5.json', {cache:'no-cache'}).then(r => r.json()).catch(() => null),
    fetch('https://atlasos.me/cost-monitor.json', {cache:'no-cache'}).then(r => r.json()).catch(() => null),
    fetch('https://atlasos.me/moat-drift.json', {cache:'no-cache'}).then(r => r.json()).catch(() => null),
  ]);
  const [arms, projects, f5, cost, drift] = probes.map(p => p.status === 'fulfilled' ? p.value : null);
  return res.status(200).json({
    timestamp: now,
    arms: arms ? { count: arms.arms?.length || 0, last_aggregate: arms.generated_at } : { error: 'fetch failed' },
    projects: projects ? { count: projects.projects?.length || 0, last_extract: projects.generated_at } : { error: 'fetch failed' },
    f5: f5 ? { last_generated: f5.generated_at, has_pair: !!f5.pair } : { error: 'fetch failed' },
    cost: cost ? { status: cost.status, used: cost.budget?.used_usd, remaining: cost.budget?.remaining_usd } : { error: 'fetch failed' },
    drift: drift ? { threshold: drift._meta?.threshold, sample: Object.keys(drift).filter(k => !k.startsWith('_')).length } : { error: 'fetch failed' },
    runtime: {
      uptime_sec: Math.round(process.uptime()),
      memory_rss_mb: Math.round(memUsage.rss / 1024 / 1024),
      memory_heap_mb: Math.round(memUsage.heapUsed / 1024 / 1024),
      node_version: process.version,
    },
  });
}
