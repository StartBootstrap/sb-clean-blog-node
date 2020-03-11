import { paramCase } from 'change-case';
import { execFileSync } from 'child_process';

import pj from '../../package.json';

const imageName = paramCase(pj.name);
const version = pj.version;

execFileSync('docker', ['run', '-it', `${imageName}:${version}`, 'bash'], { stdio: 'inherit' });
