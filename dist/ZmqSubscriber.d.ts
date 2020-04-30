export default class ZmqSubscriber {
    private readonly url;
    private socket;
    constructor(url: string);
    subscribe<T>(topic: string, handler: (message: T | undefined) => void): void;
    unsubscribe(topic: string): void;
    dispose(): void;
}
