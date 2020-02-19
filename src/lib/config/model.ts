export interface Config {
    port: number;
    devMode: boolean;
    internal: boolean;
    featureToggles: FeatureToggles;
    logging: LogginConfig;
    auth: AuthConfig;
    typeORM: TypeORMConfig;
}

export interface FeatureToggles {
    multiTenant: boolean;
}

export interface LogginConfig {
    prettyPrint: boolean;
    level: string;
}
export interface AuthConfig {
    jwtSecret: string;
    jwtTokenExpiration: number;
    saltRounds: number;
}
export interface TypeORMConfig {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: boolean;
}
