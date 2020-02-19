import sh from 'shelljs';

import { _handleShellResult } from './shared';

_handleShellResult(sh.rm('-rf', 'dist/*'));
