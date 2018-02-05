require('colors');
const { exec, echo } = require('shelljs');
const { critical, isValidDCommitSource } = require('./utils');
const { ensureClean } = require('./stashing');

let stat = critical(exec('git status --porcelain', { silent: true }), `Fatal: Cannot read git status, exit.`);

// Working tree clean or not
let isClean = !stat.stdout.trim();

const branch = critical(exec("git rev-parse --abbrev-ref HEAD", { silent: true }), 
    'Fatal: Cannot get current branch name, exit.').stdout.trim();

const rebase = () => {
    exec('git svn rebase');
}

ensureClean(() => {
    if (isValidDCommitSource(branch)) {
        echo("Perform git svn rebase...".green);
        rebase();
    }
    else {
        echo(`Fatal: You must rebase the \`master\` branch or`.red);
        echo(`a branch that is starting with \`@\` (which is indicating a svn-tracking branch)`.red);
    }
});