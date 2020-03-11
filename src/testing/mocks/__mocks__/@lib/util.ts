export const mockSeedDB = jest.fn(() => 'SEED_DB_RESPONSE');

// Need to also export here
module.exports = {
    seedDB: mockSeedDB,
    mockSeedDB,
};
