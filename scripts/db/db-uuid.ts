import sh from 'shelljs';

import { _handleShellResult } from '../_shared';

process.env.TYPE_ORM_DATABASE = 'template1';

_handleShellResult(sh.exec(`npm run cli -- query "select * from pg_extension"`));
_handleShellResult(sh.exec(`npm run cli -- query "CREATE EXTENSION \\\"uuid-ossp\\\""`));
_handleShellResult(sh.exec(`npm run cli -- query "select * from pg_extension"`));

process.env.TYPE_ORM_DATABASE = process.env.NEW_DB;

_handleShellResult(sh.exec(`npm run db:migration:run`));
