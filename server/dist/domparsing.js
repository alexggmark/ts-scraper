"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
function domParser(body) {
    const dom = new jsdom_1.JSDOM(body);
    const response = dom.window.document.querySelectorAll('.gs-c-promo-heading');
    const data = Object.keys(response).map((key) => {
        return {
            title: response[key].querySelector('.gs-c-promo-heading__title').textContent,
            url: response[key].href
        };
    });
    return data;
}
exports.default = domParser;
//# sourceMappingURL=domParsing.js.map