const express = require('express');
const provSchema = require('../models/proveedor');
const router = express.Router();

router.post('/', (req, res) =>{
    const prov  = provSchema(req.body);
    prov
        .save()
        .then((data) => res.redirect('/provin'))
        .catch((error) => res.json({message: error}));
});

router.get('/', (req, res) =>{
    provSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

router.get('/:id', (req, res) =>{
    const { id } = req.params;
    provSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

router.post('/:id', (req, res) =>{
    const { id } = req.params;
    const {NombreProoveedor, Telefono } = req.body;
    provSchema
        .updateOne({ _id: id }, {$set : {NombreProoveedor, Telefono}})
        .then((data) => res.redirect('/provin'))
        .catch((error) => res.json({message: error}));
});

router.post('/eliminar/:id', (req, res) =>{
    const { id } = req.params;
    provSchema
        .deleteOne({ _id: id })
        .then((data) => res.redirect('/provin'))
        .catch((error) => res.json({message: error}));
});


module.exports = router;