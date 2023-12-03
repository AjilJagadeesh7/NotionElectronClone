const { app, BrowserWindow, shell, Menu } = require("electron");

let mainWindow;

function openExternal(url) {
  shell.openExternal(url);
}

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL("https://www.notion.so");

  mainWindow.webContents.on("will-navigate", (event, url) => {
    const parsedUrl = new URL(url);
    const currentHost = new URL(mainWindow.webContents.getURL()).hostname;

    if (parsedUrl.hostname !== currentHost) {
      event.preventDefault();
      openExternal(url);
    }
  });

  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Back",
          accelerator: "CmdOrCtrl+Left",
          click: () => {
            if (mainWindow.webContents.canGoBack()) {
              mainWindow.webContents.goBack();
            }
          },
        },
        {
          label: "Forward",
          accelerator: "CmdOrCtrl+Right",
          click: () => {
            if (mainWindow.webContents.canGoForward()) {
              mainWindow.webContents.goForward();
            }
          },
        },
        {
          label: "Quit",
          accelerator: "CmdOrCtrl+Q",
          click: () => {
            app.quit();
          },
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});
