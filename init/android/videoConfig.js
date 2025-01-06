document.addEventListener('DOMContentLoaded', () => {
    // Configuration for video source and poster
    const videoConfig = {
      videoSrc: './assets/init-waifu-old.mp4', // Dynamic video source
      posterSrc: './assets/init-poster.jpg' // Dynamic poster source
    };
  
    // Preload the poster image
    const posterImage = new Image();
    posterImage.src = videoConfig.posterSrc;
  
    // Once the poster image is loaded, update the video element
    posterImage.onload = () => {
      // Get references to the video and create source element dynamically
      const videoElement = document.getElementById('background-video');
      const sourceElement = document.createElement('source');
  
      // Set attributes for video and source
      videoElement.setAttribute('poster', videoConfig.posterSrc);
      sourceElement.setAttribute('src', videoConfig.videoSrc);
      sourceElement.setAttribute('type', 'video/mp4');
  
      // Append the source element to the video element
      videoElement.appendChild(sourceElement);
  
      // Load the video with the updated source
      videoElement.load();
    };
  
    // Handle poster image load error
    posterImage.onerror = () => {
      console.error('Failed to load the poster image.');
    };
  });
  