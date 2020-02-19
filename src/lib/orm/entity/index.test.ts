import entities from './index';

describe('Entities', () => {
    it('should create each entity', () => {
        entities.forEach(entity => {
            const e = new entity();
        });
    });
});
