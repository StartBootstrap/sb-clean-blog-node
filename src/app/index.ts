import config from '@lib/config';
import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import helmet from 'fastify-helmet';
import { IncomingMessage, Server, ServerResponse } from 'http';

import { generateError, isRegistered, isRoot } from './decorators';
import { bearer } from './plugins';
import { routes } from './routes';
import { requestSerializer, responseSerializer } from './serializers';

export class FastifyApp {
    _server!: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>;

    constructor() {
        this._server = fastify({
            logger: {
                level: config.logging.level,
                prettyPrint: config.logging.prettyPrint,
                redact: ['req.headers.authorization'],
                serializers: {
                    res: responseSerializer,
                    req: requestSerializer,
                },
            },
        });

        // Load order -> https://www.fastify.io/docs/latest/Getting-Started/#loading-order-of-your-plugins
        // Fastify Plugins
        this._server.register(helmet);
        this._server.register(fastifyCors);

        // Custom Plugins
        this._server.register(bearer);

        // Decorators
        this._server.decorateRequest('generateError', generateError);
        this._server.decorate('isRoot', isRoot);
        this._server.decorate('isRegistered', isRegistered);

        // Hooks & Middleware

        // Services
        this._server.register(routes, { prefix: '/api/latest' });

        this._server.ready(() => {
            console.log(this._server.printRoutes());
        });
    }

    async listen(): Promise<unknown> {
        try {
            return await this._server.listen(config.port, '0.0.0.0');
        } catch (error) {
            this._server.log.error(error);
            process.exit(1);
        }
    }
}
