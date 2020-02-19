import moduleAlias from 'module-alias';
import path from 'path';

export default class ModuleAlias {
    constructor() {
        console.log('registering module aliases');
        moduleAlias.addAliases({
            '@app': path.join(process.cwd(), '/dist/app'),
            '@lib': path.join(process.cwd(), 'dist/lib'),
            '@models': path.join(process.cwd(), 'dist/models'),
            '@inip': path.join(process.cwd(), 'node_modules/@inip'),
            '@keys': path.join(process.cwd(), '/dist/keys'),
        });
    }
}
