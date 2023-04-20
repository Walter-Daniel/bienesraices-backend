const express = require('express');
const { db } = require('./config/db');
const cors =  require('cors')

//Crear el server
const app = express();

//Conexión a la base de datos
( async function dbConnection(){
    try {
        await db.authenticate();
        console.log('Conexión correcta a la base de datos')
    } catch (error) {
        console.log(error)
    }
})();

//CORS
app.use(cors())

//Directorio Público
app.use( express.static('public') )

//Routing 
app.use('/', require('./routes/users.routes'));
app.use('/api/auth', require('./routes/auth.routes'));


//Definir el puerto
const port = 4000;

app.listen( port, () => {
    console.log(`El servido esta funcionando en el puerto ${port}`)
} )