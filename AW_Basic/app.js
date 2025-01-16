const swipeContainer = document.getElementById('swipe-container');
const preloader = document.getElementById('preloader');
const swipeText = document.getElementById('swipe-text');
const nsfwToggle = document.getElementById('nsfw-toggle');
const currentImgLinkButton = document.getElementById('current-img-link');
const undoButton = document.getElementById('undo-button');
const shareButton = document.getElementById('share-me');
const hammer = new Hammer(swipeContainer);

let isLoading = false;
let hasSwiped = false;
let currentCategory = 'sfw';
let imageHistory = []; // Stack to keep track of image history
let retryCount = 0; // Track the number of retries

hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

function getRandomWaifuImage() {
  if (isLoading) return;

  if (!hasSwiped) {
  swipeText.style.display = 'none';
  const videoContainer = document.getElementById('video-container');
  videoContainer.style.display = 'none';
  hasSwiped = true;
}

  preloader.style.display = 'block';
  swipeContainer.style.backgroundImage = 'url(./assets/waifu_wait.gif)';
  swipeContainer.classList.add('loading');
  isLoading = true;

  const fetchImage = () => {
    // Introduce a 0.5 second delay before showing the image
    setTimeout(() => {
      const image = new Image();

      image.onload = function () {
        // Push the current image URL to history before updating
        if (currentImageUrl) {
          imageHistory.push(currentImageUrl);
        }

        swipeContainer.style.backgroundImage = 'url(' + image.src + ')';
        currentImageUrl = image.src; // Save the new image URL
        currentImgLinkButton.style.pointerEvents = 'auto'; // Enable the button
        preloader.style.display = 'none'; // Hide preloader
        swipeContainer.classList.remove('loading'); // Remove loading class
        isLoading = false;
        retryCount = 0; // Reset retry count on success
      };

      fetch(`https://api.waifu.pics/${currentCategory}/waifu`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data && data.url) {
            image.src = data.url;
          } else {
            throw new Error('No image URL returned from API');
          }
        })
        .catch(err => {
          console.error('Error fetching image:', err);
          // Retry the image fetching up to 3 times
          if (retryCount < 3) {
            retryCount++;
            console.log(`Retrying... (${retryCount})`);
            fetchImage(); // Retry fetching the image
          } else {
            // If after 3 retries it still fails, show error
            preloader.style.display = 'none';
            swipeContainer.classList.remove('loading');
            isLoading = false;
            const errorMessage = document.createElement('div');
            errorMessage.style.position = 'fixed';
            errorMessage.style.bottom = '10px';
            errorMessage.style.left = '50%';
            errorMessage.style.transform = 'translateX(-50%)';
            errorMessage.style.backgroundColor = '#ff1744'; // Red background
            errorMessage.style.color = '#fff';
            errorMessage.style.padding = '10px';
            errorMessage.style.borderRadius = '5px';
            errorMessage.style.fontSize = '16px';
            errorMessage.style.zIndex = '999';
            errorMessage.innerHTML = 'Failed to load image after multiple attempts. Please try again later.';
            document.body.appendChild(errorMessage);
            setTimeout(() => {
              errorMessage.style.display = 'none';
            }, 3000);
          }
        });
    }, 500); // Delay for 500ms (0.5 seconds)
  };

  fetchImage(); // Initial image fetch
}

hammer.on('swipe', function () {
  getRandomWaifuImage();
});
