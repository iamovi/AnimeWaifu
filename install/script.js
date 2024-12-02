document.addEventListener("DOMContentLoaded", function() {
    var loader = document.getElementById("loader");
    setTimeout(function() {
        loader.style.display = "none"; // Hide the loader after 1 second
    }, 1000);
});


document.getElementById("downloadButton").addEventListener("click", function() {
    const downloadLink = 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu.apk';
    const a = document.createElement('a');
    a.href = downloadLink;
    a.download = 'AnimeWaifu';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  document.getElementById("downloadButton2").addEventListener("click", function() {
    const downloadLink = 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifuSetup.exe';
    const a = document.createElement('a');
    a.href = downloadLink;
    a.download = 'AnimeWaifuSetup';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  document.getElementById("downloadButton3").addEventListener("click", function() {
    const downloadLink = 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuapps/AnimeWaifu_1.0.0_amd64.deb';
    const a = document.createElement('a');
    a.href = downloadLink;
    a.download = 'AnimeWaifu_1.0.0_amd64';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  document.getElementById("downloadButton4").addEventListener("click", function() {
    const downloadLink = 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuapps/AnimeWaifu-1.0.0.x86_64.rpm';
    const a = document.createElement('a');
    a.href = downloadLink;
    a.download = 'AnimeWaifu-1.0.0.x86_64';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
