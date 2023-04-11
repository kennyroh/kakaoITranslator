import { app, BrowserWindow, Menu, Tray } from "electron";
import * as path from "path";
import * as url from "url";

// main.ts
let mainWindow: BrowserWindow | null;
let tray: Tray | null;

function createWindow() {
    const iconPath = path.join(app.getAppPath(), "src/main/icon2.png");

    mainWindow = new BrowserWindow({
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
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "./index.html"),
            protocol: "file:",
            slashes: true,
        })
    );

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

function createTray() {
    const iconPath = path.join(app.getAppPath(), "src/main/icon2.png");
    tray = new Tray(iconPath);
    const contextMenu = Menu.buildFromTemplate([
        { label: "Open App", click: () => reopenMainWindow() },
        { label: "Quit", click: () => app.quit() },
    ]);
    tray.setContextMenu(contextMenu);
}


app.on("ready", () => {
    createWindow();
    createTray();
    createAppMenu();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

function reopenMainWindow() {
    if (!mainWindow) {
        createWindow();
    } else {
        mainWindow.show();
    }
}

function createAppMenu() {
    const template: Electron.MenuItemConstructorOptions[] = [
        {
            label: 'Kakao i',
            submenu: [
                { role: 'about', label: 'About' },
                { type: 'separator' },
                { role: 'quit', label: 'Quit' },
            ],
        },
        // ... other menu items
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}
