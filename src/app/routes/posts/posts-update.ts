import { findPost } from '@app/routes/_shared/posts';
import httpCodes from '@inip/http-codes';
import { Post } from '@lib/orm/entity';
import {
    ResultsPost,
    UpdatePostErrorCodes,
    UpdatePostParams,
    UpdatePostPayload,
} from '@start-bootstrap/sb-clean-blog-shared-types';
import fastify from 'fastify';
import { getConnection } from 'typeorm';

export const postsUpdate: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.route({
        method: 'PUT',
        url: '/:id',
        schema,
        preHandler: [instance.isRoot],
        handler,
    });
};

export const handler: fastify.RequestHandlerWithParams<UpdatePostParams> = async function(
    request,
    reply
): Promise<ResultsPost> {
    const updatePostParams: UpdatePostParams = request.params;
    const updatePostPayload: UpdatePostPayload = request.body;
    const postRepository = getConnection().getRepository(Post);
    const foundPost = await findPost(request, updatePostParams.id);

    updatePostPayload.backgroundImage = updatePostPayload.backgroundImage
        ? `url("${updatePostPayload.backgroundImage}")`
        : undefined;

    Object.assign(foundPost, updatePostPayload);

    try {
        await postRepository.save(foundPost);
    } catch (error) {
        throw request.generateError<UpdatePostErrorCodes>(
            httpCodes.INTERNAL_SERVER_ERROR,
            'ERROR_UPDATING_POST',
            error
        );
    }

    return foundPost.toResultsPost();
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
    body: {
        type: 'object',
        properties: {
            backgroundImage: { type: 'string' },
            heading: { type: 'string' },
            subHeading: { type: 'string' },
            meta: { type: 'string' },
            body: { type: 'string' },
        },
        required: [],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                slug: { type: 'string' },
                backgroundImage: { type: 'string' },
                heading: { type: 'string' },
                subHeading: { type: 'string' },
                meta: { type: 'string' },
                body: { type: 'string' },
            },
        },
    },
};
