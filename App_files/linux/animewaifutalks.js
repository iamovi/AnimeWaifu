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

    loadingText.style.display = "block";
    loadingText.innerText = "Loading, please wait...";

    iframe.addEventListener("load", function () {
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
