/* NOTE: Be sure to also export everything in the module.export also  */

// const autoMocks = jest.genMockFromModule<{}>('typeorm');

// const { PrimaryGeneratedColumn, Entity, Column } = jest.requireActual('typeorm');
const actualTypeorm = jest.requireActual('typeorm');

export const mockFind = jest.fn(() => {});
export const mockFindOne = jest.fn(() => {});
export const mockSave = jest.fn(() => {});
export const mockEMFindByIds = jest.fn(() => {});
export const mockEMFindOne = jest.fn(() => {});
export const mockEMSave = jest.fn(() => {});
export const mockEMCreate = jest.fn(() => {});
export const mockEMRemove = jest.fn(() => {});

export const mockGetRepository = jest.fn(() => ({
    find: mockFind,
    findOne: mockFindOne,
    save: mockSave,
}));

export const mockCreateConnection = jest.fn(() => {});

export const mockGetConnection = jest.fn(() => ({
    getRepository: mockGetRepository,
    manager: {
        findByIds: mockEMFindByIds,
        findOne: mockEMFindOne,
        save: mockEMSave,
        create: mockEMCreate,
        remove: mockEMRemove,
    },
    synchronize: mockSynchronize,
}));

export const mockSynchronize = jest.fn(() => {});

// Need to also export here
module.exports = {
    // ...autoMocks,
    ...actualTypeorm,
    getConnection: mockGetConnection,
    createConnection: mockCreateConnection,
    mockFind,
    mockFindOne,
    mockSave,
    mockEMFindByIds,
    mockEMFindOne,
    mockEMSave,
    mockEMCreate,
    mockEMRemove,
    mockGetRepository,
    mockCreateConnection,
    mockGetConnection,
    mockSynchronize,
};
