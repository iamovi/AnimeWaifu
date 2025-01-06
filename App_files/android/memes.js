// Set to store previously seen meme URLs
const seenMemes = new Set();

// Event listener for generating a meme when the button is clicked
document.getElementById('generate-meme-btn').addEventListener('click', function() {
    fetchMeme();
});

function fetchMeme() {
    const generateButton = document.getElementById('generate-meme-btn');
    const preloader = document.getElementById('preloader-unique');
    const memeImg = document.getElementById('meme-img-unique');

    // Disable the button and show loading text
    generateButton.disabled = true;
    generateButton.innerHTML = 'Loading...';

    // Show preloader before starting the fetch
    preloader.style.display = 'block'; // Show preloader GIF
    memeImg.style.display = 'none'; 

    // Fetch memes from a variety of popular subreddits for more variety
    fetch('https://meme-api.com/gimme')
        .then(response => response.json())
        .then(data => {
            const memeUrl = data.url; // Get the meme image URL

            // Check if the meme URL has already been shown
            if (seenMemes.has(memeUrl)) {
                console.log('Duplicate meme detected. Fetching a new meme...');
                fetchMeme(); // Retry fetching another meme
            } else {
                // Add the meme URL to the set and display it
                seenMemes.add(memeUrl);
                memeImg.src = memeUrl;
                memeImg.onload = function() {
                    // Hide preloader and show the image when it's loaded
                    preloader.style.display = 'none';
                    memeImg.style.display = 'block';

                    // Countdown in the button after the meme is loaded
                    countdownToEnableButton(generateButton, 'Get Meme');
                };
            }
        })
        .catch(error => {
            console.error('Error fetching meme:', error);
            preloader.style.display = 'none';
            generateButton.disabled = false;
            generateButton.innerHTML = 'Get Meme <i class="fa-brands fa-space-awesome"></i>';
        });
}

// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('change', function() {
    const modalContent = document.querySelector('.memes-modal-dark');
    const preloader = document.getElementById('preloader-unique');
    const memePreloaderGif = preloader.querySelector('img');

    if (this.checked) {
        modalContent.classList.add('dark-mode');
        memePreloaderGif.src = 'assets/meme-preloader-black.gif'; 
    } else {
        modalContent.classList.remove('dark-mode');
        memePreloaderGif.src = 'assets/meme-preloader.gif';
    }
});

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
