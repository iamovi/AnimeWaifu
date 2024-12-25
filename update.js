const currentVersion = "2.0"; // Replace with your app's current version

async function checkForUpdates() {
    try {
        const response = await fetch("https://example.com/version.json");
        const data = await response.json();

        if (data.version !== currentVersion) {
            const userConfirmed = confirm(
                `A new version (${data.version}) is available. Would you like to update?`
            );

            if (userConfirmed) {
                // Redirect the user to download the APK
                window.open(data.update_url, "_blank");
            }
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
}

// Call this function when the app starts
checkForUpdates();
