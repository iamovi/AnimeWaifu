const swipeContainer = document.getElementById('swipe-container');
const preloader = document.getElementById('preloader');
const swipeText = document.getElementById('swipe-text');
const nsfwToggle = document.getElementById('nsfw-toggle');
const hammer = new Hammer(swipeContainer);

let isLoading = false;
let hasSwiped = false;
let currentCategory = 'sfw';

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

  const image = new Image();
  image.src = '';

  image.onload = function () {
    swipeContainer.style.backgroundImage = 'url(' + image.src + ')';
    preloader.style.display = 'none';
    swipeContainer.classList.remove('loading');
    isLoading = false;
  };

  fetch(`https://api.waifu.pics/${currentCategory}/waifu`)
    .then(response => response.json())
    .then(data => {
      image.src = data.url;
    });
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
    nsfwToggle.innerHTML = 'Switch to SFW <img width="35" src="./assets/wife.png" alt="">';
    toggleMessage.innerHTML = 'Switched to NSFW<br>| 18+ |';
  } else {
    currentCategory = 'sfw';
    nsfwToggle.innerHTML = 'Switch to NSFW <img width="35" src="./assets/strawberry.png" alt="">';
    toggleMessage.innerHTML = 'Switched to SFW';
  }

  document.body.appendChild(toggleMessage);

  // Hide the message after 5 seconds
  setTimeout(function () {
    toggleMessage.style.display = 'none';
  }, 1000);
});
