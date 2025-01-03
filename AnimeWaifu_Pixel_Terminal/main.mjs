#!/usr/bin/env node

// Import the required libraries
import axios from 'axios';
import terminalImage from 'terminal-image';
import path from 'path';
import readline from 'readline';
import fs from 'fs';  // Import the 'fs' module to read files
import { fileURLToPath } from 'url';  // Import fileURLToPath for working with __dirname in ES module

// API URL to fetch a random waifu image from Anime Waifu API
const waifuApiUrl = "https://api.waifu.pics/nsfw/waifu";

// Set the desired width for the image display (adjust based on your terminal size)
const imageWidth = 30; // You can modify this value to fit your terminal window

// Get the current directory path using 'import.meta.url'
const __filename = fileURLToPath(import.meta.url);  // Get the full filename path
const __dirname = path.dirname(__filename);  // Get the directory name
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

            // Convert the image buffer to a terminal-friendly format and display it with a set width
            const image = await terminalImage.buffer(Buffer.from(imageResponse.data), { width: imageWidth });
            console.log(image);
        } else {
            console.log("No waifu image found. Please try again.");
        }
    } catch (error) {
        console.error("🚨 Failed to fetch waifu image:", error.message);
    }
}

// Run the fetchAndDisplayWaifu function
fetchAndDisplayWaifu();
