const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3001;

// Middleware CORS manual
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Proxy
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:8088',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
  onProxyRes: (proxyRes, req, res) => {
    // Garantir que os headers CORS sejam repassados
    proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:8081';
    proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
  }
}));

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
});