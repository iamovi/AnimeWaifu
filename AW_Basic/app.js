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

// Timeout modal for extended loading
const loadingTimeoutModal = new bootstrap.Modal(document.getElementById('loadingTimeoutModal'), {
  backdrop: 'static',
  keyboard: false,
});
const refreshButton = document.getElementById('refresh-button'); // Refresh button

// Event listener for refresh button
refreshButton.addEventListener('click', () => {
  window.location.reload(); // Refresh the page
});

// Add event listener for double-click to show modal
document.addEventListener('dblclick', () => {
  jokesModal.show(); // Show the modal on double click
});

// Variables for state management
let isLoading = false;
let hasSwiped = false;
let currentCategory = 'sfw'; // Default category
let loadingTimeout; // To track the loading timeout

// Event listener for toggle switch
toggleNsfw.addEventListener('change', () => {
  currentCategory = toggleNsfw.checked ? 'nsfw' : 'sfw'; // Toggle category based on the switch
  const notificationMessage = toggleNsfw.checked
    ? 'NSFW mode is now ON'
    : 'NSFW mode is now OFF';
  const notificationType = toggleNsfw.checked ? 'success' : 'warning';
  showNotification(notificationMessage, notificationType);
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

// Override console.log to show notifications
const originalConsoleLog = console.log;
console.log = function(message) {
  showNotification(message, 'info2');
  originalConsoleLog.apply(console, arguments);
};

const originalConsoleError = console.error;
console.error = function(message) {
  showNotification(message, 'error');
  originalConsoleError.apply(console, arguments);
};

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

  // Set a loading timeout
  loadingTimeout = setTimeout(() => {
    isLoading = false; // Reset loading state
    loadingText.style.display = 'none'; // Hide loading text
    preloader.style.display = 'none'; // Hide preloader
    loadingTimeoutModal.show(); // Show the timeout modal
  }, 30000); // 30 seconds timeout

  // Set the placeholder images
  const placeholderImages = ['waifu-load.jpg', 'waifu-load-real.jpg', 'waifu-load-manga.jpg'];
  let placeholderIndex = 0;

  // Display the first preloader image immediately
  backgroundImage.src = placeholderImages[placeholderIndex];

  // Function to cycle through the placeholder images
  const togglePlaceholderImage = () => {
    placeholderIndex = (placeholderIndex + 1) % placeholderImages.length;
    backgroundImage.src = placeholderImages[placeholderIndex];
  };

  // Toggle placeholder images every second during loading
  const placeholderInterval = setInterval(togglePlaceholderImage, 1000);

  // Fetch the image
  fetch(`https://api.waifu.pics/${currentCategory}/waifu`) // Fetch image based on currentCategory
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data?.url) {
        const image = new Image();
        image.src = data.url;

        image.onload = () => {
          clearInterval(placeholderInterval); // Stop toggling placeholder images
          clearTimeout(loadingTimeout); // Clear the loading timeout
          backgroundImage.src = data.url; // Update background image
          preloader.style.display = 'none'; // Hide preloader
          loadingText.style.display = 'none'; // Hide loading text
          isLoading = false; // Reset loading state
          console.log('Waifu Appears 🌸');
        };

        image.onerror = () => {
          console.error('Error loading the Waifu.');
          clearInterval(placeholderInterval); // Stop toggling placeholder images
          clearTimeout(loadingTimeout); // Clear the loading timeout
          preloader.style.display = 'none'; // Hide preloader
          loadingText.style.display = 'none'; // Hide loading text
          isLoading = false; // Reset loading state
        };
      } else {
        throw new Error('No Waifu URL returned from the API.');
      }
    })
    .catch((err) => {
      console.error(`Error fetching image: ${err.message} | Swipe Again.`);
      clearInterval(placeholderInterval); // Stop toggling placeholder images
      clearTimeout(loadingTimeout); // Clear the loading timeout
      preloader.style.display = 'none'; // Hide preloader
      loadingText.style.display = 'none'; // Hide loading text
      isLoading = false; // Reset loading state
    });
}

// Add swipe event listener
hammer.on('swipe', getRandomWaifuImage);
