function checkInternetConnection() {
  if (!navigator.onLine) {
    showOfflineModal();
  } else {
    removeOfflineModal();
  }
}

function showOfflineModal() {
  // Prevent multiple modals
  if (document.getElementById("offline-modal")) return;

  const offlineModal = document.createElement("div");
  offlineModal.id = "offline-modal";
  offlineModal.style = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Iceland', sans-serif;
      z-index: 1000;
    `;
  offlineModal.innerHTML = `
      <div style="text-align: center;">
        <h1>No Internet Connection</h1>
        <p>Please check your internet connection and try again.</p>
        <button style="
          background-color: #f44336; 
          border: none; 
          color: white; 
          padding: 10px 20px; 
          text-align: center; 
          text-decoration: none; 
          display: inline-block; 
          font-size: 16px; 
          margin-top: 10px;
          cursor: pointer;
          font-weight: bold;
        " onclick="window.location.reload();">Retry</button>
      </div>
    `;
  document.body.appendChild(offlineModal);
}

function removeOfflineModal() {
  const offlineModal = document.getElementById("offline-modal");
  if (offlineModal) {
    offlineModal.remove();
  }
}

// Add event listeners for online/offline events
window.addEventListener("offline", showOfflineModal);
window.addEventListener("online", removeOfflineModal);

// Initial check when the app loads
checkInternetConnection();
