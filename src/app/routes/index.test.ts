import config from '@lib/config';
import { mockRegister } from '@mocks/fastify';
import fastify from 'fastify';

import { routes } from './index';

describe('Routes', () => {
    console.log(config);

    it('should register all routes', () => {
        mockRegister.mockImplementation((plugin: unknown, options: unknown) => {
            (<fastify.RoutePlugin>plugin)(fastify(), {}, () => {});
        });
        routes(fastify(), {}, () => {});
        expect(mockRegister).toHaveBeenCalled();
    });
    it('should register register internal routes if set in config', () => {
        config.internal = true;
        mockRegister.mockImplementation((plugin: unknown, options: unknown) => {
            (<fastify.RoutePlugin>plugin)(fastify(), {}, () => {});
        });
        routes(fastify(), {}, () => {});
        expect(mockRegister).toHaveBeenCalled();
    });
});
