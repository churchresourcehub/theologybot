// Reads the live Church Resource Hub and returns its cards, so the Practice tab
// mirrors the Hub automatically. Cached at the edge for 5 minutes.
export default async function handler(req, res) {
  try {
    const r = await fetch('https://churchresourcehub.github.io/index.html', { cache: 'no-store' });
    if (!r.ok) { res.status(502).json({ error: 'hub fetch ' + r.status }); return; }
    const html = await r.text();
    const m = html.match(/const RESOURCES = (\[[\s\S]*?\n\]);/);
    if (!m) { res.status(502).json({ error: 'RESOURCES not found on hub' }); return; }
    const cards = Function('"use strict"; return (' + m[1] + ')')();  // Hub is our own trusted origin
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400');
    res.status(200).json(cards);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
