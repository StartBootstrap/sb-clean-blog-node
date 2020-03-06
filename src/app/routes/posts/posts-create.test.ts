import httpCodes from '@inip/http-codes';
import {
    mockCode,
    mockFastifyInstance,
    mockGenerateError,
    mockRoute,
    replyMock,
    requestMock,
} from '@mocks/fastify';
import { mockEMCreate, mockEMSave, mockFindOne } from '@mocks/typeorm';
import {
    TestCreatePostPayload,
    TestResultsPost,
} from '@start-bootstrap/sb-clean-blog-shared-types';
import { TestPost, TestPostCreate } from '@testing/objects';
import fastify, { FastifyInstance } from 'fastify';

import { handler, postsCreate } from './posts-create';

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
        expect(mockCode).toHaveBeenCalledWith(201);
        expect(returnValue).toEqual({ ...new TestResultsPost() });
    });
    it('should use heading if slug is not passed', async () => {
        mockEMSave.mockImplementation(() => new TestPost());
        requestMock.body.slug = undefined;
        const returnValue = await handler.call(
            <FastifyInstance>(<unknown>mockFastifyInstance),
            requestMock,
            replyMock
        );
        expect(mockEMCreate).toHaveBeenCalledWith(undefined, {
            ...new TestPostCreate(),
            slug: 'test-heading',
        });
    });
    it('should use undefined for backgroundImage if not passed', async () => {
        mockEMSave.mockImplementation(() => new TestPost());
        requestMock.body.backgroundImage = undefined;
        const returnValue = await handler.call(
            <FastifyInstance>(<unknown>mockFastifyInstance),
            requestMock,
            replyMock
        );
        expect(mockEMCreate).toHaveBeenCalledWith(undefined, {
            ...new TestPostCreate(),
            backgroundImage: undefined,
        });
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
