export default class ZmqPublisher {
    private readonly url;
    private socket;
    constructor(url: string);
    publish<T>(topic: string, data: T): void;
    dispose(): void;
}
