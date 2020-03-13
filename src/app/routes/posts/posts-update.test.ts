import httpCodes from '@inip/http-codes';
import {
    mockFastifyInstance,
    mockGenerateError,
    mockRoute,
    replyMock,
    requestMockWithParams,
} from '@mocks/fastify';
import { mockFindOne, mockSave } from '@mocks/typeorm';
import {
    TestUpdatePostParams,
    TestUpdatePostPayload,
    UpdatePostParams,
} from '@start-bootstrap/sb-clean-blog-shared-types';
import { TestPost } from '@testing/objects';
import fastify, { FastifyInstance, FastifyRequestWithParams } from 'fastify';

import { handler, postsUpdate } from './posts-update';

describe('PostsUpdate', () => {
    beforeEach(() => {
        mockFindOne.mockReset();
        mockGenerateError.mockReset();
        (<FastifyRequestWithParams<UpdatePostParams>>(
            requestMockWithParams
        )).params = new TestUpdatePostParams();
        (<FastifyRequestWithParams<UpdatePostParams>>(
            requestMockWithParams
        )).body = new TestUpdatePostPayload();
    });

    it('should create the postsUpdate route', async () => {
        postsUpdate(fastify(), {}, () => {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should update the post', async () => {
        mockFindOne.mockImplementation(() => new TestPost());
        const returnValue = await handler.call(
            <FastifyInstance>(<unknown>mockFastifyInstance),
            <FastifyRequestWithParams<UpdatePostParams>>requestMockWithParams,
            replyMock
        );
        expect(mockFindOne).toHaveBeenCalled();

        expect(returnValue).toEqual({
            ...new TestPost().toResultsPost(),
            backgroundImage: 'url("TEST_BACKGROUND_IMAGE")',
        });
    });
    it('should set backgroundImage to undefined if not passed', async () => {
        (<FastifyRequestWithParams<UpdatePostParams>>requestMockWithParams).body = {
            ...new TestUpdatePostPayload(),
            backgroundImage: null,
        };

        mockFindOne.mockImplementation(() => new TestPost());
        const returnValue = await handler.call(
            <FastifyInstance>(<unknown>mockFastifyInstance),
            <FastifyRequestWithParams<UpdatePostParams>>requestMockWithParams,
            replyMock
        );
        expect(mockFindOne).toHaveBeenCalled();

        expect(returnValue).toEqual({
            ...new TestPost().toResultsPost(),
            backgroundImage: undefined,
        });
    });
    it('should catch errors when trying to update post', async () => {
        const thrownError = new Error('TEST_ERROR');
        mockFindOne.mockImplementation(() => new TestPost());
        mockSave.mockImplementation(() => {
            throw thrownError;
        });
        try {
            const returnValue = await handler.call(
                <FastifyInstance>(<unknown>mockFastifyInstance),
                <FastifyRequestWithParams<UpdatePostParams>>requestMockWithParams,
                replyMock
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.INTERNAL_SERVER_ERROR,
                'ERROR_UPDATING_POST',
                thrownError
            );
        }
    });
});
