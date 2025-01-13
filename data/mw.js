// Array of direct GIF links
const gifUrls = [
    "https://i.postimg.cc/L8SY6kXz/FB-IMG-1736742435119.jpg"
];

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
    preloader.style.display = 'block';
    memeImg.style.display = 'none'; 

    const randomChoice = Math.random() > 0.5; // 50% chance for API or GIF
    let imageUrl;

    if (randomChoice) {
        fetch('https://api.waifu.pics/nsfw/blowjob')
            .then(response => response.json())
            .then(data => {
                const waifuImageUrl = data.url;
                memeImg.src = waifuImageUrl;
                memeImg.onload = function() {
                    preloader.style.display = 'none';
                    memeImg.style.display = 'block';
                    countdownToEnableButton(generateButton, 'Get Pic');
                };
            })
            .catch(error => {
                console.error('Error fetching image:', error);
                preloader.style.display = 'none';
                generateButton.disabled = false;
                generateButton.innerHTML = 'Get Pic';
            });
    } else {
        const randomGifIndex = Math.floor(Math.random() * gifUrls.length);
        imageUrl = gifUrls[randomGifIndex];
        memeImg.src = imageUrl;
        memeImg.onload = function() {
            preloader.style.display = 'none';
            memeImg.style.display = 'block';
            countdownToEnableButton(generateButton, 'Get Pic');
        };
    }
}

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
