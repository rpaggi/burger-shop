const electron = require('electron')
const {Menu, MenuItem} = electron
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1280, 
    height: 720, 
    icon: __dirname + '/ico/favicon-32x32.png'
  })

  mainWindow.loadURL(`file://${__dirname}/src/index.html`)

  //menu.append(new MenuItem({type: 'separator'}));
  const menu = new Menu();
  menu.append(
    new MenuItem({
      label: 'Home',
      submenu:[{
        label: "Home1",
        accelerator: "CmdOrCtrl+W",
        role: "Home1",
        click(){ app.quit(); }
      },
      {
        label: "Home2",
        accelerator: "F12",
        click(){ mainWindow.webContents.openDevTools() }
      },
      {
        label: "Home3"
      }]
    }
  ));

  mainWindow.setMenu(menu);

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
    mainWindow.maximize();
  }
})
