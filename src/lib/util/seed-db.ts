import { initORM } from '@lib/orm';
import { User } from '@lib/orm/entity';
import chalk from 'chalk';
import { getConnection } from 'typeorm';

const rootUser: Partial<User> = {
    firstName: 'root',
    lastName: 'root',
    email: 'root@root',
};

export const seedDB = async (rootPassword: string, createConnection = false) => {
    if (createConnection) {
        await initORM();
    }
    const entityManager = getConnection().manager;

    console.log(chalk.green('INFO: Creating root@root User'));
    try {
        const createdRootUser = await entityManager.save(
            entityManager.create(User, {
                ...rootUser,
                passwordHash: rootPassword,
            })
        );
        console.log(chalk.green('INFO: root@root User Created'));
        console.log(chalk.blue(JSON.stringify(createdRootUser, null, 4)));
    } catch (error) {
        console.log(error);
    }
};
