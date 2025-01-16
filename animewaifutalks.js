// AnimeWaifu Talks

const animeWaifuURL = "https://animewaifu-talks.onrender.com";

document
  .getElementById("animewaifu-talks")
  .addEventListener("click", function () {
    const iframeContainer = document.getElementById("iframe-container");
    const iframe = document.getElementById("animewaifu-iframe");
    const preloaderX = document.getElementById("preloaderX");
    const loadingText = document.getElementById("loading-text");

    // Append a timestamp to the URL to avoid caching
    const noCacheURL = animeWaifuURL + "?t=" + new Date().getTime();
    iframe.src = noCacheURL;

    iframeContainer.style.display = "block";
    preloaderX.style.display = "block";

    // Delay the loading text by 1 second
    setTimeout(function() {
      loadingText.style.display = "block";
      loadingText.innerHTML = "Loading...<br> Currently this App's backend is deployed on render.com free tier due to money issues, So the first load may take up to 1 minute. Kindly wait :(";
    }, 1000); // 1 second delay for loading text

    iframe.addEventListener("load", function () {
      // Hide both preloader gif and loading text immediately
      preloaderX.style.display = "none";
      loadingText.style.display = "none";
    });
  });

document.getElementById("close-iframe").addEventListener("click", function () {
  const iframeContainer = document.getElementById("iframe-container");
  const iframe = document.getElementById("animewaifu-iframe");
  const preloaderX = document.getElementById("preloaderX");
  const loadingText = document.getElementById("loading-text");

  iframeContainer.style.display = "none";
  iframe.src = "";
  preloaderX.style.display = "none";
  loadingText.style.display = "none";
});
