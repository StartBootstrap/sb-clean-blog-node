source ./scripts/env.sh;

export NEW_DB=$TYPE_ORM_DATABASE;
export TYPE_ORM_DATABASE=template1;

ts-node ./node_modules/typeorm/cli query "CREATE DATABASE $NEW_DB"
