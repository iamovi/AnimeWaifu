let lastJoke = null;

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
    preloader.style.display = 'block';  
    jokeContainer.innerHTML = ''; 
    
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
                fetchRandomJoke(); 
            } else {
                preloader.style.display = 'none'; 
                jokeContainer.innerHTML = `<p>${jokeText}</p>`;
                lastJoke = jokeText;
                countdownToEnableButton(generateButton, 'Get Joke');
            }
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
            preloader.style.display = 'none';  
            generateButton.disabled = false;
            generateButton.innerHTML = 'Get Joke <i class="fa-brands fa-space-awesome"></i>';
        });
}

// Countdown function
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
