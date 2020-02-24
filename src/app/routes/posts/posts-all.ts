import { Post } from '@lib/orm/entity';
import { ResultsPost } from '@start-bootstrap/sb-clean-blog-shared-types';
import fastify from 'fastify';
import { getConnection } from 'typeorm';

export const postsAll: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.route({
        method: 'GET',
        url: '/',
        schema,
        handler,
    });
};

export const handler: fastify.RequestHandler = async function(
    request,
    reply
): Promise<ResultsPost[]> {
    const postRepository = getConnection().getRepository(Post);
    const posts = await postRepository.find({
        order: {
            createdAt: 'DESC',
        },
    });

    return posts.map(post => post.toResultsPost());
};

const schema = {
    response: {
        200: {
            type: 'array',
            items: {
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
    },
};
