import httpCodes from '@inip/http-codes';
import { mockSeedDB } from '@mocks/@lib/util';
import { mockCode, mockFastifyInstance, mockRoute, replyMock, requestMock } from '@mocks/fastify';
import { mockFindOne, mockGetConnection, mockSynchronize } from '@mocks/typeorm';
import fastify, { FastifyInstance } from 'fastify';

import { handler, seedDBRoute } from './seed-db';

describe('Seed DB', () => {
    beforeEach(() => {
        mockFindOne.mockReset();
    });

    it('should create the resetDB route', async () => {
        seedDBRoute(fastify(), {}, () => {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should seed the database', async () => {
        const returnValue = await handler.call(
            <FastifyInstance>(<unknown>mockFastifyInstance),
            requestMock,
            replyMock
        );

        expect(mockGetConnection).toHaveBeenCalled();
        expect(mockSynchronize).toHaveBeenCalled();
        expect(mockSeedDB).toHaveBeenCalled();
        expect(mockCode).toHaveBeenCalledWith(httpCodes.NO_CONTENT);
        expect(returnValue).toBeUndefined();
    });
});
