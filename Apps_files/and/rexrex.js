document
  .getElementById("staticBackdroprexrex")
  .addEventListener("shown.bs.modal", function () {
    const iframe = document.getElementById("rexrexIframe");
    const preloader = document.getElementById("rexrexPreloader");
    const baseUrl = "https://trexrunrun.netlify.app";

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
