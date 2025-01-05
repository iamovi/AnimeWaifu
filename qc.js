document
  .getElementById("staticBackdropQC")
  .addEventListener("shown.bs.modal", function () {
    const iframe = document.getElementById("qcIframe");
    const preloader = document.getElementById("qcPreloader");
    const baseUrl = "https://animewaifuqc-v1.netlify.app";

    preloader.style.display = "block";
    iframe.style.display = "none";

    iframe.src = `${baseUrl}?cacheBust=${new Date().getTime()}`;

    iframe.onload = function () {
      preloader.style.display = "none";
      iframe.style.display = "block";
      
      // Dynamically set the iframe height
      iframe.style.height = "550px"; // Set the height you desire
    };
  });

document
  .getElementById("staticBackdropQC")
  .addEventListener("hidden.bs.modal", function () {
    const iframe = document.getElementById("qcIframe");
    iframe.src = "";
    
    // Reset the iframe height when modal is hidden
    iframe.style.height = "450px"; // Reset to default height
  });
