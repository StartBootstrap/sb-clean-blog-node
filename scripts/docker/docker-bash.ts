import { paramCase } from 'change-case';
import sh from 'shelljs';

import pj from '../../package.json';

const imageName = paramCase(pj.name);
const version = pj.version;

sh.exec(`docker run -it ${imageName}:${version} bash`);
