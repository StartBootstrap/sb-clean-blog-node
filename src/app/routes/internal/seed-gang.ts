import httpCodes from '@inip/http-codes';
import { seedDB } from '@lib/util';
import fastify from 'fastify';
import { getConnection } from 'typeorm';

// import { handler as createGang } from './create-gang';

export const seedGang: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.route({
        method: 'POST',
        url: '/seed-gang',
        schema,
        handler,
    });
};

export const handler: fastify.RequestHandler = async function(request, reply): Promise<undefined> {
    await getConnection().synchronize(true);
    await seedDB(<string>process.env.DB_ROOT_USER_PASSWORD);

    // await createGang.call(this, request, reply);

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
