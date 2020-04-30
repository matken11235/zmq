"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseBuffer(buffer) {
    try {
        return JSON.parse(buffer.toString());
    }
    catch (ex) {
        return undefined;
    }
}
exports.parseBuffer = parseBuffer;
