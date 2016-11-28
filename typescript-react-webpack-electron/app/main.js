const {app, Tray, Menu, BrowserWindow} = require('electron');
const path = require('path');

const iconPath = path.join(__dirname, 'icon.png');
let appIcon = null;
let win = null;

app.on('ready', function(){
  win = new BrowserWindow({
  	width: 500, 
  	height: 600, 
  	icon: iconPath
  });
  win.loadURL(__dirname + '/index.html');

  win.on('minimize',function(event){
        event.preventDefault()
            win.hide();
    });

  win.on('close', function (event) {
        
           if( !app.isQuiting){
            event.preventDefault()
            win.hide();
        }
        return false;
    });

win.setMenu(null);
  appIcon = new Tray(iconPath);
  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show',    
      click: function() {
        win.show();        
      }
    },
    { label: 'Quit',
      click:  function(){
            app.isQuiting = true;
            app.quit();
        }
    }
  ]);
  appIcon.setToolTip('Todo App');
  appIcon.setContextMenu(contextMenu);
});