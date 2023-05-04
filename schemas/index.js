//Crear modelos luego hacer las relaciones. Archivo central con las diferentes asociaciones

const Category = require('./Category.schema');
const Estate = require('./Estate.schema');
const Price = require('./Price.schema');
const User = require('./User.schema');

//Una propiedad tiene un precio
// Price.hasOne( Estate );
Estate.belongsTo( Price );

//Una propiedad tiene una Categoría
Estate.belongsTo( Category );

//Una propiedad tiene un Propietario
Estate.belongsTo( User );

//Importa los modelos y sus respectivas relaciones
module.exports = {
    Category,
    Estate,
    Price,
    User
}