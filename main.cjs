require("dotenv").config();

const { app, BrowserWindow, ipcMain } = require("electron");
const { getTodoList, saveTodoItem, finish, saveTodoList } = require("./setting.cjs");

let win;

let isAppQuitting = false;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    titleBarStyle: "hidden",
  });

  win.loadURL("http://localhost:3000");

  // win.webContents.on("before-input-event", (event, input) => {
  //   if (input.control && input.key.toLowerCase() === "s") {
  //     console.log("Pressed Control+S");
  //     win.webContents.send("sidebar-toggle");
  //     event.preventDefault();
  //   }
  // });

  win.on("close", (event) => {
    if (!isAppQuitting) {
      event.preventDefault();
      win.hide();
    } else {
      win = null;
    }
  });

  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.whenReady().then(() => {
  app.on("ready", createWindow);

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0 && win == null) {
      createWindow();
    } else {
      win.show();
    }
  });
});

app.on("before-quit", function () {
  isAppQuitting = true;
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// //mongdb database
// const { MongoClient } = require("mongodb");

// const client = new MongoClient(process.env.DB);
// let profile;

// async function getUser() {
//   try {
//     const db = client.db("Napoleon");
//     const users = db.collection("Users");

//     // Query for a movie that has the title 'Back to the Future'
//     const user = await users.findOne({ name: "John" });

//     console.log(user);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

//ipc connections

// ipcMain.on("connect-db", (event) => {
//   getUser().catch(console.dir);
// });

ipcMain.on("render", (event) => {
  event.sender.send("render");
});

ipcMain.on("show-modal", (event, arg) => {
  win.webContents.send("show-modal", arg);
});

ipcMain.on("add-item", (event, arg) => {
  win.webContents.send("add-item", arg);
  saveTodoItem(arg);
});

ipcMain.on("from-worker", (event, arg) => {
  win.webContents.send("from-worker", arg);
  console.log("recieved");
});

ipcMain.on("get-todo-list", (event, arg) => {
  win.webContents.send("get-todo-list", getTodoList(arg));
});

ipcMain.on("update-list", (event, arg) => {
  saveTodoList(arg);
});

ipcMain.on("clear", (event) => {
  finish();
});
