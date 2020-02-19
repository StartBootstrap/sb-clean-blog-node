import { FastifyApp } from '@app/index';
import { initORM } from '@lib/orm';

import Main from './index';

jest.mock('@lib/orm');
jest.mock('@app/index');

test('Main should init', () => {
    // Appears that this loads the module, calling the Main.init() so we do not need to.
    const main = new Main();

    expect(initORM).toHaveBeenCalledTimes(1);
    expect(<jest.Mock>FastifyApp).toHaveBeenCalledTimes(1);
});
