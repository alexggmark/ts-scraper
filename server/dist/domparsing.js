"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
function domParser(body, link, title) {
    const dom = new jsdom_1.JSDOM(body);
    const response = dom.window.document.querySelectorAll(link);
    const data = Object.keys(response).map((key) => {
        return {
            title: response[key].querySelector(title).textContent,
            url: response[key].href
        };
    });
    return data;
}
exports.default = domParser;
//# sourceMappingURL=domParsing.js.map