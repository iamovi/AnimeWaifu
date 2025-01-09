const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 1190,
        height: 700,
        icon: './build/icon.ico',
        autoHideMenuBar: true, 
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
        },
    });

    mainWindow.setMenuBarVisibility(false); // Explicitly hide the menu bar

    mainWindow.loadFile(path.join(__dirname, 'public', 'index.html'));

    // Open DevTools (optional)
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});