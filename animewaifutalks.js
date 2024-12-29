// AnimeWaifu Talks

const animeWaifuURL = "https://animewaifutalks.up.railway.app";

document.getElementById("animewaifu-talks").addEventListener("click", function () {
  const iframeContainer = document.getElementById("iframe-container");
  const iframe = document.getElementById("animewaifu-iframe");
  const preloaderX = document.getElementById("preloaderX"); 
  const loadingText = document.getElementById("loading-text"); 

  iframe.src = animeWaifuURL;
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


