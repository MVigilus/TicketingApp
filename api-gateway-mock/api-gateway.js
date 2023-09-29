const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(
  "/",
  createProxyMiddleware({
    //target: "http://161.27.213.119:8281",
    target: "http://localhost:8080",
    changeOrigin: true,
  })
);

app.listen(3000, () => {
  console.log("listen to 3000");
});
