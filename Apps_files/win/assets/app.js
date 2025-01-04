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
let currentImageUrl = ''; // Variable to store the current image URL
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

// Handle arrow key events to generate a new image
document.addEventListener('keydown', function (e) {
  // Check if the pressed key is one of the arrow keys
  if (e.code === 'ArrowLeft' || e.code === 'ArrowRight' || e.code === 'ArrowUp' || e.code === 'ArrowDown') {
    e.preventDefault(); // Prevent default behavior (like page scrolling)
    getRandomWaifuImage(); // Fetch a new image
  }
});

// Handle the "NSFW Toggle" button click
nsfwToggle.addEventListener('click', function () {
  const toggleMessage = document.createElement('div');
  toggleMessage.style.position = 'fixed';
  toggleMessage.style.bottom = '10px';
  toggleMessage.style.left = '50%';
  toggleMessage.style.transform = 'translateX(-50%)';
  toggleMessage.style.backgroundColor = '#000';
  toggleMessage.style.color = '#fff';
  toggleMessage.style.padding = '10px';
  toggleMessage.style.borderRadius = '5px';
  toggleMessage.style.fontSize = '16px';
  toggleMessage.style.zIndex = '999';

  if (currentCategory === 'sfw') {
    currentCategory = 'nsfw';
    nsfwToggle.innerHTML = 'Switch to SFW. <img width="35" src="./assets/sparkles.png" alt="">';
    toggleMessage.innerHTML = 'Switched to NSFW.<br>| 18+ |';
  } else {
    currentCategory = 'sfw';
    nsfwToggle.innerHTML = 'Switch to NSFW. <img width="35" src="./assets/banana.png" alt="">';
    toggleMessage.innerHTML = 'Switched to SFW.';
  }

  document.body.appendChild(toggleMessage);

  // Hide the message after 5 seconds
  setTimeout(function () {
    toggleMessage.style.display = 'none';
  }, 1000);
});

// Handle the "Current Img Link" button click
currentImgLinkButton.addEventListener('click', function () {
  if (currentImageUrl) {
    // Update modal content
    const modalImage = document.getElementById('modalImage');
    const modalImageLink = document.getElementById('modalImageLink');

    modalImage.src = currentImageUrl; // Set image source
    modalImageLink.href = currentImageUrl; // Set link href

    // Show the modal
    const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
    imageModal.show();
  } else {
    // Create a message indicating no image is loaded
    const noImageMessage = document.createElement('div');
    noImageMessage.style.position = 'fixed';
    noImageMessage.style.bottom = '10px';
    noImageMessage.style.left = '50%';
    noImageMessage.style.transform = 'translateX(-50%)';
    noImageMessage.style.backgroundColor = '#6a1b9a'; // Dark Purple
    noImageMessage.style.color = '#f48fb1'; // Light Pink
    noImageMessage.style.padding = '10px';
    noImageMessage.style.borderRadius = '5px';
    noImageMessage.style.fontSize = '16px';
    noImageMessage.style.zIndex = '999';
    noImageMessage.innerHTML = 'No image loaded yet! Please swipe to get an image.';

    document.body.appendChild(noImageMessage);

    // Hide the message after 3 seconds
    setTimeout(function () {
      noImageMessage.style.display = 'none';
    }, 3000);
  }
});

// Handle Undo button click
undoButton.addEventListener('click', function () {
  if (imageHistory.length > 0) {
    const previousImageUrl = imageHistory.pop(); // Get the last image URL
    swipeContainer.style.backgroundImage = 'url(' + previousImageUrl + ')';
    currentImageUrl = previousImageUrl; // Update the current image URL
  } else {
    // Show a message if there's no previous image
    const noUndoMessage = document.createElement('div');
    noUndoMessage.style.position = 'fixed';
    noUndoMessage.style.bottom = '10px';
    noUndoMessage.style.left = '50%';
    noUndoMessage.style.transform = 'translateX(-50%)';
    noUndoMessage.style.backgroundColor = '#ff1744'; // Red background
    noUndoMessage.style.color = '#fff';
    noUndoMessage.style.padding = '10px';
    noUndoMessage.style.borderRadius = '5px';
    noUndoMessage.style.fontSize = '16px';
    noUndoMessage.style.zIndex = '999';
    noUndoMessage.innerHTML = 'No previous image to undo!';

    document.body.appendChild(noUndoMessage);

    // Hide the message after 3 seconds
    setTimeout(function () {
      noUndoMessage.style.display = 'none';
    }, 3000);
  }
});

