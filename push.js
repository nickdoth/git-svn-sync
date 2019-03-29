const { exec, echo } = require('shelljs');
const { critical, isValidDCommitSource } = require('./utils');
const { ensureClean } = require('./stashing');
const child_process = require('child_process');

const branch = critical(exec("git rev-parse --abbrev-ref HEAD"), 
    'Fatal: Cannot get current branch name, exit.').stdout.trim();

// DCommit command
// let dcommit = () => exec('git svn dcommit');
let dcommit = () => child_process.execFileSync('git', ['svn', 'dcommit'], { stdio: 'inherit' });

ensureClean(() => {
    if (isValidDCommitSource(branch)) {
        echo('** '.green + 'Perform git svn dcommit...'.bold);
        dcommit();
    }
    else {
        echo(`Fatal: You must rebase the \`master\` branch or`.red);
        echo(`a branch that is starting with \`@\` (which indicates a svn-tracking branch)`.red);
    }
});
