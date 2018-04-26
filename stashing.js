require('colors');
const { exec, echo } = require('shelljs');
const { critical } = require('./utils');

exports.ensureClean = function(job) {
    let stat = critical(exec('git status --porcelain', { silent: true }), `Fatal: Cannot read git status, exit.`);

    // Working tree clean or not
    let isClean = !stat.stdout.trim();

    if (!isClean) {
        echo('-> '.cyan + 'pushing stash changes...'.bold);
        critical(exec('git add .', { silent: true }), 'Fatal: Cannot add changes to index, exit');
        critical(exec('git stash',  { silent: true }), 'Fatal: Cannot stash your changes, exit');
    }

    job();

    if (!isClean) {
        echo('<- '.cyan + 'popping stash...'.bold);
        exec('git stash pop', { silent: true });
    }
}