document.getElementById('generate-meme-btn').addEventListener('click', fetchMeme);

function fetchMeme() {
    // Show preloader before starting the fetch
    const preloader = document.getElementById('preloader-unique');
    const memeImg = document.getElementById('meme-img-unique');
    preloader.style.display = 'block'; // Show preloader GIF
    memeImg.style.display = 'none'; // Hide the image initially

    fetch('https://meme-api.com/gimme')
        .then(response => response.json())
        .then(data => {
            const memeUrl = data.url; // Get the meme image URL
            memeImg.src = memeUrl;
            memeImg.onload = function() {
                // Hide preloader and show the image when it's loaded
                preloader.style.display = 'none';
                memeImg.style.display = 'block';
            };
        })
        .catch(error => {
            console.error('Error fetching meme:', error);
            preloader.style.display = 'none'; // Hide preloader in case of error
        });
}
// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('change', function() {
    const modalContent = document.querySelector('.custom-modal-content');
    const preloader = document.getElementById('preloader-unique');
    const memePreloaderGif = preloader.querySelector('img');

    if (this.checked) {
        modalContent.classList.add('dark-mode');
        memePreloaderGif.src = 'assets/meme-preloader-black.gif'; // Change preloader image to black version
    } else {
        modalContent.classList.remove('dark-mode');
        memePreloaderGif.src = 'assets/meme-preloader.gif'; // Revert preloader image to default
    }
});
