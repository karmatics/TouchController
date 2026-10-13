// Zero-dependency Node.js WebRTC Signaling Server
// Run with: node TouchController/signal-server.js
const http = require('http');

const PORT = process.env.PORT || 3000;
const subscribers = new Map(); // topic -> Set of response streams

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const parts = pathname.split('/').filter(Boolean);

  // Expecting /signal/:topic or /:topic
  const topic = parts[parts.length - 1] || 'default';

  if (req.method === 'GET') {
    // SSE Realtime stream
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    res.write('retry: 1000\n\n');

    if (!subscribers.has(topic)) {
      subscribers.set(topic, new Set());
    }
    const pool = subscribers.get(topic);
    pool.add(res);

    req.on('close', () => {
      pool.delete(res);
      if (pool.size === 0) subscribers.delete(topic);
    });
    return;
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));

      // Broadcast payload to all SSE subscribers on this topic
      const pool = subscribers.get(topic);
      if (pool) {
        const sseData = `data: ${body}\n\n`;
        pool.forEach(clientRes => {
          try { clientRes.write(sseData); } catch (e) {}
        });
      }
    });
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(PORT, () => {
  console.log(`[accuCad] WebRTC Signaling Server listening on http://localhost:${PORT}`);
});