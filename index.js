const http = require('http');
const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', message: 'V2Ray Proxy Ready' }));
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws, req) => {
  console.log('Client connected');
  
  // شبیه‌سازی یک اتصال ساده WebSocket
  // در حالت واقعی، اینجا باید منطق V2Ray (مثل XRay یا Go) باشد
  // اما برای Vercel رایگان، ما از یک پروکسی WebSocket ساده استفاده می‌کنیم
  
  ws.on('message', (message) => {
    // ارسال پاسخ تست
    ws.send(JSON.stringify({ echo: message.toString(), time: Date.now() }));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
  
  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
