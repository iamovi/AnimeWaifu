// Set to store previously seen husband meme URLs
const seenHusbands = new Set();

// Event listener for generating a husband image when the button is clicked
document.getElementById('generate-meme-btn-husband').addEventListener('click', function() {
    fetchHusbandImage();
});

// Reset modal when it is hidden
const husbandModal = document.getElementById('staticBackdropHusband');
husbandModal.addEventListener('hidden.bs.modal', function () {
    resetModal();
});

function fetchHusbandImage() {
    const generateButton = document.getElementById('generate-meme-btn-husband');
    const preloader = document.getElementById('preloader-unique-husband');
    const memeImg = document.getElementById('meme-img-unique-husband');

    // Disable the button and show loading text
    generateButton.disabled = true;
    generateButton.innerHTML = 'Loading...';

    // Show preloader before starting the fetch
    preloader.style.display = 'block'; // Show preloader GIF
    memeImg.style.display = 'none'; 

    // Add a cache-busting query parameter to avoid caching the JSON file
    const url = 'https://iamovi.github.io/AnimeWaifu/data/husband.json' + '?_=' + new Date().getTime();

    // Fetch the husband JSON file containing the image URLs
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const husbandLinks = data.links;
            const randomIndex = Math.floor(Math.random() * husbandLinks.length);
            const husbandUrl = husbandLinks[randomIndex];

            // Check if the meme URL has already been shown
            if (seenHusbands.has(husbandUrl)) {
                console.log('Duplicate husband detected. Fetching a new husband...');
                fetchHusbandImage(); // Retry fetching another image
            } else {
                // Add the husband URL to the set and display it
                seenHusbands.add(husbandUrl);
                memeImg.src = husbandUrl;
                memeImg.onload = function() {
                    // Delay showing the image for 1 second
                    setTimeout(() => {
                        // Hide preloader and show the image after the delay
                        preloader.style.display = 'none';
                        memeImg.style.display = 'block';

                        // Countdown in the button after the meme is loaded
                        countdownToEnableButton(generateButton, 'Get Husband');
                    }, 1000); // 1 second delay
                };
            }
        })
        .catch(error => {
            console.error('Error fetching husband image:', error);
            preloader.style.display = 'none';
            generateButton.disabled = false;
            generateButton.innerHTML = 'Get Husband <i class="fa-brands fa-space-awesome"></i>';
        });
}

// Countdown function for enabling the button
function countdownToEnableButton(button, defaultText) {
    let countdown = 3;
    const countdownInterval = setInterval(() => {
        button.innerHTML = `Try again in ${countdown}s`;
        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval);
            button.innerHTML = `${defaultText} <i class="fa-brands fa-space-awesome"></i>`;
            button.disabled = false;
        }
    }, 1000);
}

// Function to reset the modal content
function resetModal() {
    const generateButton = document.getElementById('generate-meme-btn-husband');
    const preloader = document.getElementById('preloader-unique-husband');
    const memeImg = document.getElementById('meme-img-unique-husband');

    // Reset the button state
    generateButton.disabled = false;
    generateButton.innerHTML = 'Get Husband <i class="fa-brands fa-space-awesome"></i>';

    // Hide the image and preloader
    memeImg.style.display = 'none';
    preloader.style.display = 'none';
}
