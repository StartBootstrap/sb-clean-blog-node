source ./scripts/env.sh;

npm run clean;
npm run build;
npm run keys;

node "$@" dist/index.js
