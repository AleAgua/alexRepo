const mongoose = require('mongoose');
const provSchema = mongoose.Schema({
    NombreProoveedor: {
        type: String,
        required: true
    },
    Telefono:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Proveedores', provSchema);













