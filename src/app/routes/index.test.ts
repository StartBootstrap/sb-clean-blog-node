import { mockRegister } from '@mocks/fastify';
import fastify from 'fastify';

import { routes } from './index';

describe('Routes', () => {
    it('should register all routes', () => {
        mockRegister.mockImplementation((plugin: unknown, options: unknown) => {
            (<fastify.RoutePlugin>plugin)(fastify(), {}, () => {});
        });
        routes(fastify(), {}, () => {});
        expect(mockRegister).toHaveBeenCalled();
    });
});
