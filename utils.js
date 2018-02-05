require('colors');
const { echo } = require('shelljs');


exports.critical = function critical(result, message) {
    if (result.code !== 0) {
        message && echo(message.red);
        process.exit(-1);
    }

    return result;
}

exports.isValidDCommitSource = function isValidDCommitSource(branchName) {
    return branchName === 'master' || branchName[0] === '@';
}