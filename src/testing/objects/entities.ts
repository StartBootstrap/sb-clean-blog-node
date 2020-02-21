import { User } from '@lib/orm/entity';
import { ResultsUser } from '@start-bootstrap/sb-clean-blog-shared-types';

export class TestUser implements User {
    id = '00000000-0000-0000-0000-000000000000';
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
