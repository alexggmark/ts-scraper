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
const corsAnywhere = __importStar(require("cors-anywhere"));
// import * as http from 'http'
const https = __importStar(require("https"));
const fs = __importStar(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const routing_1 = __importDefault(require("./routing"));
dotenv_1.default.config();
const isDev = process.env.NODE_ENV !== 'production';
const port = 3000 || Number(process.env.PORT);
const serverPort = 4000;
const options = isDev ? {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert')
} : {};
corsAnywhere.createServer(options, {
    originWhitelist: [],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, () => {
    console.log('Running CORS Anywhere on ' + port);
});
https.createServer(options, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    routing_1.default(req, res);
}).listen(serverPort, () => {
    console.log('Running HTTP Server ' + serverPort);
});
//# sourceMappingURL=index.js.map