import { findPost } from '@app/routes/_shared/posts';
import httpCodes from '@inip/http-codes';
import {
    DeletePostErrorCodes,
    DeletePostParams,
} from '@start-bootstrap/sb-clean-blog-shared-types';
import fastify from 'fastify';
import { getConnection } from 'typeorm';

export const postsDelete: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.route({
        method: 'DELETE',
        url: '/:id',
        schema,
        preHandler: [instance.isRoot],
        handler,
    });
};

export const handler: fastify.RequestHandlerWithParams<DeletePostParams> = async function(
    request,
    reply
): Promise<undefined> {
    const deletePostParams: DeletePostParams = request.params;
    const entityManager = getConnection().manager;
    const foundPost = await findPost(request, deletePostParams.id);

    try {
        await entityManager.remove([foundPost].filter(entity => !!entity));
    } catch (error) {
        throw request.generateError<DeletePostErrorCodes>(
            httpCodes.INTERNAL_SERVER_ERROR,
            'ERROR_DELETING_POST',
            error
        );
    }

    reply.code(httpCodes.NO_CONTENT);
    return;
};

const schema = {
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
            },
        },
    },
    response: {
        204: {
            description: 'Successfully deleted',
            type: 'null',
        },
    },
};
