#!/usr/bin/env node

import axios from 'axios';
import terminalImage from 'terminal-image';
import path from 'path';
import readline from 'readline';
import fs from 'fs'; // Import the 'fs' module to read files
import { fileURLToPath } from 'url'; // Import fileURLToPath for working with __dirname in ES module
import inquirer from 'inquirer'; // Import inquirer for menu navigation
import open from 'open'; // Import 'open' for opening links in the browser

// Get the current directory path using 'import.meta.url'
const __filename = fileURLToPath(import.meta.url);  // Get the full filename path
const __dirname = path.dirname(__filename);  // Get the directory name

// Read the version from package.json using fs
const packageJsonPath = path.join(__dirname, 'package.json');
const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const version = packageData.version;

// API URL to fetch a random waifu image from Anime Waifu API
const waifuApiUrl = "https://api.waifu.pics/nsfw/waifu";
const funFactsApiUrl = "https://api.jikan.moe/v4/random/anime"; // Jikan API for random anime

const titleFilePath = path.join(__dirname, 'title.json');  // Join with the title.json file

// Function to display a spinner during the loading process
function showSpinner() {
    const spinnerFrames = ['|', '/', '-', '\\'];
    let i = 0;

    const interval = setInterval(() => {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`Loading... ${spinnerFrames[i]}`);
        i = (i + 1) % spinnerFrames.length;
    }, 100);

    return interval;
}

// Function to get a random title from title.json
function getRandomTitle() {
    try {
        const titleData = fs.readFileSync(titleFilePath, 'utf-8');
        const titles = JSON.parse(titleData); // Parse the JSON file
        const randomTitle = titles[Math.floor(Math.random() * titles.length)]; // Randomly select a title
        return randomTitle;
    } catch (error) {
        console.error("🚨 Error reading title.json:", error.message);
        return "Random Waifu";  // Fallback title if there's an error
    }
}

// Function to fetch and display a random waifu image with dynamic title and details
async function fetchAndDisplayWaifu() {
    try {
        // Fetch a random waifu image from the Anime Waifu API
        const response = await axios.get(waifuApiUrl);
        const waifuData = response.data;

        if (waifuData.url) {
            // Get a random title from title.json
            const title = getRandomTitle();

            // Display the waifu image details with the random title
            console.log(`\n🌸 Here’s A Anime Waifu for you! 🌷\n`);
            console.log(`HER: ${title}\n`);

            // Show the spinner during the loading process
            const spinner = showSpinner();

            // Fetch the image data as a buffer
            const imageResponse = await axios.get(waifuData.url, {
                responseType: 'arraybuffer'
            });

            // Stop the spinner once the image is fetched
            clearInterval(spinner);
            readline.cursorTo(process.stdout, 0);

            // Convert the image buffer to a terminal-friendly format (default width)
            const image = await terminalImage.buffer(Buffer.from(imageResponse.data));
            console.log(image);
        } else {
            console.log("No waifu image found. Please try again.");
        }
    } catch (error) {
        console.error("🚨 Failed to fetch waifu image:", error.message);
    }
}

// Function to fetch and display a random anime fun fact using Jikan API
async function fetchAndDisplayFunFact() {
    try {
        const response = await axios.get(funFactsApiUrl);
        const animeData = response.data.data;

        if (animeData) {
            // Display a random anime info (can be treated as a fun fact)
            console.log(`\n🎉 Anime Fun Fact: 🎉\n`);
            console.log(`Title: ${animeData.title}`);
            console.log(`Synopsis: ${animeData.synopsis}`);
            console.log(`Episodes: ${animeData.episodes}`);
        } else {
            console.log("No fun fact available. Please try again.");
        }
    } catch (error) {
        console.error("🚨 Failed to fetch anime fun fact:", error.message);
    }
}

// Function to check for updates from npm registry
async function getLatestVersionFromNpm() {
    try {
        const packageName = 'animewaifu_pixel_terminal';  // Replace with your actual package name
        const response = await axios.get(`https://registry.npmjs.org/${packageName}`);
        
        // The latest version is stored under `dist-tags.latest`
        return response.data['dist-tags'].latest;
    } catch (error) {
        console.error("🚨 Error fetching latest version from npm:", error.message);
        return null; // If the request fails, return null
    }
}

// Function to check for updates by comparing local version with npm version
async function checkForUpdates() {
    try {
        console.log("\nChecking for updates...");

        // Fetch the latest version from npm
        const latestVersion = await getLatestVersionFromNpm();

        if (latestVersion) {
            if (latestVersion === version) {
                console.log("You are using the latest version.");
            } else {
                console.log(`A new version is available: ${latestVersion}.\n\nUse 'npm update -g animewaifu_pixel_terminal' to update.`);
            }
        } else {
            console.log("Could not fetch the latest version from npm.");
        }
    } catch (error) {
        console.error("🚨 Failed to check for updates:", error.message);
    }
}

// Function to handle the menu options
async function handleMenuSelection(answer) {
    switch (answer.option) {
        case 'Check for Updates':
            await checkForUpdates();
            break;
        case 'Get a Random Waifu':
            await fetchAndDisplayWaifu();
            break;
        case 'Anime Fun Facts':
            await fetchAndDisplayFunFact();
            break;
        case 'View Current Version':
            console.log(`Current Version: ${version}`);
            break;
        case 'Check AnimeWaifu Main Project':
            console.log("Opening AnimeWaifu GitHub project in your browser...");
            await open("https://github.com/iamovi/AnimeWaifu"); // Open the GitHub link in the default browser
            break;
        case 'Clear Console':
            console.clear();
            break;
        case 'Exit':
            console.log("Exiting the program...");
            process.exit();
            break;
        default:
            console.log("Invalid option. Please try again.");
    }

    // Re-display the menu after the action
    showMenu(); // Re-show the menu after the action
}

// Function to show the menu with inquirer (using arrow keys)
function showMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Anime Waifu Menu:',
            choices: [
                'Check for Updates',
                'Get a Random Waifu',
                'Anime Fun Facts',
                'View Current Version',
                'Check AnimeWaifu Main Project',
                'Clear Console',
                'Exit'
            ]
        }
    ]).then(handleMenuSelection);
}

// Get the command-line arguments
const args = process.argv.slice(2); // Get command-line arguments

// If the command is "aw i love you", reply with the love message
if (args.length === 3 && args[0] === 'i' && args[1] === 'love' && args[2] === 'you') {
    console.log("Waifu: Aww, I love you too! ❤️");
} else if (args.length === 0) {
    fetchAndDisplayWaifu();
} else if (args.includes('--menu')) {
    // Show the menu with arrow keys
    showMenu();  // Show the menu that uses arrow keys for navigation
} else if (args.includes('-V') || args.includes('--version')) {
    // Display version if '--version' is passed
    console.log(`Version: ${version}`);
} else if (args.includes('--help') || args.includes('-H')) {
    // Show a help message or an error for no command or invalid commands
    console.log("aw 'AnimeWaifu' Commands:");
    console.log("  --menu     Show the menu.");
    console.log("  -V or --version  Show the version.");
    console.log("  -H or --help       Show help information.");
} else {
    // If the user enters an unknown command
    console.log("🚨 No command like this found. Please try again.");
    console.log("Use 'aw --help' to see the available options.");
}
