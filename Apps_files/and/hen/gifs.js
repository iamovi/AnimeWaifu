document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('staticBackdropHen').addEventListener('show.bs.modal', function () {
        const generateButton = document.getElementById("generate-hen-btn");
        const gifContainer = document.getElementById("gif-container");

        gifContainer.innerHTML = '';
        generateButton.disabled = false;
        generateButton.innerHTML = 'Get GIF <i class="fa-brands fa-space-awesome"></i>';
    });

    document.getElementById("generate-hen-btn").addEventListener("click", function () {
        const generateButton = document.getElementById("generate-hen-btn");
        const gifContainer = document.getElementById("gif-container");

        // Start countdown immediately
        countdownToEnableButton(generateButton, 'Get GIF');

        // Disable the button and prepare for GIF display
        generateButton.disabled = true;
        gifContainer.innerHTML = '';

        // List of all available GIF links
        const gifLinks = [
            "https://ik.imagekit.io/iamovi/A.W.Hen./17958943.gif?updatedAt=1735825936242",
            "https://ik.imagekit.io/iamovi/A.W.Hen./6342257.gif?updatedAt=1735825935483",
            "https://ik.imagekit.io/iamovi/A.W.Hen./21835045.gif?updatedAt=1735825935306",
            "https://ik.imagekit.io/iamovi/A.W.Hen./16986053.gif?updatedAt=1735825934993",
            "https://ik.imagekit.io/iamovi/A.W.Hen./20239232.gif?updatedAt=1735825935008",
            "https://ik.imagekit.io/iamovi/A.W.Hen./5059717.gif?updatedAt=1735825934719"
        ];

        // Use an array to track which GIFs have been shown
        if (!window.shownGifs) {
            window.shownGifs = [];
        }

        // Filter out already shown GIFs
        const remainingGifs = gifLinks.filter(gif => !window.shownGifs.includes(gif));

        if (remainingGifs.length > 0) {
            const randomGif = remainingGifs[Math.floor(Math.random() * remainingGifs.length)];
            gifContainer.innerHTML = `<img src="${randomGif}" alt="Random GIF" style="max-width: 100%; height: auto;">`;

            // Add the displayed GIF to the shownGifs array
            window.shownGifs.push(randomGif);
        } else {
            gifContainer.innerHTML = "No more GIFs to show.";
        }
    });

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
});
