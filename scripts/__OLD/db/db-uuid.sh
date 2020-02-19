source ./scripts/env.sh;

export TYPE_ORM_DATABASE=template1;

node_modules/.bin/ts-node ./node_modules/typeorm/cli query "select * from pg_extension;"

node_modules/.bin/ts-node ./node_modules/typeorm/cli query "CREATE EXTENSION \"uuid-ossp\";"

node_modules/.bin/ts-node ./node_modules/typeorm/cli query "select * from pg_extension;"