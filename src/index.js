const{app, BrowserWindow, Menu } = require('electron');

const url = require('url');
const path = require('path')

if (process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname,'../node_modules', '.bin', 'electron' )
    })  
}


let mainWindow
let newProductWindow

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

function creadNewProductWindows(){
    newProductWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Add a new prodcut'
    })
    newProductWindow.setMenu(null);
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-product.html'),
        protocol: 'file',
        slashes: true
    }))

    newProductWindow.on('close', () => {
        newProductWindow = null;
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
                    creadNewProductWindows()
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