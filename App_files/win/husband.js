// Set to store previously seen husband meme URLs
const seenHusbands = new Set();

// Event listener for generating a husband image when the button is clicked
document.getElementById('generate-meme-btn-husband').addEventListener('click', function() {
    fetchHusbandImage();
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

    // Fetch a random anime character from Jikan API
    fetch('https://api.jikan.moe/v4/random/anime')
        .then(response => response.json())
        .then(data => {
            const anime = data.data;
            // Check if the character is male based on the anime's general character gender (if available)
            // For simplicity, you can manually choose certain anime with male characters
            // Here, we are directly picking the character image from the anime
            const husbandUrl = anime.images.jpg.image_url; // Get the character's image URL (this can be male or female)

            // Check if the meme URL has already been shown
            if (seenHusbands.has(husbandUrl)) {
                console.log('Duplicate husband detected. Fetching a new husband...');
                fetchHusbandImage(); // Retry fetching another image
            } else {
                // Add the husband URL to the set and display it
                seenHusbands.add(husbandUrl);
                memeImg.src = husbandUrl;
                memeImg.onload = function() {
                    // Hide preloader and show the image when it's loaded
                    preloader.style.display = 'none';
                    memeImg.style.display = 'block';

                    // Countdown in the button after the meme is loaded
                    countdownToEnableButton(generateButton, 'Get Husband');
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