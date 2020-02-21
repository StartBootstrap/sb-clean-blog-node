const autoMocks = jest.genMockFromModule<{}>('fastify-helmet');

export default {
    ...autoMocks,
};
