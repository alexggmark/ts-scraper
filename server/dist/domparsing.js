"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
function domParser(body, link, title) {
    const dom = new jsdom_1.JSDOM(body);
    const response = dom.window.document.querySelectorAll(link);
    const hrefStore = [];
    const data = Object.keys(response).map((key) => {
        if (hrefStore.find((item) => item === response[key].href)) {
            return {
                title: null,
                url: null
            };
        }
        hrefStore.push(response[key].href);
        return {
            title: response[key].querySelector(title).textContent,
            url: response[key].href
        };
    }).filter(item => item.title !== null && item.title !== '');
    return data;
}
exports.default = domParser;
//# sourceMappingURL=domParsing.js.map