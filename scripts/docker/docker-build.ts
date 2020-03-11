import { paramCase } from 'change-case';
import sh from 'shelljs';

import pj from '../../package.json';
import { _handleShellResult } from '../_shared';

const imageName = paramCase(pj.name);
const version = pj.version;

_handleShellResult(
    sh.exec(`export NODE_ENV=dev && docker build \
    --build-arg NODE_ENV \
    -t ${imageName}:latest \
    -t ${imageName}:${version} \
    .`)
);
