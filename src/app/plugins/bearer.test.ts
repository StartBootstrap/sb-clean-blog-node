import httpCodes from '@inip/http-codes';
import { validateToken } from '@lib/jwt';
import {
    mockAddHook,
    mockDecorate,
    mockFastifyInstance,
    mockGenerateError,
    replyMock,
    requestMock,
} from '@mocks/fastify';
import { mockFindOne } from '@mocks/typeorm';
import { TestDecodedToken } from '@start-bootstrap/sb-clean-blog-shared-types';
import { TestUser } from '@testing/objects';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { bearerHook, bearerPlugin } from './bearer';

describe('Plugins bearer', () => {
    beforeEach(() => {
        mockFindOne.mockReset();
        (<jest.Mock>validateToken).mockReset();
    });
    it('should decorate the instance and add a hook', () => {
        bearerPlugin(<FastifyInstance>(<unknown>mockFastifyInstance), {}, () => {});
        expect(mockAddHook).toHaveBeenCalled();
        expect(mockDecorate).toHaveBeenCalled();
    });
    it('should return if there is no auth header', async () => {
        await bearerHook.call(
            <FastifyInstance>(<unknown>mockFastifyInstance),
            requestMock,
            replyMock,
            () => {}
        );
        expect(validateToken).not.toHaveBeenCalled();
    });
    it('should error if auth header does not contain bearer', async () => {
        try {
            await bearerHook.call(
                <FastifyInstance>(<unknown>mockFastifyInstance),
                {
                    ...requestMock,
                    headers: {
                        authorization: 'asd 123',
                    },
                },
                replyMock,
                () => {}
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.BAD_REQUEST,
                'BEARER_SCHEMA_REQUIRED'
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
    it('should error if auth token is not valid', async () => {
        const thrownError = new Error('TEST_ERROR');
        (<jest.Mock>validateToken).mockImplementation(() => {
            throw thrownError;
        });
        try {
            await bearerHook.call(
                <FastifyInstance>(<unknown>mockFastifyInstance),
                {
                    ...requestMock,
                    headers: {
                        authorization: 'bearer 123',
                    },
                },
                replyMock,
                () => {}
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.UNAUTHORIZED,
                'NOT_AUTHORIZED',
                thrownError
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
    it('should error if unable to find user from id in decrypted token', async () => {
        (<jest.Mock>validateToken).mockImplementation(() => new TestDecodedToken());
        try {
            await bearerHook.call(
                <FastifyInstance>(<unknown>mockFastifyInstance),
                {
                    ...requestMock,
                    headers: {
                        authorization: 'bearer 123',
                    },
                },
                replyMock,
                () => {}
            );
        } catch (error) {
            console.log(error);

            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.UNAUTHORIZED,
                'NOT_AUTHORIZED'
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
    it('should attach user to the request', async () => {
        const testUser = new TestUser();
        mockFindOne.mockImplementation(() => testUser);
        (<jest.Mock>validateToken).mockImplementation(() => new TestDecodedToken());
        const request = <FastifyRequest>{
            ...requestMock,
            headers: {
                authorization: 'bearer 123',
            },
        };
        await bearerHook.call(
            <FastifyInstance>(<unknown>mockFastifyInstance),
            request,
            replyMock,
            () => {}
        );

        expect(request.user).toEqual(testUser);
    });
});
