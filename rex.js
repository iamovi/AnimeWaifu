document
  .getElementById("staticBackdropOvi")
  .addEventListener("shown.bs.modal", function () {
    const iframe = document.getElementById("rexIframe");
    const preloader = document.getElementById("rexPreloader");
    const baseUrl = "https://iamovi.github.io/EmojiCube";

    preloader.style.display = "block";
    iframe.style.display = "none";

    iframe.src = `${baseUrl}?cacheBust=${new Date().getTime()}`;

    iframe.onload = function () {
      preloader.style.display = "none";
      iframe.style.display = "block";
    };
  });

document
  .getElementById("staticBackdropQC")
  .addEventListener("hidden.bs.modal", function () {
    const iframe = document.getElementById("qcIframe");
    iframe.src = "";
  });
