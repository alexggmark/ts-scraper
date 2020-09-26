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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
const http = __importStar(require("http"));
const constants_1 = require("./constants");
const emptyNulls = {
    title: null,
    url: null,
    content: null
};
function domContentPromise(link, content) {
    return new Promise((resolve) => {
        http.get(`${constants_1.CORS_URL}/https://www.bbc.co.uk${link}`, (response) => {
            response.setEncoding('utf8');
            let body = '';
            let domContentString = '';
            response.on('data', (chunk) => {
                body += chunk;
            });
            response.on('end', () => {
                const dom = new jsdom_1.JSDOM(body);
                const domResponse = dom.window.document.querySelectorAll(content);
                domResponse.forEach((item) => {
                    domContentString += item.textContent;
                });
                resolve(domContentString);
            });
        });
    });
}
function domParser(body, link, title, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const dom = new jsdom_1.JSDOM(body);
        const response = dom.window.document.querySelectorAll(link);
        const hrefStore = [];
        const data = yield Promise.all(Object.keys(response).map((key) => {
            return new Promise((resolve) => {
                if (!response[key].href || hrefStore.find((item) => item === response[key].href)) {
                    resolve(emptyNulls);
                }
                hrefStore.push(response[key].href);
                domContentPromise(response[key].href, content)
                    .then((res) => {
                    console.log(res === null || res === void 0 ? void 0 : res.slice(0, 20));
                    resolve({
                        title: response[key].querySelector(title).textContent,
                        url: response[key].href,
                        content: res
                    });
                });
            });
        }));
        console.log('Finished?');
        console.log('Finished?');
        console.log('Finished?');
        console.log('Finished?');
        console.log('Finished?');
        console.log('Finished?');
        const result = data.filter(item => item.title !== null);
        return result;
    });
}
exports.default = domParser;
//# sourceMappingURL=domParsing.js.map