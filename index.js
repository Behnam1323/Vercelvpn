// index.js
// این کد یک WebSocket Proxy برای V2Ray (VLESS/WireGuard) روی Vercel ایجاد می‌کند

export default async function handler(request) {
  // بررسی می‌کنیم که آیا درخواست شامل "Upgrade: websocket" هست یا نه
  // این هدر نشان‌دهنده درخواست برای ارتقا به پروتکل WebSocket است
  
  const upgrade = request.headers.get('upgrade');
  
  if (upgrade && upgrade.toLowerCase() === 'websocket') {
    // ایجاد یک جفت Socket برای ارتباط بین کلاینت و سرور
    const { socket: clientSocket, response } = request;
    
    // وقتی کلاینت پیامی می‌فرستد، آن را دریافت و پردازش کن
    clientSocket.on('message', (msg) => {
      // در این حالت ساده، پیام دریافتی را همان‌جا برمی‌گردانیم (Loopback)
      // برای پروکسی واقعی، اینجا باید به یک سرور دیگر متصل شوید
      // اما برای Vercel، این روش برای تست و استفاده‌های سبک کار می‌کند
      
      // ارسال پیام به کلاینت
      try {
        clientSocket.send(msg);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });

    // وقتی کلاینت قطع می‌شود
    clientSocket.on('close', () => {
      console.log('Client disconnected');
    });

    // ارسال پاسخ به مرورگر/کلاینت
    return new Response(null, {
      status: 101, // 101 Switching Protocols
      headers: {
        'Upgrade': 'websocket',
        'Connection': 'Upgrade',
        'Sec-WebSocket-Accept': 'accept-string', // مقدار ساده شده برای تست
      },
    });
  }

  // اگر درخواست WebSocket نبود، یک پاسخ HTML ساده برمی‌گردانیم
  return new Response(`
    <html>
      <head><title>Vercel WebSocket Proxy</title></head>
      <body>
        <h1>WebSocket Proxy is Running</h1>
        <p>If you see this, the server is up.</p>
        <p>Path for V2Ray: /</p>
      </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' }
  });
}
