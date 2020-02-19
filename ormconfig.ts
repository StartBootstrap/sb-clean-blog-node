import chalk from 'chalk';
import { ConnectionOptions, DatabaseType } from 'typeorm';

const config: ConnectionOptions = <ConnectionOptions>{
    type: <DatabaseType>process.env.TYPE_ORM_CONNECTION,
    host: <string>process.env.TYPE_ORM_HOST,
    port: <number>Number(<string>process.env.TYPE_ORM_PORT),
    username: <string>process.env.TYPE_ORM_USERNAME,
    password: <string>process.env.TYPE_ORM_PASSWORD,
    database: <string>process.env.TYPE_ORM_DATABASE,
    synchronize: <boolean>(process.env.TYPE_ORM_SYNCHRONIZE === 'true' || false),
    entities: [__dirname + '/src/lib/orm/entity/index.ts'],
    migrations: [__dirname + '/src/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations',
    },
};

console.log(chalk.green('### INFO: Using ormconfig.ts'));

export = config;
