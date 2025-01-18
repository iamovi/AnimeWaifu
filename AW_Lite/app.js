const swipeContainer = document.getElementById('swipe-container');
const preloader = document.getElementById('preloader');
const swipeText = document.getElementById('swipe-text');
const swipeImg = document.getElementById('swipe-img');
const hammer = new Hammer(swipeContainer);
let isLoading = false;
let currentCategory = 'sfw';

hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

function getRandomWaifuImage(category) {
  if (isLoading) {
    return;
  }

  preloader.style.display = 'block';
  swipeContainer.style.backgroundImage = 'url(waifu-wait.jpg)';
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

  fetch(`https://api.waifu.pics/${category}/waifu`)
    .then(response => response.json())
    .then(data => {
      image.src = data.url;
    });
}

hammer.on('swipe', function () {
  swipeText.style.display = 'none';
  swipeImg.style.display = 'none';
  getRandomWaifuImage(currentCategory);
});

document.addEventListener('dblclick', function() {
  currentCategory = currentCategory === 'sfw' ? 'nsfw' : 'sfw';

  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.top = '10px';
  notification.style.left = '10px';
  notification.style.padding = '10px';
  notification.style.backgroundColor = 'black';
  notification.style.color = 'white';
  notification.style.borderRadius = '0';
  notification.style.fontSize = '16px';
  notification.style.zIndex = '99';
  notification.innerHTML = `Switched to ${currentCategory.toUpperCase()} mode`;

  document.body.appendChild(notification);

  setTimeout(function() {
    document.body.removeChild(notification);
  }, 2000);
});

window.addEventListener('load', function () {
  swipeText.style.display = 'block';
});