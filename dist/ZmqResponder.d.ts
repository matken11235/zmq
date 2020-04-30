export default class ZmqResponder<Request, Response> {
    private readonly url;
    private readonly handler;
    private responder;
    constructor(url: string, handler: (request: Request | undefined, respond: (response: Response) => void) => void);
    dispose(): void;
    private parser;
    private respond;
}
