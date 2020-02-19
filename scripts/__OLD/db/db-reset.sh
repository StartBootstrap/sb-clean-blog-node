source ./scripts/env.sh;

export NEW_DB=$TYPE_ORM_DATABASE;
export TYPE_ORM_DATABASE=template1;

node_modules/.bin/ts-node ./node_modules/typeorm/cli query "DROP DATABASE IF EXISTS $NEW_DB"
if [ "$?" != "0" ]; then exit -1; fi

node_modules/.bin/ts-node ./node_modules/typeorm/cli query "CREATE DATABASE $NEW_DB"
if [ "$?" != "0" ]; then exit -1; fi

npm run db:migrate
if [ "$?" != "0" ]; then exit -1; fi
