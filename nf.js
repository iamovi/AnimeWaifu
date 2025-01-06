document
  .getElementById("staticBackdropNF")
  .addEventListener("shown.bs.modal", function () {
    const iframe = document.getElementById("nfIframe");
    const preloader = document.getElementById("nfPreloader");
    const baseUrl = "https://aw-nofap.netlify.app/";

    preloader.style.display = "block";
    iframe.style.display = "none";

    iframe.src = `${baseUrl}?cacheBust=${new Date().getTime()}`;

    iframe.onload = function () {
      preloader.style.display = "none";
      iframe.style.display = "block";
      
      // Dynamically set the iframe height
      iframe.style.height = "480px"; // Set the height you desire
    };
  });
