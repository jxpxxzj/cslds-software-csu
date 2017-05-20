const cp = require('child_process');
const path = require('path');

module.exports = async () => {
    await new Promise((resolve, reject) => {
        const child = cp.spawn('node', [
            'app.js'
        ], {
            cwd: path.resolve(__dirname, '../backend')
        });

        child.stdout.on('data', (data) => {
            process.stdout.write(data);
        });

        child.on('error', (data) => {
            reject(data);
        });

        child.on('exit', () => {
            resolve('Server exit.');
        });
    });
};
