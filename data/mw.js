// Set to store previously seen meme URLs
const seenWaifuImages = new Set();

// Event listener for generating a meme when the button is clicked
document.getElementById('generate-meme-btn-mw').addEventListener('click', function() {
    fetchWaifuImage();
});

function fetchWaifuImage() {
    const generateButton = document.getElementById('generate-meme-btn-mw');
    const preloader = document.getElementById('preloader-unique-mw');
    const memeImg = document.getElementById('meme-img-unique-mw');

    // Disable the button and show loading text
    generateButton.disabled = true;
    generateButton.innerHTML = 'Loading...';

    // Show preloader before starting the fetch
    preloader.style.display = 'block'; // Show preloader GIF
    memeImg.style.display = 'none'; 

    // Fetch image from the waifu API
    fetch('https://api.waifu.pics/nsfw/blowjob')
        .then(response => response.json())
        .then(data => {
            const waifuImageUrl = data.url; // Get the waifu image URL

            // Check if the image URL has already been shown
            if (seenWaifuImages.has(waifuImageUrl)) {
                console.log('Duplicate image detected. Fetching a new image...');
                fetchWaifuImage(); // Retry fetching another image
            } else {
                // Add the image URL to the set and display it
                seenWaifuImages.add(waifuImageUrl);
                memeImg.src = waifuImageUrl;
                memeImg.onload = function() {
                    // Hide preloader and show the image when it's loaded
                    preloader.style.display = 'none';
                    memeImg.style.display = 'block';

                    // Countdown in the button after the image is loaded
                    countdownToEnableButton(generateButton, 'Get Pic');
                };
            }
        })
        .catch(error => {
            console.error('Error fetching image:', error);
            preloader.style.display = 'none';
            generateButton.disabled = false;
            generateButton.innerHTML = 'Get Pic <i class="fa-brands fa-space-awesome"></i>';
        });
}

// Countdown function
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
