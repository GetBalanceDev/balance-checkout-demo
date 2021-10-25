const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require('cors')

const { createProxyMiddleware } = require("http-proxy-middleware");
admin.initializeApp();

const proxyMiddleware = createProxyMiddleware({
  target: "https://api.sandbox.getbalance.com/",
  changeOrigin: true,
  followRedirects: true,
  secure: true,
  onProxyReq: (proxyReq, req, res) => {
    if (req.body) {
      let bodyData = JSON.stringify(req.body);
      proxyReq.setHeader("X-Balance-Key", process.env.BALANCE_KEY);
      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
});

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 10,
  message:
    "Too many refresh attempts, please try again in a few minutes."
});

const app = express();
app.use(cors({origin: true}));
app.use("/", limiter);
app.use("/", proxyMiddleware);
app.use(express.json());

exports.balanceProxy = functions.https.onRequest(app);
