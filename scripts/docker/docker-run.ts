import { paramCase } from 'change-case';
import sh from 'shelljs';

import pj from '../../package.json';

const imageName = paramCase(pj.name);

const isRunning = sh.exec(`docker ps -a -q -f name=${imageName}`, { silent: true }).stdout;
const PORT = process.env.PORT;

if (isRunning) {
    sh.exec(`docker rm -f ${imageName}`);
}

sh.exec(`docker run -d --name ${imageName} -p ${PORT}:80 ${imageName}:latest`);
sh.exec(`docker ps`);

console.log(`\n\n### INFO: ${imageName} is running at:\n\n\thttp://localhost:${PORT}\n`);
