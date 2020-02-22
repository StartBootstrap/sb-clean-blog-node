import httpCodes from '@inip/http-codes';
import {
    mockCode,
    mockFastifyInstance,
    mockGenerateError,
    mockRoute,
    replyMock,
    requestMock,
} from '@mocks/fastify';
import { mockEMFindByIds, mockEMFindOne, mockEMSave, mockFindOne } from '@mocks/typeorm';
import {
    TestCreatePostPayload,
    TestResultsPost,
} from '@start-bootstrap/sb-clean-blog-shared-types';
import { TestPost } from '@testing/objects';
import fastify, { FastifyInstance } from 'fastify';

import { handler, postsCreate } from './posts-create';

jest.mock('fastify');

describe('PostsCreate', () => {
    beforeEach(() => {
        mockFindOne.mockReset();
        requestMock.body = new TestCreatePostPayload();
    });

    it('should create the postsCreate route', async () => {
        postsCreate(fastify(), {}, () => {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should create a post', async () => {
        mockEMSave.mockImplementation(() => new TestPost());
        const returnValue = await handler.call(
            <FastifyInstance>(<unknown>mockFastifyInstance),
            requestMock,
            replyMock
        );
        expect(mockFindOne).toHaveBeenCalled();
        expect(mockEMFindByIds).toHaveBeenCalled();
        expect(mockEMFindOne).toHaveBeenCalledTimes(2);
        expect(mockCode).toHaveBeenCalledWith(201);
        expect(returnValue).toEqual(new TestResultsPost());
    });
    it('should error if the email already exists', async () => {
        mockFindOne.mockImplementation(() => new TestPost());
        try {
            const returnValue = await handler.call(
                <FastifyInstance>(<unknown>mockFastifyInstance),
                requestMock,
                replyMock
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(httpCodes.CONFLICT, 'SLUG_IN_USE');
        }
    });
    it('should catch errors when trying to create post', async () => {
        const thrownError = new Error('TEST_ERROR');
        mockEMSave.mockImplementation(() => {
            throw thrownError;
        });
        try {
            const returnValue = await handler.call(
                <FastifyInstance>(<unknown>mockFastifyInstance),
                requestMock,
                replyMock
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.INTERNAL_SERVER_ERROR,
                'ERROR_CREATING_POST',
                thrownError
            );
        }
    });
});
