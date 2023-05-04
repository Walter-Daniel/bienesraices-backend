const { exit } = require('node:process')
const categories = require('./category');
const prices = require('./price');
const { Price, Category } = require('../schemas/index');
const { db } = require('../config/db');

 const importData = async() => {
    try {
        //Autenticar
        await db.authenticate();

        //Generar las columnas
        await db.sync();

        //Insertar los datos
        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate( prices )
        ]);
        console.log('Datos importados correctamente');
        //Finaliza la ejecución del código y es correcto
        exit(0);
        
    } catch (error) {
        console.log(error)
        //Finaliza la ejecución del código y exite un error
        exit(1);
    }
 };

//Eliminar Datos
const deleteData = async() => {
    try {
        await db.sync({ force: true })
        //otra opcipon para la eliminación de datos
        // await Promise.all([
        //     Category.destroy({ where: {}, truncate: true }),
        //     Price.destroy({ where: {}, truncate: true })
        // ])
        console.log('Datos eliminados correctamente');
        exit(0);
    } catch (error) {
        console.log(error)
        exit(1);
    }
}

 //Pasar argumento a un comando desde la terminal
 if ( process.argv[2] === "-i" ) {
    importData();
 }
 if ( process.argv[2] === "-d" ) {
    deleteData();
 }