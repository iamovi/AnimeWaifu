#!/usr/bin/env node
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const shell = require('shelljs');
const cliProgress = require('cli-progress');

// Customizable Colors
const colors = {
    Title: '\x1b[36m', // Cyan
    Option: '\x1b[33m', // Yellow
    Prompt: '\x1b[32m', // Green
    Success: '\x1b[32m', // Green
    Error: '\x1b[31m', // Red
    Info: '\x1b[90m', // Gray
    Default: '\x1b[37m' // White
};

function colorText(text, color) {
    return `${color}${text}\x1b[0m`;
}

function testAdmin() {
    return shell.exec('net session', { silent: true }).code === 0;
}

if (!testAdmin()) {
    console.log(colorText('\nPlease run this script as an administrator.\n', colors.Error));
    process.exit(1);
}

console.log(colorText('\nHi, Welcome to the AnimeWaifu App Installer!\n', colors.Title));

const choices = [
    { name: 'AnimeWaifu', value: 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifuSetup.exe' },
    { name: 'AnimeWaifu Basic', value: 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Basic_Setup.exe' },
    { name: 'AnimeWaifu Lite', value: 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Lite_Setup.exe' },
    { name: 'AW. QuickChat', value: 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/QuickChatSetup.exe' },
    { name: 'AnimeWaifu Cloud', value: 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Cloud_Setup.exe' },
    { name: 'Cancel', value: 'cancel' },
    { name: 'Visit Direct Download Site', value: 'visit' }
];

let downloadPath = ''; // Variable to store the download path

// Function to clean up the downloaded file
function cleanup() {
    if (downloadPath && fs.existsSync(downloadPath)) {
        console.log(colorText('\nCleaning up the downloaded installer...\n', colors.Info));
        fs.unlinkSync(downloadPath);
    }
}

// Handle termination signals
process.on('SIGINT', () => {
    console.log(colorText('\nScript terminated by user.\n', colors.Error));
    cleanup();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log(colorText('\nScript terminated.\n', colors.Error));
    cleanup();
    process.exit(0);
});

async function main() {
    const { app } = await inquirer.prompt([
        {
            type: 'list',
            name: 'app',
            message: colorText('Select the version of AnimeWaifu App to install:', colors.Title),
            choices: choices
        }
    ]);

    if (app === 'cancel') {
        console.log(colorText('Installation canceled by user.\n', colors.Info));
        process.exit(0);
    } else if (app === 'visit') {
        console.log(colorText('Opening the direct download site in browser...\n', colors.Info));
        shell.exec('start https://iamovi.github.io/AnimeWaifu/install/');
        process.exit(0);
    } else {
        const downloadUrl = app;
        downloadPath = path.join(process.env.USERPROFILE, 'Downloads', 'Install.exe');

        const { confirm } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: colorText(`Do you want to proceed with the download from ${downloadUrl}?`, colors.Prompt),
                default: true
            }
        ]);

        if (confirm) {
            console.log(colorText(`Downloading from ${downloadUrl}...\n`, colors.Info));

            try {
                const response = await axios({
                    url: downloadUrl,
                    method: 'GET',
                    responseType: 'stream'
                });

                const totalBytes = parseInt(response.headers['content-length'], 10);
                let downloadedBytes = 0;
                let startTime = Date.now();

                // Initialize the progress bar with a custom formatter
                const progressBar = new cliProgress.SingleBar({
                    format: 'Downloading: {bar} {percentage}% | {value}/{total} bytes | Speed: {speed} KB/s',
                    barCompleteChar: '\u2588',
                    barIncompleteChar: '\u2591',
                    hideCursor: true
                });

                progressBar.start(totalBytes, 0);

                const writer = fs.createWriteStream(downloadPath);
                response.data.on('data', (chunk) => {
                    downloadedBytes += chunk.length;

                    // Calculate download speed
                    const elapsedTime = (Date.now() - startTime) / 1000; // in seconds
                    const speed = (downloadedBytes / elapsedTime / 1024).toFixed(2); // in KB/s

                    // Update the progress bar
                    progressBar.update(downloadedBytes, { speed });
                });

                response.data.pipe(writer);

                await new Promise((resolve, reject) => {
                    writer.on('finish', resolve);
                    writer.on('error', reject);
                });

                progressBar.stop();
                console.log('\n'); // Move to the next line after download completes
                console.log(colorText('Executing the installer...\n', colors.Info));
                shell.exec(`"${downloadPath}"`, (code, stdout, stderr) => {
                    if (code === 0) {
                        console.log(colorText('Installation completed successfully!\n', colors.Success));
                    } else {
                        console.log(colorText(`Installation was canceled or failed. Exit code: ${code}\n`, colors.Error));
                    }
                    cleanup();
                });
            } catch (error) {
                console.log(colorText(`An error occurred: ${error.message}\n`, colors.Error));
                cleanup();
            }
        } else {
            console.log(colorText('Download canceled by user.\n', colors.Info));
            process.exit(0);
        }
    }
}

main();