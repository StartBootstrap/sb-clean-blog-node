import { mockFastifyInstance, mockRoute, replyMock, requestMock } from '@mocks/fastify';
import { mockFind } from '@mocks/typeorm';
import { TestPost } from '@testing/objects';
import fastify, { FastifyInstance } from 'fastify';

import { handler, postsAll } from './posts-all';

describe('PostsAll', () => {
    beforeEach(() => {});

    it('should create the postsAll route', async () => {
        postsAll(fastify(), {}, () => {});
        expect(mockRoute).toHaveBeenCalled();
    });

    it('should get all posts', async () => {
        mockFind.mockImplementation(() => [new TestPost(), new TestPost(), new TestPost()]);
        const returnValue = await handler.call(
            <FastifyInstance>(<unknown>mockFastifyInstance),
            requestMock,
            replyMock
        );
        expect(mockFind).toHaveBeenCalled();
        expect(returnValue.length).toEqual(3);
    });
});
