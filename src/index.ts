/* tslint:disable: ordered-imports */
/*
    Using ModuleAlias to accomodate for this issue:
        https://github.com/Microsoft/TypeScript/issues/10866
    tldr; typescript doesn't map compilerOptions.paths for node
*/
// import ModuleAlias from './lib/module-alias';
// const moduleAlias = new ModuleAlias();

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
