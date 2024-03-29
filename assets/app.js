const swipeContainer = document.getElementById('swipe-container');
const preloader = document.getElementById('preloader');
const hammer = new Hammer(swipeContainer);
let isLoading = false;

hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

function getRandomWaifuImage(category) {
  if (isLoading) {
    return;
  }

  preloader.style.display = 'block';
  swipeContainer.style.backgroundImage = 'url(https://ik.imagekit.io/iamovi/uwu.jpg?updatedAt=1707075866067)';
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

  fetch(`https://api.waifu.pics/sfw/${category}`)
    .then(response => response.json())
    .then(data => {
      image.src = data.url;
    });
}

hammer.on('swipe', function () {
  getRandomWaifuImage('waifu');
});
