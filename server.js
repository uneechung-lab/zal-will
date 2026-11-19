const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const apiHandler = require('./api/index.js');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (urlObj.pathname.startsWith('/api/')) {
    delete require.cache[require.resolve('./api/index.js')];
    const freshApiHandler = require('./api/index.js');
    return freshApiHandler(req, res);
  }

  let decodedPath = urlObj.pathname;
  try {
    decodedPath = decodeURIComponent(urlObj.pathname);
  } catch {
    decodedPath = urlObj.pathname;
  }
  let filePath = path.join(PUBLIC_DIR, decodedPath === '/' ? 'index.html' : decodedPath);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(PUBLIC_DIR, 'index.html');
  }

  try {
    const ext = path.extname(filePath).toLowerCase();
    const content = fs.readFileSync(filePath);
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`ZAL-WILL server running on http://localhost:${PORT}`);
});
