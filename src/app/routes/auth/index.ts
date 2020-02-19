import { health } from '@app/plugins';
import fastify from 'fastify';

import { login } from './login';

export const auth: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.register(health);
    instance.register(login);
};
