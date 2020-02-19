import { FastifyError, FastifyRequest } from 'fastify';

export function generateError(
    this: FastifyRequest,
    statusCode: number,
    message: string,
    thrownError?: Error
): FastifyError {
    if (thrownError) {
        this.log.error(thrownError);
    }
    const err: FastifyError = new Error();
    err.statusCode = statusCode;
    err.message = message;
    return err;
}
