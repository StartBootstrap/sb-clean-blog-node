import { mockFastifyInstance, mockRoute, mockSend, replyMock, requestMock } from '@mocks/fastify';
import fastify, { FastifyInstance } from 'fastify';

import { handler, health } from './health';

describe('Plugin health test', () => {
    it('should create health route', () => {
        health(fastify(), {}, () => {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should respond with alive', async () => {
        const returnValue = await handler.call(
            <FastifyInstance>(<unknown>mockFastifyInstance),
            requestMock,
            replyMock
        );
        expect(mockSend).toHaveBeenCalledWith('alive');
    });
});
