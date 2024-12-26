const currentVersion = "2.1"; // app's current version.

// Function to check for updates
async function checkForUpdates() {
    try {
        // Append a unique query parameter to prevent caching
        const cacheBuster = `?t=${Date.now()}`;
        const response = await fetch(`./version.json${cacheBuster}`);
        const data = await response.json();

        // Compare the current app version with the one from version.json
        if (data.version !== currentVersion) {
            const updateMessage = `
            <hr>
                <h4 class="text-danger mt-3">New version ${data.version} is available!</h4>
                <button id="update-btn" class="proceed">
                    <span>Proceed.</span>
                </button>
            `;
            document.getElementById("update-message").innerHTML = updateMessage;
            document.getElementById("update-message").style.display = "block";

            // Play the sound when an update is detected
            const updateSound = document.getElementById("update-sound");
            updateSound.play();

            // Add event listener for the update button
            document.getElementById("update-btn").onclick = function () {
                window.open(data.update_url, "_blank");
            };
        } else {
            const upToDateMessage = `<hr> <p class="text-success">You are already on the latest version! <i class="bi bi-check-all"></i></p>`;
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

// Add dynamic styles for the button
const style = document.createElement("style");
style.textContent = `
.proceed {
  width: 150px;
  padding: 0;
  border: none;
  transform: rotate(5deg);
  transform-origin: center;
  font-family: "Gochi Hand", cursive;
  text-decoration: none;
  font-size: 15px;
  cursor: pointer;
  padding-bottom: 3px;
  border-radius: 5px;
  box-shadow: 0 2px 0 #494a4b;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background-color: #5cdb95;
}

.proceed span {
  background: #f1f5f8;
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 2px solid #494a4b;
}

.proceed:active {
  transform: translateY(5px);
  padding-bottom: 0px;
  outline: 0;
}
`;
document.head.appendChild(style);

// Add event listener to the "Check for Updates" button
document.getElementById("check-updates-btn").addEventListener("click", checkForUpdates);
