import { Post, User } from '@lib/orm/entity';
import { ResultsPost, ResultsUser } from '@start-bootstrap/sb-clean-blog-shared-types';
import { DeepPartial } from 'typeorm';

export class TestUser implements User {
    id = '00000000-0000-0000-0000-000000000001';
    firstName = 'TEST_FIRST_NAME';
    lastName = 'TEST_LAST_NAME';
    email = 'TEST@TEST.TEST';
    passwordHash = 'TEST_PASSWORD_HASH';
    createdAt = new Date();
    updatedAt = new Date();
    version = 0;
    toResultsUser(): ResultsUser {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
        };
    }
}

export class TestPost implements Post {
    id = '00000000-0000-0000-0000-000000000001';
    slug = 'TEST_SLUG';
    backgroundImage = 'TEST_BACKGROUND_IMAGE';
    heading = 'TEST_HEADING';
    subHeading = 'TEST_SUB_HEADING';
    meta = 'TEST_META';
    body = 'TEST_BODY';
    createdAt = new Date();
    updatedAt = new Date();
    version = 0;
    toResultsPost(): ResultsPost {
        return {
            id: this.id,
            slug: this.slug,
            backgroundImage: this.backgroundImage,
            heading: this.heading,
            subHeading: this.subHeading,
            meta: this.meta,
            body: this.body,
        };
    }
}

export class TestPostCreate implements DeepPartial<Post> {
    slug = 'test-slug';
    backgroundImage = 'url("TEST_BACKGROUND_IMAGE")';
    heading = 'TEST_HEADING';
    subHeading = 'TEST_SUB_HEADING';
    meta = 'TEST_META';
    body = 'TEST_BODY';
}
