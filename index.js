const express = require('express');

//Crear el serverS
const app = express();

//Routing 
app.use('/', require('./routes/users.routes'));
app.use('/auth', require('./routes/auth.routes'));


//Definir el puerto
const port = 4000;

app.listen( port, () => {
    console.log(`El servido esta funcionando en el puerto ${port}`)
} )