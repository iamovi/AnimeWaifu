const currentVersion = "2.1"; // app's current version.

// Function to check for updates
async function checkForUpdates() {
    try {
        // Append a unique query parameter to prevent caching
        const cacheBuster = `?t=${Date.now()}`;
        const response = await fetch(`https://iamovi.github.io/AnimeWaifu/version.json${cacheBuster}`);
        const data = await response.json();

        // Compare the current app version with the one from version.json
        if (data.version !== currentVersion) {
            const updateMessage = `
                <h4 class="text-warning">New version ${data.version} is available!</h4>
                <button id="update-btn" class="btn btn-primary" style="background-color: #28a745; border-color: #28a745; color: white; font-size: 15px; padding: 10px 15px; border-radius: 0px; cursor: pointer; transition: none; transform: none; box-shadow: none;">
                    Click here to update
                </button>
            `;
            document.getElementById("update-message").innerHTML = updateMessage;
            document.getElementById("update-message").style.display = "block";

            // Play the sound when an update is detected (same sound for both scenarios)
            const updateSound = document.getElementById("update-sound");
            updateSound.play();

            // Add event listener for the update button
            document.getElementById("update-btn").onclick = function () {
                window.open(data.update_url, "_blank");
            };
        } else {
            const upToDateMessage = `<p class="text-success">You are already on the latest version!</p>`;
            document.getElementById("update-message").innerHTML = upToDateMessage;
            document.getElementById("update-message").style.display = "block";

            // Play the same sound when the app is up to date
            const updateSound = document.getElementById("update-sound");
            updateSound.play();
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
        const errorMessage = `<p class="text-danger">Unable to check for updates at this time.</p>`;
        document.getElementById("update-message").innerHTML = errorMessage;
        document.getElementById("update-message").style.display = "block";
    }
}

// Call the function to check for updates when the page loads or user clicks the update button
checkForUpdates();
