// index.js
const http = require('http');
const { createServer } = require('http');

// تنظیمات پیش‌فرض
const PORT = process.env.PORT || 3000;
const PROTOCOL = 'vmess';
const ALGORITHM = 'auto';

// ساخت یک کانفیگ VMess آماده
// نکته: Vercel به طور خودکار IP سرور را مدیریت می‌کند.
// ما از TLS (HTTPS) استفاده می‌کنیم چون Vercel فقط HTTPS ساپورت می‌کند.

const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  // ساختن یک کانفیگ ساده برای تست
  const config = {
    port: 443,
    protocol: PROTOCOL,
    settings: {
      clients: [
        {
          id: "a3b9c2d1-e4f5-6789-0abc-def123456789", // UUID تصادفی
          email: "user@vercel-proxy"
        }
      ],
      decryption: "none"
    },
    stream: {
      network: "ws",
      wsSettings: {
        path: "/",
        headers: {
          Host: "vercel.app"
        }
      },
      security: "tls"
    }
  };

  res.end(JSON.stringify(config, null, 2));
});

server.listen(PORT, () => {
  console.log(`V2Ray Proxy Service running on port ${PORT}`);
});

module.exports = server;
