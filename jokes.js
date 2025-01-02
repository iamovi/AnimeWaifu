// Store the last displayed joke to prevent repetition
let lastJoke = null;

// Event listener for generating a joke when the button is clicked
document.getElementById('generate-joke-btn').addEventListener('click', function() {
    fetchRandomJoke();
});

function fetchRandomJoke() {
    const generateButton = document.getElementById('generate-joke-btn');
    const jokeContainer = document.getElementById('joke-container');
    const preloader = document.getElementById('preloaderJokes');

    // Disable the button and show loading text
    generateButton.disabled = true;
    generateButton.innerHTML = 'Loading...';

    // Show the preloader
    preloader.style.display = 'block';  // Show preloader
    jokeContainer.innerHTML = ''; // Clear previous joke
    
    // JokeAPI endpoint for fetching a random joke
    const url = 'https://v2.jokeapi.dev/joke/Any';

    // Fetch the joke from the API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Check if the joke is the same as the last one
            let jokeText = '';

            // Determine if the joke is a single-line or two-part joke
            if (data.joke) {
                jokeText = data.joke;
            } else {
                jokeText = `${data.setup} <br> ${data.delivery}`;
            }

            // If the joke is the same as the last one, fetch another joke
            if (jokeText === lastJoke) {
                fetchRandomJoke(); // Recursively fetch a new joke
            } else {
                // Hide the preloader once the joke is loaded
                preloader.style.display = 'none';  // Hide preloader

                // Display the new joke
                jokeContainer.innerHTML = `<p>${jokeText}</p>`;

                // Store the current joke as the last one
                lastJoke = jokeText;

                // Countdown in the button after the joke is loaded
                countdownToEnableButton(generateButton);
            }
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
            // Hide preloader in case of error
            preloader.style.display = 'none';  // Hide preloader
            // Re-enable the button in case of error
            generateButton.disabled = false;
            generateButton.innerHTML = 'Generate Joke';
        });
}

function countdownToEnableButton(button) {
    let countdown = 3;
    const countdownInterval = setInterval(() => {
        button.innerHTML = `Try again in ${countdown}s`;
        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval);
            button.innerHTML = 'Generate Joke <i class="fa-brands fa-space-awesome"></i>';
            button.disabled = false; // Re-enable the button
        }
    }, 1000); // Update every second
}
