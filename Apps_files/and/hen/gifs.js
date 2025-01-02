document.getElementById("generate-hen-btn").addEventListener("click", function () {
    const generateButton = document.getElementById("generate-hen-btn");
    const gifContainer = document.getElementById("gif-container");

    // Disable the button and show loading text
    generateButton.disabled = true;
    generateButton.innerHTML = 'Loading...';

    // Clear the previous GIF
    gifContainer.innerHTML = '';

    // Array of GIF links
    const gifLinks = [
        "https://ik.imagekit.io/iamovi/A.W.Hen./17958943.gif?updatedAt=1735825936242",
        "https://ik.imagekit.io/iamovi/A.W.Hen./6342257.gif?updatedAt=1735825935483",
        "https://ik.imagekit.io/iamovi/A.W.Hen./21835045.gif?updatedAt=1735825935306",
        "https://ik.imagekit.io/iamovi/A.W.Hen./16986053.gif?updatedAt=1735825934993",
        "https://ik.imagekit.io/iamovi/A.W.Hen./20239232.gif?updatedAt=1735825935008",
        "https://ik.imagekit.io/iamovi/A.W.Hen./5059717.gif?updatedAt=1735825934719"
    ];

    // Check if there are GIF links available
    if (gifLinks && gifLinks.length > 0) {
        // Get a random GIF URL
        const randomGif = gifLinks[Math.floor(Math.random() * gifLinks.length)];

        // Update the GIF container with the selected GIF
        gifContainer.innerHTML = `<img src="${randomGif}" alt="Random GIF" style="max-width: 100%; height: auto;">`;

        // Enable the button after a short delay
        setTimeout(() => {
            countdownToEnableButton(generateButton, 'Get GIF');
        }, 1000); // You can adjust this delay for better UX
    } else {
        gifContainer.innerHTML = "No GIFs available.";

        // Enable the button immediately
        countdownToEnableButton(generateButton, 'Get GIF');
    }
});

// Countdown function to re-enable the button
function countdownToEnableButton(button, defaultText) {
    let countdown = 3;
    const countdownInterval = setInterval(() => {
        button.innerHTML = `Try again in ${countdown}s`;
        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval);
            button.innerHTML = `${defaultText} <i class="fa-brands fa-space-awesome"></i>`;
            button.disabled = false;
        }
    }, 1000); 
}
