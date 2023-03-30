'use strict';
const Rent = require('../models/renta');
 
exports.findAll = function(req, res) {
  Rent.findAll(function(err, renta) {    
    if (err)
    res.send(err);
    console.log('Datos:', renta);
    res.status(200).send(renta)
  });
};

exports.create = function(req, res) { 
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Por favor proporciona todos los campos requeridos !' });
  }else{
    const renta = {
      Idpeli: req.body.Idpeli,
      NombrePeli: req.body.NombrePeli,
      cantidad: req.body.cantidad,
      PrecioUnitario: req.body.PrecioUnitario,
      Telefonos: req.body.Telefonos
    }; 
    const nuevo_renta = new Rent(renta);
    
    Rent.create(nuevo_renta, function(err, renta) {
      if (err)
      res.send(err);
      req.flash('message', 'renta Creado Correctamente !');
      res.redirect('/Renta');
    });
  }
};

exports.findById = function(req, res) {
  Rent.findById(req.params.id, function(err, renta) {
    if (err)
    res.send(err);
    res.json(renta);
  });
}; 

exports.update = function(req, res) {
 
  if(req.file != null){
    console.log("No esta vacio");
    const renta = {
        Idpeli: req.body.Idpeli,
        NombrePeli: req.body.NombrePeli,
        cantidad: req.body.cantidad,
        PrecioUnitario: req.body.PrecioUnitario,
        Telefonos: req.body.Telefonos
    }; 
    Rent.update(req.params.id, new Rent(renta), function(err, renta) {      
      req.flash('message', 'renta Actualizado Correctamente !');
      res.redirect('/Renta');
    });
 
  }else{
    console.log("Si esta vacio");
    Rent.findById(req.params.id, function(err, renta) {    
      const arenta = {
        Idpeli: req.body.Idpeli,
        NombrePeli: req.body.NombrePeli,
        cantidad: req.body.cantidad,
        PrecioUnitario: req.body.PrecioUnitario,
        Telefonos: req.body.Telefonos,
      }; 
      Rent.update(req.params.id, new Rent(arenta), function(err, arenta) {      
        req.flash('message', 'renta Actualizado Correctamente !');
        res.redirect('/Renta');
      });
    });     
  }     
};

exports.delete = function(req, res) {
    Rent.delete( req.params.id, function(err, renta) {
    req.flash('message', 'renta Eliminado Correctamente !');
    res.redirect('/Renta');
  });
};