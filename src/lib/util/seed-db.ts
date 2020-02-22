import config from '@lib/config';
import { initORM } from '@lib/orm';
import { Post, User } from '@lib/orm/entity';
import bcrypt from 'bcrypt';
import chalk from 'chalk';
import { paramCase } from 'change-case';
import { LoremIpsum } from 'lorem-ipsum';
import pLimit from 'p-limit';
import { EntityManager, getConnection } from 'typeorm';

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

    // await _seedUser(entityManager, rootPassword);
    await _seedPosts(entityManager);
};

async function _seedUser(entityManager: EntityManager, rootPassword: string) {
    console.log(chalk.green('INFO: Creating root@root User'));
    try {
        const createdRootUser = await entityManager.save(
            entityManager.create(User, {
                ...rootUser,
                passwordHash: await bcrypt.hash(rootPassword, config.auth.saltRounds),
            })
        );
        console.log(chalk.green('INFO: root@root User Created'));
        console.log(chalk.blue(JSON.stringify(createdRootUser, null, 4)));
    } catch (error) {
        console.log(error);
    }
}

async function _seedPosts(entityManager: EntityManager) {
    console.log(chalk.green('INFO: Creating initial posts'));
    const lorem = new LoremIpsum();

    const limit = pLimit(2);

    const promises = [];
    for (let i = 0; i < 8; i++) {
        promises.push(
            entityManager.create(Post, {
                slug: paramCase(lorem.generateWords(5)).toLowerCase(),
                backgroundImage: 'url("assets/img/post-bg.jpg")',
                heading: lorem.generateSentences(1),
                subHeading: lorem.generateSentences(1),
                meta: lorem.generateSentences(1),
                body: lorem.generateParagraphs(7),
            })
        );
    }

    try {
        const createdPosts = await Promise.all(promises);
        const savedPosts = await entityManager.save(entityManager.create(Post, createdPosts));

        console.log(chalk.blue(JSON.stringify(savedPosts, null, 4)));
    } catch (error) {
        console.log(error);
    }
}
