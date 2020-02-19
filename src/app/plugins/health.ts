import fastify from 'fastify';

export const health: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.route({
        method: 'GET',
        url: '/health',
        handler,
    });
};

export const handler: fastify.RequestHandler = async function(request, reply): Promise<void> {
    reply.send('alive');
};
