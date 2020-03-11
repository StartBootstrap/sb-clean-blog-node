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
    TestReadPostQuery,
    TestResultsPost,
} from '@start-bootstrap/sb-clean-blog-shared-types';
import { TestPost } from '@testing/objects';
import fastify, { FastifyInstance, FastifyRequestWithParams } from 'fastify';

import { handler, postsRead } from './posts-read';

describe('PostsRead', () => {
    beforeEach(() => {
        mockFindOne.mockReset();
        mockGenerateError.mockReset();
        (<FastifyRequestWithParams<ReadPostParams>>(
            requestMockWithParams
        )).params = new TestReadPostParams();
        (<FastifyRequestWithParams<ReadPostParams>>(
            requestMockWithParams
        )).query = new TestReadPostQuery();
    });

    it('should create the postsRead route', async () => {
        postsRead(fastify(), {}, () => {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should return the post', async () => {
        (<FastifyRequestWithParams<ReadPostParams>>requestMockWithParams).query.findBy = undefined;
        mockFindOne.mockImplementation(() => new TestPost());
        const returnValue = await handler.call(
            <FastifyInstance>(<unknown>mockFastifyInstance),
            <FastifyRequestWithParams<ReadPostParams>>requestMockWithParams,
            replyMock
        );
        expect(mockFindOne).toHaveBeenCalledWith('00000000-0000-0000-0000-000000000001');
        expect(returnValue).toEqual(new TestResultsPost());
    });
    it('should return the post by slug', async () => {
        mockFindOne.mockImplementation(() => new TestPost());
        const returnValue = await handler.call(
            <FastifyInstance>(<unknown>mockFastifyInstance),
            <FastifyRequestWithParams<ReadPostParams>>requestMockWithParams,
            replyMock
        );
        expect(mockFindOne).toHaveBeenCalledWith({
            slug: '00000000-0000-0000-0000-000000000001',
        });
        expect(returnValue).toEqual(new TestResultsPost());
    });
});
