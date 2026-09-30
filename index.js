// index.js
export default async function handler(req, res) {
  // بررسی WebSocket
  if (req.headers.upgrade && req.headers.upgrade.toLowerCase() === 'websocket') {
    const { socket: clientSocket, response } = req;
    
    // ارسال هدر 101
    response.writeHead(101, {
      'Upgrade': 'websocket',
      'Connection': 'Upgrade',
      'Sec-WebSocket-Accept': 'accept-string'
    });

    clientSocket.on('close', () => {
      console.log('WS Closed');
    });

    return;
  }

  // پاسخ HTML برای مرورگر
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <title>Vercel Proxy Status</title>
        <style>
            body { font-family: Tahoma, sans-serif; background: #1a1a1a; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .container { text-align: center; background: #333; padding: 40px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
            h1 { color: #00d2ff; }
            p { color: #ccc; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>✅ سرور با موفقیت فعال است</h1>
            <p>اگر این صفحه را می‌بینید، دیپلوی درست انجام شده است.</p>
            <p>Host: <b>${req.headers.host}</b></p>
        </div>
    </body>
    </html>
  `);
}
