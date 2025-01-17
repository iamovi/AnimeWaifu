// Reference elements
const swipeContainer = document.getElementById('swipe-container');
const preloader = document.getElementById('preloader');
const swipeText = document.getElementById('swipe-text');
const backgroundImage = document.getElementById('background-image');
const toggleNsfw = document.getElementById('toggle-nsfw'); // Toggle switch
const loadingText = document.getElementById('loading-text'); // Loading text
const notificationContainer = document.getElementById('notification-container'); // Notification container

// Initialize Hammer.js for swipe gestures
const hammer = new Hammer(swipeContainer);

// Get a reference to the modal
const jokesModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
  backdrop: 'static',
  keyboard: false,
});

// Add event listener for double-click to show modal
document.addEventListener('dblclick', () => {
  jokesModal.show(); // Show the modal on double click
});

// Variables for state management
let isLoading = false;
let hasSwiped = false;
let currentCategory = 'sfw'; // Default category
let retryCount = 0;
let fetchSessionId = 0; // A counter to track the active fetch session

// Event listener for toggle switch
toggleNsfw.addEventListener('change', () => {
  if (toggleNsfw.checked) {
    currentCategory = 'nsfw'; // Set category to NSFW
    showNotification('NSFW mode is now ON', 'success');
  } else {
    currentCategory = 'sfw'; // Set category to SFW
    showNotification('NSFW mode is now OFF', 'warning');
  }
  fetchSessionId++; // Increment session ID to invalidate ongoing fetches
});

// Function to show notifications
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.classList.add('notification', type); // Add classes based on the type
  notification.innerText = message;

  notificationContainer.appendChild(notification);

  // Automatically hide the notification after 3 seconds
  setTimeout(() => {
    notificationContainer.removeChild(notification);
  }, 3000); // Notification disappears after 3 seconds
}

// Configure Hammer.js to detect swipes in all directions
hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

// Function to fetch a random waifu image
function getRandomWaifuImage() {
  if (isLoading) return; // Prevent multiple requests during loading

  if (!hasSwiped) {
    swipeText.style.display = 'none'; // Hide swipe instruction on first swipe
    hasSwiped = true;
  }

  preloader.style.display = 'block'; // Show preloader
  isLoading = true; // Set loading state
  loadingText.style.display = 'block'; // Show loading text

  const currentSession = fetchSessionId; // Store the current session ID

  // Variables for toggling loading images
  let toggleIndex = 0; // Index to track the current placeholder image
  const placeholderImages = ['waifu-load.jpg', 'waifu-load-real.jpg', 'waifu-load-manga.jpg']; // Array of placeholder images

  // Function to toggle placeholder images immediately
  const togglePlaceholderImages = () => {
    backgroundImage.src = placeholderImages[toggleIndex]; // Set the current placeholder image
    toggleIndex = (toggleIndex + 1) % placeholderImages.length; // Cycle through the images
  };

  // Start by toggling immediately, then every 1 second
  togglePlaceholderImages(); // Immediate toggle
  const toggleInterval = setInterval(togglePlaceholderImages, 1000);

  // Timeout to stop loading if stuck
  const loadingTimeout = setTimeout(() => {
    if (currentSession === fetchSessionId) {
      preloader.style.display = 'none';
      loadingText.style.display = 'none';
      isLoading = false;
      clearInterval(toggleInterval); // Stop toggling
      console.error('Loading timed out.');
    }
  }, 10000); // 10-second timeout

  const fetchImage = () => {
    setTimeout(() => {
      fetch(`https://api.waifu.pics/${currentCategory}/waifu`) // Fetch image based on currentCategory
        .then((response) => response.json())
        .then((data) => {
          if (currentSession !== fetchSessionId) {
            // Ignore response if session ID has changed
            clearInterval(toggleInterval);
            clearTimeout(loadingTimeout);
            return;
          }

          if (data?.url) {
            const newImage = new Image(); // Create a temporary image
            newImage.src = data.url;

            // Wait until the image is fully loaded
            newImage.onload = () => {
              clearInterval(toggleInterval); // Stop toggling images
              clearTimeout(loadingTimeout); // Clear timeout
              backgroundImage.src = data.url; // Update the background image
              preloader.style.display = 'none'; // Hide preloader
              loadingText.style.display = 'none'; // Hide loading text
              isLoading = false; // Reset loading state
              retryCount = 0; // Reset retry count
            };

            // Handle image load error
            newImage.onerror = () => {
              throw new Error('Error loading the new image');
            };
          } else {
            throw new Error('No image URL returned from API');
          }
        })
        .catch((err) => {
          console.error('Error fetching image:', err);
          if (currentSession !== fetchSessionId) {
            clearInterval(toggleInterval);
            clearTimeout(loadingTimeout);
            return; // Ignore response if session ID has changed
          }

          if (retryCount < 3) {
            retryCount++;
            fetchImage(); // Retry fetching up to 3 times
          } else {
            clearInterval(toggleInterval); // Stop toggling images after retries
            clearTimeout(loadingTimeout); // Clear timeout
            preloader.style.display = 'none'; // Hide preloader after max retries
            loadingText.style.display = 'none'; // Hide loading text
            isLoading = false; // Reset loading state
          }
        });
    }, 500); // Simulate slight delay for fetching
  };

  fetchImage();
}

// Add swipe event listener
hammer.on('swipe', getRandomWaifuImage);
