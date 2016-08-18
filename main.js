const electron = require('electron')
const {Menu, MenuItem} = electron
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

// In main process.
// const {ipcMain} = require('electron');
// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log(arg);  // prints "ping"
//   event.sender.send('asynchronous-reply', 'pong');
// });
//
// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg);  // prints "ping"
//   event.returnValue = 'pong';
// })

function inArray(a, t){
  for (var i = 0; i < a.length && a[i] !== t; i++) {

  }
  if(a[i] == null)
    return false;
  else
    return true;
}

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
      label: '&Arquivo',
      submenu:[
        {label: "&Sair", accelerator: "CmdOrCtrl+W",click(){ app.quit();}}
      ]
    })
  );
  menu.append(
    new MenuItem({
      label: '&Pedidos',
      submenu:[
        {label: "&Novo", click(){mainWindow.webContents.send('menu', 'order-add');}, accelerator: "F3"},
        {label: "&Consultar", click(){mainWindow.webContents.send('menu', 'order-consult')}, accelerator: "F4"}
      ]
    })
  );
  menu.append(
    new MenuItem({
      label: '&Produtos',
      submenu:[
        {label: "&Novo", click(){mainWindow.webContents.send('menu', 'product-add');}, accelerator: "F6"},
        {label: "&Consultar", click(){mainWindow.webContents.send('menu', 'product-consult')}, accelerator: "F7"}
      ]
    })
  );
  if(inArray(process.argv, "-debug"))
    menu.append(
      new MenuItem(
        {label: '&Debug',
          submenu:[
          {label: "&Refresh", accelerator: "F5", role: "Home1", click(){ mainWindow.reload()}},
          {label: "&DevTools",accelerator: "F12",click(){ mainWindow.webContents.openDevTools()}},
        ]
      })
    );

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
