// Token-fetch · injects __HERMES_SESSION_TOKEN__ at runtime
// Per shared.md prior gap · /chat needs token to connect to api.atlasos.me
(async function() {
  try {
    const r = await fetch('/api/session-token', {cache:'no-cache'});
    if (r.ok) {
      const d = await r.json();
      if (d.token) {
        window.__HERMES_SESSION_TOKEN__ = d.token;
        window.__HERMES_DASHBOARD_EMBEDDED_CHAT__ = true;
      }
    }
  } catch (e) {
    console.warn('token-fetch failed', e);
  }
})();
