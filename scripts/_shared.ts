import chalk from 'chalk';
import sh from 'shelljs';

export function _handleShellResult(result: sh.ShellString) {
    if (result.code !== 0) {
        console.log(chalk.red(`### ERROR: ${result.stderr}`));
        process.exit(-1);
    }
}
