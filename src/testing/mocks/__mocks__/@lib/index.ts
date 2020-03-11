export const mockInitOrm = jest.fn(() => 'INIT_ORM_RESPONSE');

export const initOrm = mockInitOrm;

// Need to also export here
module.exports = {
    initOrm: mockInitOrm,
    mockInitOrm,
};
