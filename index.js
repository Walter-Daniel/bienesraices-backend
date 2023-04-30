const express = require('express');
const { db } = require('./config/db');
const cors =  require('cors')

//Crear el server
const app = express();

//Habilitar lectura y parseo del body
app.use(express.json());

//Habilitar lectura de datos formulario
app.use( express.urlencoded({ extended:true }) );

//Conexión a la base de datos
( async function dbConnection(){
    try {
        await db.authenticate();
        db.sync()
        console.log('Conexión correcta a la base de datos')
    } catch (error) {
        console.log(error)
    }
})();

//CORS
app.use(cors());

//Directorio Público
app.use( express.static('public') )

//Routing 
app.use('/', require('./routes/users.routes'));
app.use('/api/houses', require('./routes/houses.routes'));
app.use('/api/auth', require('./routes/auth.routes'));


//Definir el puerto
const port = 4000;

app.listen( port, () => {
    console.log(`El servido esta funcionando en el puerto ${port}`)
})