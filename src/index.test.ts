import { FastifyApp } from '@app/index';
import { initORM } from '@lib/orm';

import main from './index';

jest.mock('@lib/orm');
jest.mock('@app/index');

test('Main should init', async () => {
    await main();

    // Already each called once when we imported
    expect(initORM).toHaveBeenCalledTimes(2);
    expect(<jest.Mock>FastifyApp).toHaveBeenCalledTimes(2);
});
