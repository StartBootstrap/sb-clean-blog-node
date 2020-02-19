import httpCodes from '@inip/http-codes';
import { User } from '@lib/orm/entity/user';
import { AuthErrorCodes } from '@start-bootstrap/sb-clean-blog-shared-types';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export async function isRegistered(
    this: FastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply
): Promise<void> {
    const user: User = request.user;

    if (!user) {
        throw request.generateError<AuthErrorCodes>(httpCodes.UNAUTHORIZED, 'NOT_AUTHORIZED');
    }
}
