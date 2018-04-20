var electron = require('electron')

electron.app.on('ready', function () {
  var mainWindow = new electron.BrowserWindow({
    width:                      1100,
    height:                      505,
    center:                     true,
    frame:                     false,
    resizable:                 false,
    title:                  'keyseq',
    icon:             './keyseq.png',
    backgroundColor:       '#FFFFFF',
    darkTheme:                  true,
    nativeWindowOpen:           true
  })
  mainWindow.loadURL('file://' + __dirname + '/index.html')
})
