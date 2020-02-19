import cryptoRandomString from 'crypto-random-string';

export const confirmationToken = () => {
    const randomString = cryptoRandomString({
        length: 12,
        characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    });

    return randomString.replace(/(\w{4})(\w{4})(\w{4})/, '$1-$2-$3');
};
