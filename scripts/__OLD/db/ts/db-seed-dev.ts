/* tslint:disable: ordered-imports */

import chalk from 'chalk';
import moduleAlias from 'module-alias';
import path from 'path';
import dotenv from 'dotenv';

moduleAlias.addAliases({
    '@app': path.join(process.cwd(), 'src/app'),
    '@lib': path.join(process.cwd(), 'src/lib'),
    '@models': path.join(process.cwd(), 'src/models'),
    '@keys': path.join(process.cwd(), 'keys'),
});

dotenv.config();

const rootPassword = process.env.DB_ROOT_USER_PASSWORD;

if (!rootPassword) {
    console.error(
        chalk.red(
            '### ERROR: Please add a password for the root@root user via DB_ROOT_USER_PASSWORD in .env\n'
        )
    );
    process.exit(-1);
}

import { seedDB } from '@lib/util';

seedDB(<string>rootPassword, true);
