import httpCodes from '@inip/http-codes';
import { Post } from '@lib/orm/entity';
import { ReadPostErrorCodes } from '@start-bootstrap/sb-clean-blog-shared-types';
import fastify from 'fastify';
import { getConnection } from 'typeorm';

export const findPost = async function(request: fastify.FastifyRequest, id: UUID): Promise<Post> {
    const postRepository = getConnection().getRepository(Post);
    let foundPost: Post | undefined;

    try {
        foundPost = await postRepository.findOne(id);
    } catch (error) {
        throw request.generateError<ReadPostErrorCodes>(
            httpCodes.INTERNAL_SERVER_ERROR,
            'ERROR_FINDING_POST',
            error
        );
    }

    if (!foundPost) {
        throw request.generateError<ReadPostErrorCodes>(httpCodes.NOT_FOUND, 'POST_NOT_FOUND');
    }

    return foundPost;
};

export const findPostBySlug = async function(
    request: fastify.FastifyRequest,
    id: string
): Promise<Post> {
    const postRepository = getConnection().getRepository(Post);
    let foundPost: Post | undefined;

    try {
        foundPost = await postRepository.findOne({
            slug: id,
        });
    } catch (error) {
        throw request.generateError<ReadPostErrorCodes>(
            httpCodes.INTERNAL_SERVER_ERROR,
            'ERROR_FINDING_POST',
            error
        );
    }

    if (!foundPost) {
        throw request.generateError<ReadPostErrorCodes>(httpCodes.NOT_FOUND, 'POST_NOT_FOUND');
    }

    return foundPost;
};
