export const mockCompare = jest.fn(() => true);
export const mockHash = jest.fn(() => 'TEST_HASH');
export default {
    compare: mockCompare,
    hash: mockHash,
};
