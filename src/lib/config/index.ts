import { Config } from './model';

const config: Config = {
    port: <number>Number(<string>process.env.PORT) || 8200,
    devMode: <boolean>(process.env.DEV_MODE === 'true' || false),
    internal: <boolean>(process.env.INTERNAL === 'true' || false),
    featureToggles: {
        multiTenant: <boolean>(process.env.MULTI_TENANT === 'true' || false),
    },
    logging: {
        prettyPrint: <boolean>(process.env.LOGGING_PRETTY_PRINT === 'true' || false),
        level: process.env.LOGGING_LEVEL || 'info',
    },
    auth: {
        jwtSecret: <string>process.env.JWT_SECRET,
        jwtTokenExpiration: <number>Number(<string>process.env.JWT_TOKEN_EXPIRATION) || 300,
        saltRounds: <number>Number(<string>process.env.BCRYPT_SALT_ROUNDS) || 12,
    },
    typeORM: {
        type: <string>process.env.TYPE_ORM_CONNECTION,
        host: <string>process.env.TYPE_ORM_HOST,
        port: <number>Number(<string>process.env.TYPE_ORM_PORT),
        username: <string>process.env.TYPE_ORM_USERNAME,
        password: <string>process.env.TYPE_ORM_PASSWORD,
        database: <string>process.env.TYPE_ORM_DATABASE,
        synchronize: <boolean>(process.env.TYPE_ORM_SYNCHRONIZE === 'true' || false),
        logging: <boolean>(process.env.TYPE_ORM_LOGGING === 'true' || false),
    },
};

export default config;
