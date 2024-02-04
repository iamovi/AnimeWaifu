
    var swipeContainer = document.getElementById('swipe-container');
    var preloader = document.getElementById('preloader');
    var hammer = new Hammer(swipeContainer);
    var isLoading = false;
    var hiddenImage = document.getElementById('hidden-image');

    hammer.get('swipe').set({
      direction: Hammer.DIRECTION_ALL
    });

    function preloadImage(url) {
      hiddenImage.src = url;
      hiddenImage.onload = function () {
        preloader.style.display = 'none';
        swipeContainer.style.backgroundImage = 'url(' + url + ')';
        isLoading = false;
      };
    }

    function getRandomWaifuImage(category) {
      if (isLoading) {
        return;
      }

      preloader.style.display = 'block';
      isLoading = true;

      fetch(`https://api.waifu.pics/sfw/${category}`)
        .then(response => response.json())
        .then(data => {
          preloadImage(data.url);
        });
    }

    hammer.on('swipe', function () {
      getRandomWaifuImage('waifu');
    });
 