import httpCodes from '@inip/http-codes';
import { mockGenerateError } from '@mocks/fastify';
import { mockEMCreate, mockEMSave, mockFindOne, mockGetConnection } from '@mocks/typeorm';

import { seedDB } from './index';

describe('Seed DB', () => {
    beforeEach(() => {
        mockFindOne.mockReset();
        mockEMSave.mockReset();
    });

    it('should seed the database with existing connection', async () => {
        await seedDB('PASSWORD');
        expect(mockGetConnection).toHaveBeenCalled();
        expect(mockEMCreate).toHaveBeenCalled();
        expect(mockEMSave).toHaveBeenCalled();
    });

    it('should seed the database with a new connection', async () => {
        await seedDB('PASSWORD', true);
        expect(mockEMSave).toHaveBeenCalled();
    });
    it('should catch errors when trying to create post', async () => {
        const thrownError = new Error('TEST_ERROR');
        mockEMSave.mockImplementation(() => {
            throw thrownError;
        });
        try {
            await seedDB('PASSWORD');
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.INTERNAL_SERVER_ERROR,
                'ERROR_CREATING_POST',
                thrownError
            );
        }
    });
});
