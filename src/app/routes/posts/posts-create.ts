import httpCodes from '@inip/http-codes';
import { Post } from '@lib/orm/entity';
import {
    CreatePostErrorCodes,
    CreatePostPayload,
    ResultsPost,
} from '@start-bootstrap/sb-clean-blog-shared-types';
import { paramCase } from 'change-case';
import fastify from 'fastify';
import { getConnection } from 'typeorm';

export const postsCreate: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.route({
        method: 'POST',
        url: '/',
        schema,
        preHandler: [instance.isRoot],
        handler,
    });
};

export const handler: fastify.RequestHandler = async function(
    request,
    reply
): Promise<ResultsPost> {
    const createPostPayload: CreatePostPayload = request.body;
    const postRepository = getConnection().getRepository(Post);
    const entityManager = getConnection().manager;

    const slug = createPostPayload.slug
        ? paramCase(createPostPayload.slug).toLowerCase()
        : paramCase(createPostPayload.heading).toLowerCase();

    const existingSlug = await postRepository.findOne({
        where: { slug },
    });

    if (existingSlug) {
        throw request.generateError<CreatePostErrorCodes>(httpCodes.CONFLICT, 'SLUG_IN_USE');
    }

    let createdPost: Post;

    try {
        createdPost = await entityManager.save(
            entityManager.create(Post, {
                slug,
                backgroundImage: createPostPayload.backgroundImage
                    ? `url("${createPostPayload.backgroundImage}")`
                    : undefined,
                heading: createPostPayload.heading,
                subHeading: createPostPayload.subHeading,
                meta: createPostPayload.meta,
                body: createPostPayload.body,
            })
        );
    } catch (error) {
        throw request.generateError<CreatePostErrorCodes>(
            httpCodes.INTERNAL_SERVER_ERROR,
            'ERROR_CREATING_POST',
            error
        );
    }

    reply.code(httpCodes.CREATED);
    return createdPost.toResultsPost();
};

const schema = {
    response: {
        201: {
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
