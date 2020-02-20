import { FastifyApp } from '@app/index';
import { initORM } from '@lib/orm';

export default class Main {
    static async init(): Promise<void> {
        await initORM();
        const fastifyApp = new FastifyApp();
        await fastifyApp.listen();
    }
}

Main.init();
