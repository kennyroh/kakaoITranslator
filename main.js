"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const url = require("url");
// main.ts
let mainWindow;
let tray;
function createWindow() {
    const iconPath = path.join(electron_1.app.getAppPath(), "src/main/icon2.png");
    mainWindow = new electron_1.BrowserWindow({
        width: 500,
        height: 600,
        icon: iconPath,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
        },
    });
    mainWindow.webContents.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36';
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "./index.html"),
        protocol: "file:",
        slashes: true,
    }));
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}
function createTray() {
    const iconPath = path.join(electron_1.app.getAppPath(), "src/main/icon2.png");
    tray = new electron_1.Tray(iconPath);
    const contextMenu = electron_1.Menu.buildFromTemplate([
        { label: "Open App", click: () => reopenMainWindow() },
        { label: "Quit", click: () => electron_1.app.quit() },
    ]);
    tray.setContextMenu(contextMenu);
}
electron_1.app.on("ready", () => {
    createWindow();
    createTray();
    createAppMenu();
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
function reopenMainWindow() {
    if (!mainWindow) {
        createWindow();
    }
    else {
        mainWindow.show();
    }
}
function createAppMenu() {
    const template = [
        {
            label: 'Kakao i',
            submenu: [
                { role: 'about', label: 'About' },
                { type: 'separator' },
                { role: 'quit', label: 'Quit' },
            ],
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'delete' },
                { type: 'separator' },
                { role: 'selectAll' },
            ],
        },
        // ... other menu items
    ];
    const menu = electron_1.Menu.buildFromTemplate(template);
    electron_1.Menu.setApplicationMenu(menu);
}
//# sourceMappingURL=main.js.map