import httpCodes from '@inip/http-codes';
import { seedDB } from '@lib/util';
import fastify from 'fastify';
import { getConnection } from 'typeorm';

export const resetDB: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.route({
        method: 'GET',
        url: '/reset-db',
        schema,
        handler,
    });
};

export const handler: fastify.RequestHandler = async function(request, reply): Promise<undefined> {
    await getConnection().synchronize(true);
    await seedDB(<string>process.env.DB_ROOT_USER_PASSWORD);
    reply.code(httpCodes.NO_CONTENT);
    return;
};

const schema = {
    response: {
        204: {
            description: 'Successfully Reset DB',
            type: 'null',
        },
    },
};
