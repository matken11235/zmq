"use strict";
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
const zeromq_1 = require("zeromq");
const util_1 = require("./util");
const timers_1 = require("timers");
class ZmqRequester {
    constructor(url, timeout = 5000) {
        this.url = url;
        this.timeout = timeout;
        this.socket = zeromq_1.socket('req');
        this.socket.connect(this.url);
    }
    request(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const reply = yield new Promise((resolve, reject) => {
                const rejectTimer = timers_1.setTimeout(() => reject(new Error('Request timed out.')), this.timeout);
                const clearTimer = () => timers_1.clearTimeout(rejectTimer);
                this.socket.once('message', message => {
                    clearTimer();
                    resolve(message);
                });
                this.socket.send(JSON.stringify(message));
            });
            const parsed = util_1.parseBuffer(reply);
            if (parsed === undefined) {
                throw new Error('Invalid JSON string received.');
            }
            return parsed;
        });
    }
    dispose() {
        this.socket.disconnect(this.url);
        this.socket.close();
    }
}
exports.default = ZmqRequester;
