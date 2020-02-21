import httpCodes from '@inip/http-codes';
import { mockCompare } from '@mocks/bcrypt';
import {
    mockFastifyInstance,
    mockGenerateError,
    mockRoute,
    replyMock,
    requestMock,
} from '@mocks/fastify';
import { mockFindOne } from '@mocks/typeorm';
import { TestLoginPayload } from '@start-bootstrap/sb-clean-blog-shared-types';
import { TestUser } from '@testing/objects';
import fastify, { FastifyInstance } from 'fastify';

import { handler, login } from './login';

describe('Login', () => {
    beforeEach(() => {
        mockFindOne.mockReset();
        requestMock.body = new TestLoginPayload();
    });

    it('should create the login route', async () => {
        login(fastify(), {}, () => {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should log the user in', async () => {
        mockFindOne.mockImplementation(() => new TestUser());
        const returnValue = await handler.call(
            <FastifyInstance>(<unknown>mockFastifyInstance),
            requestMock,
            replyMock
        );
        expect(mockFindOne).toHaveBeenCalled();
        expect(mockCompare).toHaveBeenCalled();
        expect(returnValue).toEqual('TEST_GENERATE_TOKEN_RESPONSE');
    });
    it('should generateError if user is not found', async () => {
        try {
            const returnValue = await handler.call(
                <FastifyInstance>(<unknown>mockFastifyInstance),
                requestMock,
                replyMock
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.NOT_FOUND,
                'EMAIL_NOT_FOUND'
            );
        }
    });
    it('should generateError if password is invalid', async () => {
        mockFindOne.mockImplementation(() => new TestUser());
        mockCompare.mockImplementation(() => false);
        try {
            const returnValue = await handler.call(
                <FastifyInstance>(<unknown>mockFastifyInstance),
                requestMock,
                replyMock
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.UNAUTHORIZED,
                'INVALID_PASSWORD'
            );
        }
    });
});
