"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https = __importStar(require("https"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
// import routing from './routing'
dotenv_1.default.config();
const isDev = process.env.NODE_ENV !== 'production';
// const port: number = Number(process.env.PORT) || 3000
const serverPort = Number(process.env.PORT) || 4000;
const options = {
    key: fs.readFileSync(__dirname + '/server.key'),
    cert: fs.readFileSync(__dirname + '/server.cert')
};
// const options = isDev ? {
//   key: fs.readFileSync(__dirname + '/server.key'),
//   cert: fs.readFileSync(__dirname + '/server.cert')
// } : {};
/**
 * This is CORS anywhere server code, I wanted to run this on own server, but
 * unfortunately need to use CDN because of Heroku's limitations
 */
// corsAnywhere.createServer(options, {
//   originWhitelist: [],
//   removeHeaders: ['cookie', 'cookie2']
// }).listen(port, () => {
//   console.log('Running CORS Anywhere on ' + port)
// })
https.createServer(options, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    // routing(req, res)
    /**
     * Solution 1
     */
    // const stream = fs.createReadStream(path.join(__dirname, '/src/dist'));
    // stream.on('error', () => {
    //   console.log('Actually an error')
    //   console.log(stream)
    // })
    // console.log(stream)
    // stream.pipe(res)
    /**
     * Solution 2
     */
    // fs.readFile(path.join(__dirname, '/src/dist/index.html'), {encoding: 'utf-8'}, (err, data) => {
    //   if (err) {
    //     console.log(err)
    //     res.writeHead(404)
    //     res.end()
    //   }
    //   console.log(`${__dirname}/src/dist/index.html`)
    //   console.log(data)
    //   res.writeHead(200)
    //   res.end(data)
    // })
    /**
     * This is unbelievably unelegant, but for the sake of getting this working
     * without Express and with Heroku limitations, this is quickest method
     */
    if (req.url == '/') {
        console.log('REQ: /');
        console.log(path.join(__dirname, '/src/dist/bundle.js'));
        const readStream = fs.createReadStream(path.join(__dirname, '/src/dist/index.html'));
        res.writeHead(200, { 'Content-type': 'text/html' });
        readStream.pipe(res);
    }
    if (req.url == '/style.css') {
        console.log('REQ: style');
        const readStream = fs.createReadStream(path.join(__dirname, '/src/dist/style.css'));
        res.writeHead(200, { 'Content-type': 'text/html' });
        readStream.pipe(res);
    }
    if (req.url == '/bundle.js') {
        console.log('REQ: bundle');
        const readStream = fs.createReadStream(path.join(__dirname, '/src/dist/bundle.js'));
        res.writeHead(200, { 'Content-type': 'text/html' });
        readStream.pipe(res);
    }
    if (req.url == '/favicon.ico') {
        console.log('REQ: favicon');
        const readStream = fs.createReadStream(path.join(__dirname, '/src/dist/favicon.ico'));
        res.writeHead(200, { 'Content-type': 'text/html' });
        readStream.pipe(res);
    }
    if (req.url == '/505f876506e853fff8022de9e0384052.gif') {
        console.log('REQ: image');
        const readStream = fs.createReadStream(path.join(__dirname, '/src/dist/505f876506e853fff8022de9e0384052.gif'));
        res.writeHead(200, { 'Content-type': 'text/html' });
        readStream.pipe(res);
    }
    // fs.readFile()
}).listen(serverPort, () => {
    console.log('Running HTTP Server ' + serverPort);
});
//# sourceMappingURL=index.js.map