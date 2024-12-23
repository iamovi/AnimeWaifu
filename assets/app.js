const swipeContainer = document.getElementById('swipe-container');
const preloader = document.getElementById('preloader');
const swipeText = document.getElementById('swipe-text');
const nsfwToggle = document.getElementById('nsfw-toggle');
const currentImgLinkButton = document.getElementById('current-img-link');
const hammer = new Hammer(swipeContainer);

let isLoading = false;
let hasSwiped = false;
let currentCategory = 'sfw';
let currentImageUrl = ''; // Variable to store the current image URL

hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

function getRandomWaifuImage() {
  if (isLoading) return;

  if (!hasSwiped) {
    swipeText.style.display = 'none';
    hasSwiped = true;
  }

  preloader.style.display = 'block';
  swipeContainer.style.backgroundImage = 'url(./assets/waifu_wait.gif)';
  swipeContainer.classList.add('loading');
  isLoading = true;

  // Introduce a 0.5 second delay before showing the image
  setTimeout(() => {
    const image = new Image();
    
    // Set a temporary fallback image or the loading animation
    image.src = ''; 

    // Preload the image in the background
    image.onload = function () {
      // When the image is fully loaded, set the background image
      swipeContainer.style.backgroundImage = 'url(' + image.src + ')';
      currentImageUrl = image.src; // Save the image URL
      currentImgLinkButton.style.pointerEvents = 'auto'; // Enable the button once the image is loaded
      preloader.style.display = 'none'; // Hide preloader
      swipeContainer.classList.remove('loading'); // Remove loading class
      isLoading = false;
    };

    // Start fetching the image URL
    fetch(`https://api.waifu.pics/${currentCategory}/waifu`)
      .then(response => response.json())
      .then(data => {
        // Set the image source to the fetched URL
        image.src = data.url;
      })
      .catch(err => {
        console.error('Error fetching image:', err);
        preloader.style.display = 'none'; // Hide preloader on error
        swipeContainer.classList.remove('loading');
        isLoading = false;
      });
  }, 500); // Delay for 500ms (0.5 seconds)
}

hammer.on('swipe', function () {
  getRandomWaifuImage();
});

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
    window.open(currentImageUrl, '_blank'); // Open the image in a new tab
  } else {
    // Create a message indicating no image is loaded
    const noImageMessage = document.createElement('div');
    noImageMessage.style.position = 'fixed';
    noImageMessage.style.bottom = '10px';
    noImageMessage.style.left = '50%';
    noImageMessage.style.transform = 'translateX(-50%)';
    noImageMessage.style.backgroundColor = 'black';  // Dark Purple
    noImageMessage.style.color = 'red';  // Light Pink
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


//
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
