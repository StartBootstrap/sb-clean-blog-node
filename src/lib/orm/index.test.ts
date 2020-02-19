import { createConnection } from 'typeorm';

import { initORM } from './index';

describe('ORM tests', () => {
    beforeEach(() => {
        (<jest.Mock>createConnection).mockReset();
    });

    test('ORM should init', () => {
        initORM();
        expect(createConnection).toHaveBeenCalledTimes(1);
    });

    test('ORM should handle errors on init', () => {
        (<jest.Mock>createConnection).mockImplementation(() => {
            throw Error('TEST_ERROR');
        });
        initORM();
        expect(createConnection).toHaveBeenCalledTimes(1);
    });
});
