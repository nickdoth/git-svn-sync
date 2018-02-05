const { exec, echo } = require('shelljs');
const { critical } = require('./utils');
const colors = require('colors');

critical(exec('git stash save -a'), 'Fatal: Cannot stash your changes, exit');
exec('git rebase master');
echo('Please run `git stash pop` manually after rebase done.'.blue);
// exec('git stash pop');