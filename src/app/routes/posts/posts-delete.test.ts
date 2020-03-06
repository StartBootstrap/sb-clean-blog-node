import httpCodes from '@inip/http-codes';
import {
    mockCode,
    mockFastifyInstance,
    mockGenerateError,
    mockRoute,
    replyMock,
    requestMockWithParams,
} from '@mocks/fastify';
import { mockEMRemove, mockFindOne } from '@mocks/typeorm';
import {
    DeletePostParams,
    TestDeletePostParams,
} from '@start-bootstrap/sb-clean-blog-shared-types';
import { TestPost } from '@testing/objects';
import fastify, { FastifyInstance, FastifyRequestWithParams } from 'fastify';

import { handler, postsDelete } from './posts-delete';

describe('PostsDelete', () => {
    beforeEach(() => {
        mockFindOne.mockReset();
        mockGenerateError.mockReset();
        (<FastifyRequestWithParams<DeletePostParams>>(
            requestMockWithParams
        )).params = new TestDeletePostParams();
    });

    it('should create the postsDelete route', async () => {
        postsDelete(fastify(), {}, () => {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should delete the post', async () => {
        mockFindOne.mockImplementation(() => new TestPost());
        const returnValue = await handler.call(
            <FastifyInstance>(<unknown>mockFastifyInstance),
            <FastifyRequestWithParams<DeletePostParams>>requestMockWithParams,
            replyMock
        );
        expect(mockFindOne).toHaveBeenCalled();
        expect(mockCode).toHaveBeenCalledWith(204);
    });
    it('should catch errors when trying to remove post', async () => {
        const thrownError = new Error('TEST_ERROR');
        mockFindOne.mockImplementation(() => new TestPost());
        mockEMRemove.mockImplementation(() => {
            throw thrownError;
        });
        try {
            const returnValue = await handler.call(
                <FastifyInstance>(<unknown>mockFastifyInstance),
                <FastifyRequestWithParams<DeletePostParams>>requestMockWithParams,
                replyMock
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.INTERNAL_SERVER_ERROR,
                'ERROR_DELETING_POST',
                thrownError
            );
        }
    });
});
