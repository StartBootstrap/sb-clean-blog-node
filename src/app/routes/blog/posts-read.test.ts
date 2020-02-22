import {
    mockFastifyInstance,
    mockGenerateError,
    mockRoute,
    replyMock,
    requestMockWithParams,
} from '@mocks/fastify';
import { mockFindOne } from '@mocks/typeorm';
import {
    ReadPostParams,
    TestReadPostParams,
    TestResultsPost,
} from '@start-bootstrap/sb-clean-blog-shared-types';
import { TestPost } from '@testing/objects';
import fastify, { FastifyInstance, FastifyRequestWithParams } from 'fastify';

import { handler, postsRead } from './posts-read';

jest.mock('fastify');

describe('PostsRead', () => {
    beforeEach(() => {
        mockFindOne.mockReset();
        mockGenerateError.mockReset();
        (<FastifyRequestWithParams<ReadPostParams>>(
            requestMockWithParams
        )).params = new TestReadPostParams();
    });

    it('should create the postsRead route', async () => {
        postsRead(fastify(), {}, () => {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should return the post', async () => {
        mockFindOne.mockImplementation(() => new TestPost());
        const returnValue = await handler.call(
            <FastifyInstance>(<unknown>mockFastifyInstance),
            <FastifyRequestWithParams<ReadPostParams>>requestMockWithParams,
            replyMock
        );
        expect(mockFindOne).toHaveBeenCalled();
        expect(returnValue).toEqual(new TestResultsPost());
    });
});
