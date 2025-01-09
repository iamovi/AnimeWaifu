window.onload = function() {
    const iframe = document.getElementById("dynamic-iframe");
    const preloader = document.getElementById("preloader");
    const dynamicSrc = "https://animewaifuqc-v2.netlify.app";
    const noCacheSrc = dynamicSrc + "?t=" + new Date().getTime();

    // Show preloader
    preloader.style.display = "flex";

    iframe.onload = function() {
        // Add a delay of 1 seconds before hiding preloader
        setTimeout(() => {
            preloader.style.display = "none";
            iframe.style.display = "block";
        }, 1000); // 1000 milliseconds = 1 seconds
    };

    // Set iframe source
    iframe.src = noCacheSrc;
};
