// https://www.fastify.io/docs/latest/Routes/
import { health } from '@app/plugins';
import config from '@lib/config';
import fastify from 'fastify';

import { auth } from './auth';
import { internal } from './internal';
import { posts } from './posts';

export const routes: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.register(health);
    instance.register(auth, { prefix: '/auth' });
    instance.register(posts, { prefix: '/posts' });

    if (config.internal) {
        instance.register(internal, { prefix: '/internal' });
    }
};
