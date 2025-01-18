const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 410,
        height: 700,
        resizable: false, // Disable resizing and maximizing
        autoHideMenuBar: true, // Automatically hide the menu bar
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
        },
        icon: path.join(__dirname, 'build', 'icon.ico'), // Specify the icon path
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
