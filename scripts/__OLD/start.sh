source ./scripts/env.sh;

npm run clean;
npm run build;
npm run keys;

node_modules/.bin/concurrently \
    --names "TSC,NODEMON" \
    -c "bgBlue.bold,bgGreen.bold" \
    "npm:build:watch" \
    "npm:serve" \
    --kill-others

    # -p "{name} - {time}" \
