const http = require('http');
const { WebSocketServer } = require('ws');

const server = http.createServer((req, res) => {
  // اگر درخواست ساده HTTP است (مثلاً باز کردن لینک در مرورگر)
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    status: 'ok', 
    message: 'Proxy Server is Running',
    timestamp: new Date().toISOString()
  }));
});

// ایجاد WebSocket Server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws, req) => {
  console.log('WebSocket Client Connected');
  
  ws.on('message', (message) => {
    // دریافت داده از کلاینت و ارسال پاسخ (برای تست)
    console.log('Received:', message.toString());
    ws.send(JSON.stringify({ 
      echo: 'Server Response', 
      time: Date.now() 
    }));
  });

  ws.on('close', () => {
    console.log('Client Disconnected');
  });

  ws.on('error', (err) => {
    console.error('WebSocket Error:', err);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
