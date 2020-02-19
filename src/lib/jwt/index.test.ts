import { mockSign, mockVerify } from '@mocks/jsonwebtoken';
import { TestUserForToken } from '@start-bootstrap/sb-clean-blog-shared-types';
import { TestUser } from '@testing/objects';

import userForToken, { generateTokenResponse, validateToken } from './index';

jest.mock('jsonwebtoken');

describe('JWT', () => {
    it('should generate a token', () => {
        generateTokenResponse(new TestUser());
        expect(mockSign).toHaveBeenCalled();
    });
    it('should validate a token', () => {
        validateToken('TEST_TOKEN');
        expect(mockVerify).toHaveBeenCalled();
    });
    it('should create a UserForToken from User', () => {
        const results = userForToken(new TestUser());
        expect(results).toEqual(new TestUserForToken());
    });
});
