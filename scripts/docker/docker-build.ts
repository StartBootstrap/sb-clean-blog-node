import { paramCase } from 'change-case';
import sh from 'shelljs';

import pj from '../../package.json';

const imageName = paramCase(pj.name);
const version = pj.version;

sh.exec(`export NODE_ENV=production && docker build \
    --build-arg NODE_ENV \
    -t ${imageName}:latest \
    -t ${imageName}:${version} \
    .`);
