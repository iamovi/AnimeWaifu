const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 700,
    skipTaskbar: true,
    show: false, // Do not show window immediately
    fullscreenable: false, // Disable fullscreen button
    fullscreen: false, // Ensure the window is not fullscreen by default
    maximizable: false, // Disable maximize button
    autoHideMenuBar: true, // Hide the menu bar by default
    icon: path.join(__dirname, 'build', 'icon.ico'), // Set the icon path to the build directory
    resizable: false, // Disable resizing
    webPreferences: {
      nodeIntegration: false, // Disable Node.js integration for security
      contextIsolation: true, // Enable context isolation for better security
    }
  });

  // Load the URL or file that should be shown in the window
  mainWindow.loadURL('file://' + path.join(__dirname, 'public', 'index.html'));

  // Show the window when it's ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle window close
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// Create window when Electron app is ready
app.on('ready', createWindow);

// Quit the app when all windows are closed (except for macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Recreate window when clicking on app icon in macOS (when no window is open)
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
