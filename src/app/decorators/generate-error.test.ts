import { requestMock } from '@mocks/fastify';

import { generateError } from './generate-error';

describe('Decorator generateError', () => {
    it('should generate a FastifyError and return it', async () => {
        const generatedError = generateError.call(requestMock, 500, 'TEST_ERROR');
        expect(generatedError).toBeInstanceOf(Error);
    });
    it('should log the thrownError if provided', async () => {
        const generatedError = generateError.call(
            requestMock,
            500,
            'TEST_THROWN_ERROR',
            new Error('THROWN_ERROR')
        );
        expect(generatedError).toBeInstanceOf(Error);
        expect(requestMock.log.error).toHaveBeenCalled();
    });
});
