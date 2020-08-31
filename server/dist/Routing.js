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
const http = __importStar(require("http"));
const domParsing_1 = __importDefault(require("./domParsing"));
const routing = (req, res) => {
    if (req.url === '/bbc') {
        const domHeading = '.gs-c-promo-heading';
        const domTitle = '.gs-c-promo-heading__title';
        http.get('http://localhost:3000/https://www.bbc.co.uk/news', (response) => {
            response.setEncoding('utf8');
            let body = '';
            response.on('data', (chunk) => {
                body += chunk;
            });
            response.on('end', () => {
                const fetchResult = JSON.stringify(domParsing_1.default(body, domHeading, domTitle));
                res.end(fetchResult);
            });
        }).on('error', (e) => {
            console.log(`Error: ${e.message}`);
        });
    }
};
exports.default = routing;
//# sourceMappingURL=routing.js.map