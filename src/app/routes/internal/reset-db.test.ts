import httpCodes from '@inip/http-codes';
import { mockCode, mockFastifyInstance, mockRoute, replyMock, requestMock } from '@mocks/fastify';
import { mockFindOne, mockGetConnection, mockSynchronize } from '@mocks/typeorm';
import fastify, { FastifyInstance } from 'fastify';

import { handler, resetDB } from './reset-db';

describe('Reset DB', () => {
    beforeEach(() => {
        mockFindOne.mockReset();
    });

    it('should create the resetDB route', async () => {
        resetDB(fastify(), {}, () => {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should reset the database', async () => {
        const returnValue = await handler.call(
            <FastifyInstance>(<unknown>mockFastifyInstance),
            requestMock,
            replyMock
        );

        expect(mockGetConnection).toHaveBeenCalled();
        expect(mockSynchronize).toHaveBeenCalled();
        expect(mockCode).toHaveBeenCalledWith(httpCodes.NO_CONTENT);
        expect(returnValue).toBeUndefined();
    });
});
