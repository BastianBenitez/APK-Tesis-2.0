const{app, BrowserWindow, Menu } = require('electron');

const url = require('url');
const path = require('path')

if (process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname,'../node_modules', '.bin', 'electron' )
    })  
}


let mainWindow
let newWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({})
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))

    const mainMenu = Menu.buildFromTemplate(templateMenu);

    Menu.setApplicationMenu(mainMenu);
    mainWindow.on('close', ()=>{
        app.quit()
    })
});

function createNewWindows(){
    newWindow = new BrowserWindow({
        title: 'Add a new prodcut',
        width: 556
    })
    //newWindow.setMenu(null);
    newWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/Add-info.html'),
        protocol: 'file',
        slashes: true
    }))

    newWindow.on('close', () => {
        newWindow = null;
    })
}

const templateMenu = [
    {
        label: 'File',
        submenu:[
            {
                label: 'Agregar ',
                accelerator: 'Ctrl+N',
                click(){
                    createNewWindows()
                }
            },
            {
                label: 'Editar informacion',
                accelerator: 'Ctrl+E',
                click(){
                    
                }
            },
            {
                label: 'Eliminar informacion',
                accelerator: 'Ctrl+D',
                click(){
                    
                }
            }
        ]
    },
    {
        label: 'Consultas'
    }
];


if (process.env.NODE_ENV !== ' production'){
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide Dev Toils',
                accelerator: 'Ctrl+A',
                click(item, focusedwindows){
                    focusedwindows.toggleDevTools()
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}