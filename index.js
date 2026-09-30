// index.js
export default async function handler(req, res) {
  const upgrade = req.headers.upgrade;

  // اگر درخواست WebSocket است
  if (upgrade && upgrade.toLowerCase() === 'websocket') {
    // دریافت سوکت‌ها
    const { socket: clientSocket, response } = req;

    // وقتی کلاینت پیامی فرستاد
    clientSocket.on('message', (msg) => {
      // در اینجا می‌توانید ترافیک را به یک سرور دیگر پروکسی کنید
      // اما برای تست اتصال V2Ray، ما فقط اتصال را باز نگه می‌داریم
      // یا اگر می‌خواهید یک Proxy واقعی باشد، کد اتصال به سرور مقصد اینجا می‌آید
      
      // برای تست ساده، ما فقط سیگنال موفقیت می‌دهیم
      // clientSocket.send('Connected');
    });

    clientSocket.on('close', () => {
      console.log('Client disconnected');
    });

    // ارسال پاسخ 101 Switching Protocols
    response.writeHead(101, {
      'Upgrade': 'websocket',
      'Connection': 'Upgrade',
      'Sec-WebSocket-Accept': 'accept-string' // مقدار ساده شده برای تست
    });

    return; // پایان پردازسی برای WebSocket
  }

  // اگر درخواست WebSocket نبود (مثل باز کردن سایت در مرورگر)
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
      <body>
        <h1>Vercel V2Ray Proxy is Running</h1>
        <p>Status: Online</p>
        <p>Use this URL for your V2Ray config:</p>
        <code>${req.headers.host}/</code>
      </body>
    </html>
  `);
}
