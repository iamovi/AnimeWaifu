// AnimeWaifu Talks

const animeWaifuURL = "https://aniwifetalks.pages.dev";

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

    // Create a variable to store the timeout ID for loading text
    let loadingTextTimeout = setTimeout(function() {
      loadingText.style.display = "block";
      loadingText.innerHTML = "This will take a minute,<br> Connecting to the AnimeWaifu Talks server!";
    }, 1000); // 1 second delay for loading text

    iframe.addEventListener("load", function () {
      // Clear the timeout if iframe loads before 1 second
      clearTimeout(loadingTextTimeout);

      // Hide both the preloader gif and the loading text immediately when the iframe loads
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
