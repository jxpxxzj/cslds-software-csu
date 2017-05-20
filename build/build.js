const cp = require('child_process');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const ora = require('ora');

module.exports = async () => {
    process.stdout.write('\x1Bc');
    try {
        const spinner = ora('building for production...');
        spinner.start();

        await new Promise((resolve, reject) => {
            const child = cp.spawn('node', [
                'build/build.js'
            ], {
                cwd: path.resolve(__dirname, '../frontend')
            });

            child.stdout.on('data', (data) => {
                spinner.stop();
                process.stdout.write(data);
            });

            child.on('error', (data) => {
                reject(data);
            });

            child.on('exit', () => {
                resolve('Build complete.');
            });
        });
        await fs.ensureDir(path.resolve(__dirname, '../backend/public'));
        await fs.ensureDir(path.resolve(__dirname, '../backend/public/files'));
        const exist = await fs.exists(path.resolve(__dirname, '../backend/public/index.html')); // has built before
        if (exist) {
            await fs.remove(path.resolve(__dirname, '../backend/public/static'));
            await fs.remove(path.resolve(__dirname, '../backend/public/index.html'));
        }
        await fs.copy(path.resolve(__dirname, '../backend/resources/404.html'), path.resolve(__dirname, '../backend/public/404.html'));
        await fs.copy(path.resolve(__dirname, '../backend/resources/favicon.ico'), path.resolve(__dirname, '../backend/public/favicon.ico'));
        await fs.copy(path.resolve(__dirname, '../frontend/dist'), path.resolve(__dirname, '../backend/public'));

        console.log(chalk.green('Build complete.'));
    } catch (error) {
        console.log(chalk.bgRed('Build failed.'), chalk.red(error));
    }
};
