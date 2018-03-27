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


function main(argv) {
    if (argv.length < 3) {
        console.log("not enough parameters");
        // Invalid Argument
        // Either an unknown option was specified, or an option requiring a value was provided without a value.
        process.exit(9);
    }
    let action = JSON.parse(argv[2]);
    executeActionString(action).then((res) => {
        console.log(res);
        process.exit(0); // Success
    }).catch((err) => {
        console.log('an error occurred', err);
        // Uncaught Fatal Exception
        // There was an uncaught exception, and it was not handled by a domain or an 'uncaughtException' event handler.
        process.exit(1); // Failure
    });
}

main(process.argv);