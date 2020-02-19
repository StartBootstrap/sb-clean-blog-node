import httpCodes from '@inip/http-codes';
import { mockGenerateError, requestMock } from '@mocks/fastify';
import { mockFindOne } from '@mocks/typeorm';
import { TestUser } from '@testing/objects';

import { findUser } from './users';

describe('Users Shared', () => {
    describe('findUser', () => {
        beforeEach(() => {
            mockFindOne.mockReset();
        });
        it('should return the found user', async () => {
            const testUser = new TestUser();
            mockFindOne.mockImplementation(() => testUser);
            const returnValue = await findUser(requestMock, '00000000-0000-0000-0000-000000000001');
            expect(returnValue).toBe(testUser);
        });
        it('should error if the user does not exist', async () => {
            try {
                const returnValue = await findUser(
                    requestMock,
                    '00000000-0000-0000-0000-000000000001'
                );
            } catch (error) {
                expect(mockGenerateError).toHaveBeenLastCalledWith(
                    httpCodes.NOT_FOUND,
                    'USER_NOT_FOUND'
                );
            }
        });
        it('should catch errors when trying to find user', async () => {
            const thrownError = new Error('TEST_ERROR');
            mockFindOne.mockImplementation(() => {
                throw thrownError;
            });
            try {
                const returnValue = await findUser(
                    requestMock,
                    '00000000-0000-0000-0000-000000000001'
                );
            } catch (error) {
                expect(mockGenerateError).toHaveBeenLastCalledWith(
                    httpCodes.INTERNAL_SERVER_ERROR,
                    'ERROR_FINDING_USER',
                    thrownError
                );
            }
        });
    });
});
