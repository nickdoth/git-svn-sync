const { exec, echo } = require('shelljs');
const { critical, isValidDCommitSource } = require('./utils');
const { ensureClean } = require('./stashing');

const branch = critical(exec("git rev-parse --abbrev-ref HEAD"), 
    'Fatal: Cannot get current branch name, exit.').stdout.trim();

// DCommit command
let dcommit = () => exec('git svn dcommit');

ensureClean(() => {
    if (isValidDCommitSource(branch)) {
        echo('** '.green + 'Perform git svn dcommit...'.bold);
        dcommit();
    }
    else {
        echo(`Fatal: You must rebase the \`master\` branch or`.red);
        echo(`a branch that is starting with \`@\` (which is indicating a svn-tracking branch)`.red);
    }
});
