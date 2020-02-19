/* tslint:disable: ordered-imports */

import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const rootPassword = process.env.DB_ROOT_USER_PASSWORD;

if (!rootPassword) {
    console.error(
        chalk.red(
            'ERROR: Please add a password for the root@root user via DB_ROOT_USER_PASSWORD in .env\n'
        )
    );
    process.exit(-1);
}

import { seedDB } from '@lib/util';

seedDB(<string>rootPassword, true);
