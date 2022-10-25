export type Next = (request: Request) => Promise<Response>;

export type Middleware = (next: Next) => Next;
