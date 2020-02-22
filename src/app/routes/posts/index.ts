import { health } from '@app/plugins';
import fastify from 'fastify';

import { postsAll } from './posts-all';
import { postsCreate } from './posts-create';
import { postsDelete } from './posts-delete';
import { postsRead } from './posts-read';
import { postsUpdate } from './posts-update';

export const posts: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.register(health);
    instance.register(postsAll);
    instance.register(postsCreate);
    instance.register(postsRead);
    instance.register(postsUpdate);
    instance.register(postsDelete);
};
