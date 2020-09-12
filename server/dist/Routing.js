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
const constants_1 = require("./constants");
const sourceObject = [
    {
        route: '/bbc',
        domHeading: '.gs-c-promo-heading',
        domTitle: '.gs-c-promo-heading__title',
        url: `${constants_1.CORS_URL}/https://www.bbc.co.uk/news`
    }
];
const routing = (req, res) => {
    sourceObject.map((item) => {
        if (req.url !== item.route) {
            return;
        }
        http.get(item.url, (response) => {
            response.setEncoding('utf8');
            let body = '';
            response.on('data', (chunk) => {
                body += chunk;
            });
            response.on('end', () => {
                const fetchResult = JSON.stringify(domParsing_1.default(body, item.domHeading, item.domTitle));
                res.end(fetchResult);
            });
        }).on('error', (e) => {
            console.log(`Error: ${e.message}`);
        });
    });
};
exports.default = routing;
//# sourceMappingURL=routing.js.map