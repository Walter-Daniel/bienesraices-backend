const express = require('express');
const { db } = require('./config/db');

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

//Routing 
app.use('/', require('./routes/users.routes'));
app.use('/auth', require('./routes/auth.routes'));


//Definir el puerto
const port = 4000;

app.listen( port, () => {
    console.log(`El servido esta funcionando en el puerto ${port}`)
} )