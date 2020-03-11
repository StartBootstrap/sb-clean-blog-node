import { FastifyApp } from '@app/index';
import { initORM } from '@lib/orm';

const main = async () => {
    await initORM();
    const fastifyApp = new FastifyApp();
    await fastifyApp.listen();
};

export default main;

main();
