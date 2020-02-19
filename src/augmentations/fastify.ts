import { User } from '@lib/orm/entity';
import fastify from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

declare module 'fastify' {
    interface FastifyInstance {
        verifyMinRole(request: FastifyRequest, reply: FastifyReply): void;
        isRoot(request: FastifyRequest, reply: FastifyReply): void;
        isRegistered(request: FastifyRequest, reply: FastifyReply): void;
    }

    type RoutePlugin<T = unknown> = fastify.Plugin<Server, IncomingMessage, ServerResponse, T>;

    interface FastifyRequest {
        user: User;
        generateError<T>(statusCode: number, message: T, thrownError?: Error): void;
    }
    // tslint:disable-next-line no-empty-interface
    interface FastifyReply<HttpResponse = ServerResponse> {}

    type RequestHandlerWithParams<Params> = fastify.RequestHandler<
        IncomingMessage,
        ServerResponse,
        fastify.DefaultQuery,
        Params,
        fastify.DefaultHeaders,
        fastify.DefaultBody
    >;

    type FastifyRequestWithParams<Params> = fastify.FastifyRequest<
        IncomingMessage,
        fastify.DefaultQuery,
        Params,
        fastify.DefaultHeaders,
        unknown
    >;

    type FastifyMiddlewarePromise<
        HttpServer = Server,
        HttpRequest = IncomingMessage,
        HttpResponse = ServerResponse,
        Query = DefaultQuery,
        Params = DefaultParams,
        Headers = DefaultHeaders,
        Body = DefaultBody
    > = (
        this: FastifyInstance<HttpServer, HttpRequest, HttpResponse>,
        req: FastifyRequest<HttpRequest, Query, Params, Headers, Body>,
        reply: FastifyReply<HttpResponse>,
        done: (err?: Error) => void
    ) => Promise<void>;
}
