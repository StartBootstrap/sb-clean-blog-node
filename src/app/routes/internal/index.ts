import { health } from '@app/plugins';
import fastify from 'fastify';

import { resetDB } from './reset-db';
import { seedGang } from './seed-gang';

export const internal: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.addHook('preHandler', instance.isRoot);

    instance.register(health);
    instance.register(resetDB);
    instance.register(seedGang);
};
