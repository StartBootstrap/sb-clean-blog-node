import { TestDecodedToken } from '@start-bootstrap/sb-clean-blog-shared-types';

export const generateToken = jest.fn(() => 'TEST_GENERATED_TOKEN');
export const validateToken = jest.fn(() => new TestDecodedToken());
