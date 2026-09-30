// index.js
export default async function handler(req, res) {
  // 1. بررسی WebSocket
  if (req.headers.upgrade && req.headers.upgrade.toLowerCase() === 'websocket') {
    // اگر درخواست WebSocket است، اتصال را برقرار کن
    const { socket: clientSocket, response } = req;
    
    // ارسال هدرهای 101
    response.writeHead(101, {
      'Upgrade': 'websocket',
      'Connection': 'Upgrade',
      'Sec-WebSocket-Accept': 'accept-string'
    });

    // رویدادهای سوکت
    clientSocket.on('close', () => {
      console.log('WS Closed');
    });

    return; // پایان پردازش
  }

  // 2. اگر درخواست عادی (HTTP) است، صفحه HTML را نمایش بده
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`
    <html>
      <head>
        <title>Vercel Proxy Status</title>
        <style>
          body { font-family: sans-serif; padding: 20px; background: #f5f5f5; }
          .box { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
          h1 { color: #0070f3; }
          code { background: #eee; padding: 2px 5px; border-radius: 3px; }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>✅ Vercel V2Ray Proxy is Running</h1>
          <p><strong>Status:</strong> Online</p>
          <p><strong>Host:</strong> <code>${req.headers.host}</code></p>
          <p><strong>Path for Config:</strong> <code>/</code></p>
          <p>If you see this page, your Vercel deployment is correct.</p>
        </div>
      </body>
    </html>
  `);
}
