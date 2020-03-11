import { TestDecodedToken } from '@start-bootstrap/sb-clean-blog-shared-types';

export const generateTokenResponse = jest.fn(() => 'TEST_GENERATE_TOKEN_RESPONSE');
export const validateToken = jest.fn(() => new TestDecodedToken());
