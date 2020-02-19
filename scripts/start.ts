import concurrently from 'concurrently';

concurrently(
    [
        {
            command: 'npm:build:watch',
            name: 'TSC',
            prefixColor: 'bgBlue.bold',
        },
        {
            command: 'npm:serve',
            name: 'NODEMON',
            prefixColor: 'bgGreen.bold',
        },
    ],
    {
        prefix: 'name',
        killOthers: ['failure', 'success'],
    }
).then(success, failure);

function success() {
    console.log('Success');
}

function failure() {
    console.log('Failure');
}
