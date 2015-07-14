var httpProxy = require('http-proxy');
var https = require('https');
var http = require('http');
var fs = require('fs');
var path = require('path');

var proxy = httpProxy.createProxyServer();

proxy.on('proxyRes', function (proxyRes, req, res) {
  res.statusCode = proxyRes.statusCode;
});

// To avoid socket hang up of ECONNRESET
proxy.on('error', function (e) {
});

module.exports = proxy;