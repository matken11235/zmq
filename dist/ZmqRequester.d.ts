export default class ZmqRequester<Request, Response> {
    private readonly url;
    private readonly timeout;
    private socket;
    constructor(url: string, timeout?: number);
    request(message: Request): Promise<Response>;
    dispose(): void;
}