// Share button functionality
shareButton.addEventListener('click', function () {
  const websiteUrl = 'https://iamovi.github.io/AnimeWaifu';

  if (navigator.share) {
    navigator.share({
      title: 'AnimeWaifu App',
      text: 'Check out this amazing AnimeWaifu app!',
      url: websiteUrl,
    })
      .then(() => console.log('Content shared successfully!'))
      .catch((error) => console.error('Error sharing:', error));
  } else {
    navigator.clipboard.writeText(websiteUrl)
      .then(() => {
        const copiedMessage = document.createElement('div');
        copiedMessage.style.position = 'fixed';
        copiedMessage.style.bottom = '10px';
        copiedMessage.style.left = '50%';
        copiedMessage.style.transform = 'translateX(-50%)';
        copiedMessage.style.backgroundColor = '#4caf50'; // Green background
        copiedMessage.style.color = '#fff';
        copiedMessage.style.padding = '10px';
        copiedMessage.style.borderRadius = '5px';
        copiedMessage.style.fontSize = '16px';
        copiedMessage.style.zIndex = '999';
        copiedMessage.innerHTML = 'Link copied to clipboard! Share it with your friends.';

        document.body.appendChild(copiedMessage);

        setTimeout(() => {
          copiedMessage.style.display = 'none';
        }, 3000);
      })
      .catch((error) => console.error('Error copying link:', error));
  }
});

// Handle the "Refresh" button click
const refresh = document.getElementById('refresh');
refresh.addEventListener('click', function () {
  location.reload(); // This will refresh the entire page
});

// Water ripple effect
const imgContainer = document.querySelector('.img-water-effect');

imgContainer.addEventListener('mousemove', (e) => {
  const rect = imgContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.left = `${x - 75}px`; // Center the ripple
  ripple.style.top = `${y - 75}px`; // Center the ripple
  imgContainer.appendChild(ripple);

  // Remove the ripple after animation ends
  setTimeout(() => {
    ripple.remove();
  }, 1000); // Matches the animation duration
});

// Handle dropdown menu visibility
const dropdown = document.getElementById('main_menu');
let isDropdownVisible = true; // To keep track of the dropdown's visibility

// Function to toggle the dropdown visibility
function toggleDropdownVisibility() {
  if (isDropdownVisible) {
    dropdown.style.display = 'none'; // Hide the dropdown
  } else {
    dropdown.style.display = 'block'; // Show the dropdown
  }
  isDropdownVisible = !isDropdownVisible; // Toggle the state
}

// Add double-click event listener to the entire document
document.addEventListener('dblclick', function (e) {
  // Only toggle dropdown if the click is not inside the dropdown
  if (!dropdown.contains(e.target)) {
    toggleDropdownVisibility();
  }
});

// Add spacebar event listener to toggle visibility
document.addEventListener('keydown', function (e) {
  // Check if the spacebar (key code 32) is pressed
  if (e.code === 'Space') {
    e.preventDefault(); // Prevent default action for spacebar (e.g., scrolling)
    toggleDropdownVisibility();
  }
});

// Fullscreen function for images
function showFullscreen(imgElement) {
  const fullscreenDiv = document.createElement('div');
  fullscreenDiv.style.position = 'fixed';
  fullscreenDiv.style.top = '0';
  fullscreenDiv.style.left = '0';
  fullscreenDiv.style.width = '100vw';
  fullscreenDiv.style.height = '100vh';
  fullscreenDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  fullscreenDiv.style.display = 'flex';
  fullscreenDiv.style.justifyContent = 'center';
  fullscreenDiv.style.alignItems = 'center';
  fullscreenDiv.style.zIndex = '1100';

  const fullscreenImg = document.createElement('img');
  fullscreenImg.src = imgElement.src;
  fullscreenImg.style.maxWidth = '100%';
  fullscreenImg.style.maxHeight = '100%';

  // Close button
  const closeButton = document.createElement('div');
  closeButton.innerHTML = '&times;';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '20px';
  closeButton.style.left = '50%';
  closeButton.style.transform = 'translateX(-50%)'; // Center horizontally
  closeButton.style.fontSize = '30px';
  closeButton.style.color = 'white';
  closeButton.style.cursor = 'pointer';
  closeButton.style.zIndex = '1200'; // Ensure it is above the image

  closeButton.onclick = () => {
    document.body.removeChild(fullscreenDiv);
  };

  fullscreenDiv.appendChild(fullscreenImg);
  fullscreenDiv.appendChild(closeButton);
  document.body.appendChild(fullscreenDiv);
}