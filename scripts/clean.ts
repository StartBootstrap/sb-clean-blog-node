import sh from 'shelljs';

import { _handleShellResult } from './_shared';

_handleShellResult(sh.rm('-rf', '_transpiled/*'));
_handleShellResult(sh.rm('-rf', 'build/*'));
