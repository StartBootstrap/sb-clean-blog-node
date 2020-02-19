import httpCodes from '@inip/http-codes';
import { User } from '@lib/orm/entity';
import { ReadUserErrorCodes, UUID } from '@start-bootstrap/sb-clean-blog-shared-types';
import fastify from 'fastify';
import { getConnection } from 'typeorm';

export const findUser = async function(request: fastify.FastifyRequest, id: UUID): Promise<User> {
    const userRepository = getConnection().getRepository(User);
    let foundUser: User | undefined;

    try {
        foundUser = await userRepository.findOne(id);
    } catch (error) {
        throw request.generateError<ReadUserErrorCodes>(
            httpCodes.INTERNAL_SERVER_ERROR,
            'ERROR_FINDING_USER',
            error
        );
    }

    if (!foundUser) {
        throw request.generateError<ReadUserErrorCodes>(httpCodes.NOT_FOUND, 'USER_NOT_FOUND');
    }

    return foundUser;
};
