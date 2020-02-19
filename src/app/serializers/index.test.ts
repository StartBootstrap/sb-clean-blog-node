import { IncomingMessage, ServerResponse } from 'http';

import { requestSerializer, responseSerializer } from './index';

describe('Serializers', () => {
    it('should serialize the response', () => {
        const serialized = responseSerializer(<ServerResponse>(<unknown>{
            statusCode: 200,
            a: 1,
            b: 2,
        }));

        expect(serialized).toEqual({
            statusCode: 200,
        });
    });
    it('should serialize the request', () => {
        const serialized = requestSerializer(<IncomingMessage>(<unknown>{
            method: 'GET',
            url: 'URL',
            headers: [],
            a: 1,
            b: 2,
        }));

        expect(serialized).toEqual({
            method: 'GET',
            url: 'URL',
            headers: [],
        });
    });
});
