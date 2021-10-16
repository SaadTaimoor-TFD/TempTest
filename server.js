const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');
const https = require('https');
app.use(require('prerender-node').set('prerenderToken', 'KGVh1ETbYA2wCopnb4Jw'));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const server = https.createServer({key: key, cert: cert }, app);
app.listen(process.env.PORT || 8080);