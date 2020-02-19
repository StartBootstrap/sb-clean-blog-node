source ./scripts/env.sh;

npm run clean;
npm run build;
npm run keys;

node "$@" --require ts-node/register src/index.ts
