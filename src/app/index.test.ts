import { mockDecorateRequest, mockListen, mockReady, mockRegister } from '@mocks/fastify';
import fastify from 'fastify';

import { FastifyApp } from './index';
import { routes } from './routes';

jest.mock('./routes', () => {
    return {
        __esModule: true,
        routes: jest.fn(() => {}),
    };
});

const mockedRoutes = routes as jest.MockedFunction<typeof routes>;

describe('Initializing App', () => {
    beforeEach(() => {
        mockedRoutes.mockReset();
        mockListen.mockReset();
    });

    it('should init and listen', async () => {
        const app = new FastifyApp();
        await app.listen();
        expect(fastify).toHaveBeenCalled();
        expect(mockDecorateRequest).toHaveBeenCalled();
        expect(mockRegister).toHaveBeenCalled();
        expect(mockReady).toHaveBeenCalled();
        expect(mockListen).toHaveBeenCalled();
    });

    it('should log on errors', async () => {
        const mockExit = jest
            .spyOn(process, 'exit')
            .mockImplementation((code?: number | undefined): never => {
                throw 1;
            });
        mockListen.mockImplementation(() => {
            throw new Error('TEST_ERROR');
        });
        const app = new FastifyApp();
        try {
            await app.listen();
        } catch (error) {
            expect(error).toBe(1);
        }
        expect(mockExit).toHaveBeenCalled();
    });
});
