import config from '@lib/config';
import entities from '@lib/orm/entity';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const initORM = async (connectionOverrides?: Partial<PostgresConnectionOptions>) => {
    console.log('### INFO: Creating Postgres Connection for typeORM');
    try {
        const connection = await createConnection(<PostgresConnectionOptions>{
            ...config.typeORM,
            entities,
            ...connectionOverrides,
        });

        console.log('### INFO: Connection Established');
        return connection;
    } catch (error) {
        return console.log(error);
    }
};
