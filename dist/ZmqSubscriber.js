"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zeromq_1 = require("zeromq");
const util_1 = require("./util");
class ZmqSubscriber {
    constructor(url) {
        this.url = url;
        this.socket = zeromq_1.socket('sub');
        this.socket.connect(this.url);
    }
    subscribe(topic, handler) {
        this.socket.subscribe(topic);
        this.socket.on('message', (topicBuffer, messageBuffer) => {
            if (topicBuffer.toString() !== topic) {
                return;
            }
            const message = util_1.parseBuffer(messageBuffer);
            handler(message);
        });
    }
    unsubscribe(topic) {
        this.socket.unsubscribe(topic);
    }
    dispose() {
        this.socket.disconnect(this.url);
        this.socket.close();
    }
}
exports.default = ZmqSubscriber;
