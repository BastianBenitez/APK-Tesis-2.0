//importacion de los elementos de la libreria electron.
const{app, BrowserWindow, Menu } = require('electron');

//importacion de las librerias relacionadas con las direccion de los elemntos de las pagina.
const url = require('url');
const path = require('path')

//importacion de las librerias para poder realizar las consualtas a las base de datos.
const mysql = require('mysql');

//coneccion con la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb',
  port: '3308'
});

//verificar si la coneccion a la base de datos existe.
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
    // Puedes realizar consultas y otras operaciones aquí
  }
});

//consulta a la base de datos.
connection.query('SELECT * FROM cargos', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
    } else {
      console.log('Resultados:', results);
      // Puedes procesar los resultados de la consulta aquí
    }
  });
  
//----Creacion de las pagina web----

if (process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname,'../node_modules', '.bin', 'electron' )
    })  
}

//declaracion de variables globales
let mainWindow
let newWindow

//condicional para verificar si la app esta lista y poder lanzar la vista ppincipal de la app
app.on('ready', () => {
    mainWindow = new BrowserWindow({})
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))

    const mainMenu = Menu.buildFromTemplate(templateMenu);

    //cambio de los templates o menus superior de la app
    Menu.setApplicationMenu(mainMenu);
    mainWindow.on('close', ()=>{
        app.quit()
    })
});

//funcion encargada de crear un ventana anexa(puede ser quitada en un futuro)
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

//declaracion de los parametros de los templates 
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

// verificar si la se esta en una fase de produccion y mostrar las herramientas de desarrollo.
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