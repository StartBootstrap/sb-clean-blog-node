import httpCodes from '@inip/http-codes';
import { validateToken } from '@lib/jwt';
import { User } from '@lib/orm/entity';
import { AuthErrorCodes, DecodedToken } from '@start-bootstrap/sb-clean-blog-shared-types';
import fastify from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { getConnection } from 'typeorm';

export const bearerPlugin: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.decorate('user', null);
    instance.addHook('preHandler', bearerHook);
};

export const bearerHook: fastify.FastifyMiddlewarePromise = async function(
    request,
    reply
): Promise<void> {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
        return;
    }
    const [scheme, token] = authHeader.split(/\s+/);

    if (scheme.toLowerCase() !== 'bearer') {
        throw request.generateError<AuthErrorCodes>(
            httpCodes.BAD_REQUEST,
            'BEARER_SCHEMA_REQUIRED'
        );
    }
    let decodedToken: DecodedToken;

    try {
        decodedToken = validateToken(token);
    } catch (error) {
        throw request.generateError<AuthErrorCodes>(
            httpCodes.UNAUTHORIZED,
            'NOT_AUTHORIZED',
            error
        );
    }

    const userRepository = getConnection().getRepository(User);

    const user = await userRepository.findOne(decodedToken.id);

    if (!user) {
        throw request.generateError<AuthErrorCodes>(httpCodes.UNAUTHORIZED, 'NOT_AUTHORIZED');
    }

    request.user = user;
};

export const bearer = fastifyPlugin(bearerPlugin);
