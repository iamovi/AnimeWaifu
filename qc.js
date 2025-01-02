document
  .getElementById("staticBackdropQC")
  .addEventListener("shown.bs.modal", function () {
    const iframe = document.getElementById("qcIframe");
    const preloader = document.getElementById("qcPreloader");
    const baseUrl = "https://animewaifuqcz.netlify.app";

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
