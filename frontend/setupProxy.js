const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      // target: "http://localhost:8080",
      target: "https://user-management-backend-hljp.onrender.com/",
      changeOrigin: true,
    })
  );
};
