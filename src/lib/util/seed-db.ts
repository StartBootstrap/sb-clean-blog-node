import config from '@lib/config';
import { initORM } from '@lib/orm';
import { Post, User } from '@lib/orm/entity';
import bcrypt from 'bcrypt';
import chalk from 'chalk';
import { paramCase } from 'change-case';
import { LoremIpsum } from 'lorem-ipsum';
import moment from 'moment';
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

    await _seedUser(entityManager, rootPassword);
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
    const INITIAL_BLOG_COUNT = 5;

    const promises = [];
    for (let i = 0; i < INITIAL_BLOG_COUNT; i++) {
        const heading = lorem.generateSentences(1);
        const subHeading = lorem.generateSentences(1);
        promises.push(
            limit(() =>
                entityManager.create(Post, {
                    slug: paramCase(heading).toLowerCase(),
                    backgroundImage: 'url("assets/img/post-bg.jpg")',
                    heading,
                    subHeading,
                    body:
                        `# ${heading}\n\n${subHeading}\n\n` +
                        `## ${lorem.generateSentences(1)}\n\n${lorem.generateParagraphs(1)}`,
                    createdAt: moment()
                        .subtract(2 * i, 'days')
                        .format(),
                })
            )
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
