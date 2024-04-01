document.addEventListener("DOMContentLoaded", function() {
    var loader = document.getElementById("loader");
    setTimeout(function() {
        loader.style.display = "none"; // Hide the loader after 1 second
    }, 1000);
});


document.getElementById("downloadButton").addEventListener("click", function() {
    // Replace 'your-app-download-link' with the actual link to your app file
    var downloadLink = './main/AnimeWaifu.apk';
    
    // Create an anchor element
    var a = document.createElement('a');
    a.href = downloadLink;
    
    // Set the download attribute to specify the filename
    a.download = 'your-app-filename';
    
    // Append the anchor element to the body
    document.body.appendChild(a);
    
    // Click the anchor element to trigger the download
    a.click();
    
    // Remove the anchor element from the body
    document.body.removeChild(a);
});
