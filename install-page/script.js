document.addEventListener("DOMContentLoaded", function() {
    var loader = document.getElementById("loader");
    setTimeout(function() {
        loader.style.display = "none"; // Hide the loader after 1 second
    }, 1000);
});


document.getElementById("downloadButton").addEventListener("click", function() {
    const downloadLink = '';
    const a = document.createElement('a');
    a.href = downloadLink;
    a.download = 'AnimeWaifu';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  document.getElementById("downloadButton2").addEventListener("click", function() {
    const downloadLink = '';
    const a = document.createElement('a');
    a.href = downloadLink;
    a.download = 'AnimeWaifuSetup';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });