import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';

export const mockAddHook = jest.fn((name: string, decoration: unknown) => {});
export const mockDecorate = jest.fn((name: string, decoration: unknown) => {});
export const mockDecorateReply = jest.fn((name: string, decoration: unknown) => {});
export const mockDecorateRequest = jest.fn((name: string, decoration: unknown) => {});
export const mockListen = jest.fn((port: number, address: string) => {});
export const mockLog = {
    error: jest.fn(() => {}),
};
export const mockPrintRoutes = jest.fn(() => {});
export const mockReady = jest.fn(cb => {
    cb();
});
export const mockRegister = jest.fn((plugin: unknown, options: unknown) => {});
export const mockRoute = jest.fn((options: unknown) => {});

const autoMocks = jest.genMockFromModule<{}>('fastify');

export const mockFastifyInstance = {
    ...autoMocks,
    addHook: mockAddHook,
    decorate: mockDecorate,
    decorateReply: mockDecorateReply,
    decorateRequest: mockDecorateRequest,
    listen: mockListen,
    log: mockLog,
    printRoutes: mockPrintRoutes,
    ready: mockReady,
    register: mockRegister,
    route: mockRoute,
};

export default jest.fn(() => mockFastifyInstance);
// export default jest.fn().mockImplementation(() => mockFastifyInstance);

export const mockGenerateError = jest.fn(() => {});

export const requestMock = <FastifyRequest>(<unknown>{
    log: mockLog,
    headers: {},
    generateError: mockGenerateError,
});

export const requestMockWithParams = <unknown>{
    log: mockLog,
    generateError: mockGenerateError,
};

export const mockCode = jest.fn(() => {});
export const mockSend = jest.fn(() => {});

export const replyMock = <FastifyReply<ServerResponse>>(<unknown>{
    code: mockCode,
    send: mockSend,
});
