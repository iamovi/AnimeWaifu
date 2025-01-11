let selectedType = ''; // To store the selected category

// Event listener for generating a waifu image when the button is clicked
document.getElementById('generate-meme-btn-mw').addEventListener('click', function () {
    if (!selectedType) {
        // Show error message inside the modal instead of alert
        const errorMessage = document.getElementById('error-message-mw');
        if (errorMessage) {
            errorMessage.innerHTML = "Oi Onii Chan,<br>select a Type! 🌸"; // Set the error message
            errorMessage.style.display = 'block'; // Make sure the error message is visible
        }
        return; // Prevent fetching if no category is selected
    }
    fetchWaifu(selectedType);
});

// Add event listeners to dropdown items inside the modal to manage active selection
document.querySelectorAll('#staticBackdropMW .dropdown-item').forEach(item => {
    item.addEventListener('click', function () {
        // Remove 'active' class from all dropdown items
        document.querySelectorAll('#staticBackdropMW .dropdown-item').forEach(i => i.classList.remove('active'));
        
        // Add 'active' class to the clicked item
        item.classList.add('active');
        
        // Store the selected category type
        selectedType = item.getAttribute("data-type");

        // Update the selected category display
        const selectedCategoryDisplay = document.getElementById('selected-category-display');
        if (selectedCategoryDisplay) {
            selectedCategoryDisplay.innerHTML = `Selected: ${item.innerText}`;
        }

        // Hide the error message when a category is selected
        const errorMessage = document.getElementById('error-message-mw');
        if (errorMessage) {
            errorMessage.style.display = 'none'; // Hide the error message
        }
    });
});

// Function to fetch the waifu image based on the selected type
function fetchWaifu(type) {
    const generateButton = document.getElementById('generate-meme-btn-mw');
    const preloader = document.getElementById('preloader-unique-mw');
    const waifuImg = document.getElementById('meme-img-unique-mw');
    const errorMessage = document.getElementById('error-message-mw');

    // Disable the button and show loading text
    generateButton.disabled = true;
    generateButton.innerHTML = 'Loading...';

    // Show preloader before starting the fetch
    preloader.style.display = 'block';
    waifuImg.style.display = 'none';

    // Set the API URL based on the selected type
    let apiUrl = '';
    if (type === 'waifu') {
        apiUrl = 'https://api.waifu.pics/nsfw/waifu';
    } else if (type === 'neko') {
        apiUrl = 'https://api.waifu.pics/nsfw/neko';
    } else if (type === 'trap') {
        apiUrl = 'https://api.waifu.pics/nsfw/trap';
    } else if (type === 'blowjob') {
        apiUrl = 'https://api.waifu.pics/nsfw/blowjob';
    } else if (type === 'dance') {
        apiUrl = 'https://api.waifu.pics/sfw/dance';
    } else if (type === 'happy') {
        apiUrl = 'https://api.waifu.pics/sfw/happy';
    } else if (type === 'cry') {
        apiUrl = 'https://api.waifu.pics/sfw/cry';
    } else if (type === 'nom') {
        apiUrl = 'https://api.waifu.pics/sfw/nom';
    } else if (type === 'cringe') {
        apiUrl = 'https://api.waifu.pics/sfw/cringe';
    } else if (type === 'handhold') {
        apiUrl = 'https://api.waifu.pics/sfw/handhold';
    } else if (type === 'kill') {
        apiUrl = 'https://api.waifu.pics/sfw/kill';
    }

    // Set a timeout to stop the fetch after 15 seconds
    const timeout = setTimeout(() => {
        preloader.style.display = 'none'; // Hide the preloader
        generateButton.disabled = false; // Re-enable the button
        generateButton.innerHTML = 'Try Again!'; // Change button text
        if (errorMessage) {
            errorMessage.innerHTML = "Oops! Something went wrong.<br>Please try again!"; // Display error message
            errorMessage.style.display = 'block'; // Show the error message
        }
    }, 15000); // 15 seconds timeout

    // Fetch image from the selected endpoint
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            clearTimeout(timeout); // Clear the timeout if the image is fetched successfully

            const waifuUrl = data.url; // Get the image URL

            // Display the image
            waifuImg.src = waifuUrl;
            waifuImg.onload = function () {
                // Hide preloader and show the image when it's loaded
                preloader.style.display = 'none';
                waifuImg.style.display = 'block';

                // Countdown in the button after the image is loaded
                countdownToEnableButton(generateButton, 'Get Pic');
            };
        })
        .catch(error => {
            console.error('Error fetching image:', error);
            clearTimeout(timeout); // Clear the timeout if an error occurs
            preloader.style.display = 'none'; // Hide the preloader
            generateButton.disabled = false; // Re-enable the button
            if (errorMessage) {
                errorMessage.innerHTML = "Oops! Something went wrong.<br>Please try again!"; // Display error message
                errorMessage.style.display = 'block'; // Show the error message
            }
        });
}

// Function to reset everything in the modal when it's closed
document.getElementById('staticBackdropMW').addEventListener('hidden.bs.modal', function () {
    const waifuImg = document.getElementById('meme-img-unique-mw');
    const preloader = document.getElementById('preloader-unique-mw');
    const generateButton = document.getElementById('generate-meme-btn-mw');
    const selectedCategoryDisplay = document.getElementById('selected-category-display');
    const errorMessage = document.getElementById('error-message-mw');

    // Clear the image and hide it
    waifuImg.src = '';
    waifuImg.style.display = 'none';

    // Hide the preloader
    preloader.style.display = 'none';

    // Reset the button state
    generateButton.disabled = false;
    generateButton.innerHTML = 'Get Pic <i class="fa-brands fa-space-awesome"></i>';

    // Reset the selected category display
    if (selectedCategoryDisplay) {
        selectedCategoryDisplay.innerHTML = 'Selected: None';
    }

    // Hide the error message
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }

    // Reset the selected category type
    selectedType = ''; // Clear the selected type to reset everything
});

// Countdown function to re-enable the button
function countdownToEnableButton(button, originalText) {
    let countdown = 3; // Countdown in seconds
    const interval = setInterval(() => {
        button.innerHTML = `Wait ${countdown}s...`;
        countdown--;

        if (countdown < 0) {
            clearInterval(interval);
            button.disabled = false;
            button.innerHTML = `${originalText} <i class="fa-brands fa-space-awesome"></i>`;
        }
    }, 1000);
}
