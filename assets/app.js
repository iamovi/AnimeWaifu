var swipeContainer = document.getElementById('swipe-container');
var preloader = document.getElementById('preloader');
var hammer = new Hammer(swipeContainer);
var isLoading = false;

hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

function getRandomWaifuImage(category) {
  if (isLoading) {
    return; // Avoid generating a new image while the current one is loading
  }

  preloader.style.display = 'block'; // Show preloader
  swipeContainer.style.backgroundImage = 'url(https://ik.imagekit.io/iamovi/uwu.jpg?updatedAt=1707075866067)'; // Show new image during loading
  swipeContainer.classList.add('loading'); // Add loading class
  isLoading = true;

  var image = new Image();
  image.src = '';

  image.onload = function() {
    swipeContainer.style.backgroundImage = 'url(' + image.src + ')';
    preloader.style.display = 'none'; // Hide preloader once image is fully loaded
    swipeContainer.classList.remove('loading'); // Remove loading class
    isLoading = false; // Set loading status to false
  };

  fetch(`https://api.waifu.pics/sfw/${category}`)
    .then(response => response.json())
    .then(data => {
      image.src = data.url; // Set the source after fetching to trigger the 'load' event
    });
}

hammer.on('swipe', function() {
  getRandomWaifuImage('waifu');
});
