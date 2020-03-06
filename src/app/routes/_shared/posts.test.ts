import httpCodes from '@inip/http-codes';
import { mockGenerateError, requestMock } from '@mocks/fastify';
import { mockFindOne } from '@mocks/typeorm';
import { TestPost } from '@testing/objects';

import { findPost, findPostBySlug } from './posts';

describe('Posts Shared', () => {
    describe('findPost', () => {
        beforeEach(() => {
            mockFindOne.mockReset();
        });
        it('should return the found post', async () => {
            const testPost = new TestPost();
            mockFindOne.mockImplementation(() => testPost);
            const returnValue = await findPost(requestMock, '00000000-0000-0000-0000-000000000001');
            expect(returnValue).toBe(testPost);
        });
        it('should error if the post does not exist', async () => {
            try {
                const returnValue = await findPost(
                    requestMock,
                    '00000000-0000-0000-0000-000000000001'
                );
            } catch (error) {
                expect(mockGenerateError).toHaveBeenLastCalledWith(
                    httpCodes.NOT_FOUND,
                    'POST_NOT_FOUND'
                );
            }
        });
        it('should catch errors when trying to find post', async () => {
            const thrownError = new Error('TEST_ERROR');
            mockFindOne.mockImplementation(() => {
                throw thrownError;
            });
            try {
                const returnValue = await findPost(
                    requestMock,
                    '00000000-0000-0000-0000-000000000001'
                );
            } catch (error) {
                expect(mockGenerateError).toHaveBeenLastCalledWith(
                    httpCodes.INTERNAL_SERVER_ERROR,
                    'ERROR_FINDING_POST',
                    thrownError
                );
            }
        });
    });
    describe('findPostBySlug', () => {
        beforeEach(() => {
            mockFindOne.mockReset();
        });
        it('should return the found post', async () => {
            const testPost = new TestPost();
            mockFindOne.mockImplementation(() => testPost);
            const returnValue = await findPostBySlug(requestMock, 'TEST_SLUG');
            expect(returnValue).toBe(testPost);
        });
        it('should error if the post does not exist', async () => {
            try {
                const returnValue = await findPostBySlug(requestMock, 'TEST_SLUG');
            } catch (error) {
                expect(mockGenerateError).toHaveBeenLastCalledWith(
                    httpCodes.NOT_FOUND,
                    'POST_NOT_FOUND'
                );
            }
        });
        it('should catch errors when trying to find post', async () => {
            const thrownError = new Error('TEST_ERROR');
            mockFindOne.mockImplementation(() => {
                throw thrownError;
            });
            try {
                const returnValue = await findPostBySlug(requestMock, 'TEST_SLUG');
            } catch (error) {
                expect(mockGenerateError).toHaveBeenLastCalledWith(
                    httpCodes.INTERNAL_SERVER_ERROR,
                    'ERROR_FINDING_POST',
                    thrownError
                );
            }
        });
    });
});
