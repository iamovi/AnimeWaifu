    // Add a cache-busting parameter
    document.addEventListener('DOMContentLoaded', function () {
        const iframe = document.getElementById('qcIframe');
        const baseUrl = "https://animewaifuqc.netlify.app";
        iframe.src = `${baseUrl}?cacheBust=${new Date().getTime()}`;
    });