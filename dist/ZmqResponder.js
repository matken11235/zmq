"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zeromq_1 = require("zeromq");
const util_1 = require("./util");
class ZmqResponder {
    constructor(url, handler) {
        this.url = url;
        this.handler = handler;
        this.responder = zeromq_1.socket('rep');
        this.responder.on('message', (message) => this.parser(message));
        this.responder.bindSync(this.url);
    }
    dispose() {
        this.responder.unbindSync(this.url);
        this.responder.close();
    }
    parser(message) {
        const request = util_1.parseBuffer(message);
        this.handler(request, response => this.respond(response));
    }
    respond(message) {
        this.responder.send(JSON.stringify(message));
    }
}
exports.default = ZmqResponder;
