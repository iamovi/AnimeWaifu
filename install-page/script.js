document.addEventListener("DOMContentLoaded", function() {
    var loader = document.getElementById("loader");
    setTimeout(function() {
        loader.style.display = "none"; // Hide the loader after 1 second
    }, 1000);
});


document.getElementById("downloadButton").addEventListener("click", function() {
    const downloadLink = 'https://objects.githubusercontent.com/github-production-release-asset-2e65be/752754473/5e0ef8c0-c328-462e-b119-9cb4f8c6d738?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=releaseassetproduction%2F20240731%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240731T062200Z&X-Amz-Expires=300&X-Amz-Signature=e5dddbd0ac668895c714b2da9188ff971e60b0305d8debbd35be457e9398e385&X-Amz-SignedHeaders=host&actor_id=137372623&key_id=0&repo_id=752754473&response-content-disposition=attachment%3B%20filename%3DAnimeWaifu.apk&response-content-type=application%2Fvnd.android.package-archive';
    const a = document.createElement('a');
    a.href = downloadLink;
    a.download = 'AnimeWaifu';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  document.getElementById("downloadButton2").addEventListener("click", function() {
    const downloadLink = 'https://objects.githubusercontent.com/github-production-release-asset-2e65be/752754473/2b544d50-c12e-4ed3-a3a7-38a104d427c1?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=releaseassetproduction%2F20240731%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240731T062245Z&X-Amz-Expires=300&X-Amz-Signature=5f054ca86880f75a739d9c3b5ea4ebc42c4cf09bb0d747ab16aaa7334eea0791&X-Amz-SignedHeaders=host&actor_id=137372623&key_id=0&repo_id=752754473&response-content-disposition=attachment%3B%20filename%3DAnimeWaifuSetup.exe&response-content-type=application%2Foctet-stream';
    const a = document.createElement('a');
    a.href = downloadLink;
    a.download = 'AnimeWaifuSetup';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });