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

//////////////////////////////////////////////////////////////////

document.getElementById("hideVideoButton").addEventListener("click", function () {
  const video = document.querySelector(".waifu-vid");
  const button = document.getElementById("hideVideoButton");

  if (video.style.display === "none") {
      video.style.display = "block"; // Show the video
      button.innerHTML = `Hide Video <i class="bi bi-eye-slash-fill"></i>`; // Update button text with "Hide Video" and icon
  } else {
      video.style.display = "none"; // Hide the video
      button.innerHTML = `Show Video <i class="bi bi-eye-fill"></i>`; // Update button text with "Show Video" and icon
  }
});






//



document.getElementById("playAnimeButton").addEventListener("click", function () {
  // Create a full-screen overlay for the video
  const fullScreenContainer = document.createElement("div");
  fullScreenContainer.style.position = "fixed";
  fullScreenContainer.style.top = "0";
  fullScreenContainer.style.left = "0";
  fullScreenContainer.style.width = "100%";
  fullScreenContainer.style.height = "100%";
  fullScreenContainer.style.backgroundColor = "black";
  fullScreenContainer.style.zIndex = "9999";
  fullScreenContainer.style.display = "flex";
  fullScreenContainer.style.alignItems = "center";
  fullScreenContainer.style.justifyContent = "center";

  // Add a video element
  const video = document.createElement("video");
  video.src = "./chainsawman.mp4"; // Replace with your video file path
  video.style.width = "100%";
  video.style.height = "100%";
  video.style.objectFit = "cover";
  video.controls = true;
  video.autoplay = true;

  // Add the close button
  const closeButton = document.createElement("button");
  closeButton.innerHTML = "&times;"; // Unicode for 'X'
  closeButton.style.position = "absolute";
  closeButton.style.top = "20px";
  closeButton.style.right = "20px";
  closeButton.style.fontSize = "30px";
  closeButton.style.color = "white";
  closeButton.style.background = "none";
  closeButton.style.border = "none";
  closeButton.style.cursor = "pointer";
  closeButton.style.zIndex = "10000";

  // Close the full-screen video when clicking the close button
  closeButton.addEventListener("click", () => {
      document.body.removeChild(fullScreenContainer);
  });

  // Append the video and close button to the container
  fullScreenContainer.appendChild(video);
  fullScreenContainer.appendChild(closeButton);
  document.body.appendChild(fullScreenContainer);

  // Exit full-screen when the video ends
  video.addEventListener("ended", () => document.body.removeChild(fullScreenContainer));
});
