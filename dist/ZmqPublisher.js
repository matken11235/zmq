"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zeromq_1 = require("zeromq");
class ZmqPublisher {
    constructor(url) {
        this.url = url;
        this.socket = zeromq_1.socket('pub');
        this.socket.bindSync(this.url);
    }
    publish(topic, data) {
        this.socket.send([topic, JSON.stringify(data)]);
    }
    dispose() {
        this.socket.unbindSync(this.url);
        this.socket.close();
    }
}
exports.default = ZmqPublisher;
