const exec = require('child_process').exec;

const executeActionString = (action) => {
    return new Promise((resolve, reject) => {
        let actionString = action.method.actionString;
        for (let i = 0; i < action.method.params.length; i++) {
            const param = action.method.params[i].name;
            if (action.params.hasOwnProperty(param)) {
                actionString = actionString.replace(param, action.params[param]);
            } else {
                actionString = actionString.replace(param, '');
            }
        }

        exec(actionString, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            if (stderr) {
                console.log(stderr);
            }
            resolve(stdout);
        });
    });
};

module.exports = {
    GET_PIPELINES : executeActionString,
    GET_DOWNLOAD_LINKS : executeActionString,
    UPLOAD_ARTIFACT : executeActionString
};