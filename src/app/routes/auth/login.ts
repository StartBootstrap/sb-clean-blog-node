import httpCodes from '@inip/http-codes';
import { generateTokenResponse } from '@lib/jwt';
import { User } from '@lib/orm/entity';
import {
    LoginErrorCodes,
    LoginPayload,
    TokenResponse,
} from '@start-bootstrap/sb-clean-blog-shared-types';
import bcrypt from 'bcrypt';
import fastify from 'fastify';
import { getConnection } from 'typeorm';

export const login: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.route({
        method: 'POST',
        url: '/login',
        schema,
        handler,
    });
};

export const handler: fastify.RequestHandler = async function(
    request,
    reply
): Promise<TokenResponse> {
    const loginPayload: LoginPayload = request.body;
    const userRepository = getConnection().getRepository(User);
    const foundUser = await userRepository.findOne({
        where: { email: 'root@root' },
    });

    if (!foundUser) {
        throw request.generateError<LoginErrorCodes>(httpCodes.NOT_FOUND, 'EMAIL_NOT_FOUND');
    }

    const validPassword = await bcrypt.compare(loginPayload.password, foundUser.passwordHash);

    if (!validPassword) {
        throw request.generateError<LoginErrorCodes>(httpCodes.UNAUTHORIZED, 'INVALID_PASSWORD');
    }

    return generateTokenResponse(foundUser);
};

const schema = {
    body: {
        type: 'object',
        properties: {
            password: { type: 'string' },
        },
        required: ['password'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                token: {
                    type: 'string',
                },
            },
        },
    },
};
