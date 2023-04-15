'use strict';
const Peli = require('../models/peliculas');

exports.findAll = function(req, res) {
  Peli.findAll(function(err, peliculas) {    
    if (err)
    res.send(err);
    console.log('Datos:', peliculas);
    res.status(200).send(peliculas)
  });
};

exports.create = function(req, res) { 
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Por favor proporciona todos los campos requeridos !' });
  }else{
    const peliculas = {
      Idpeliculas : req.body.Idpeliculas,
      NombrePeliculas : req.body.NombrePeliculas,
      existencias: req.body.existencias,
      precioPeliculas: req.body.precioPeliculas,
      Idproveedor: req.body.Idproveedor,
      img: req.file.filename 
    }; 
  
    const nuevo_peliculas = new Peli(peliculas);
    
    Peli.create(nuevo_peliculas, function(err, peliculas) {
      if (err)
      res.send(err);
      req.flash('message', 'Peli Creado Correctamente !');
      res.redirect('/');
    });
  }
}; 
exports.findById = function(req, res) {
  Peli.findById(req.params.id, function(err, peliculas) {
    if (err)
    res.send(err);
    res.json(peliculas);
  });
}; 
exports.update = function(req, res) {

  if(req.file != null){
    console.log("No esta vacio");
    const peliculas = {
      Idpeliculas : req.body.Idpeliculas,
      NombrePeliculas : req.body.NombrePeliculas,
      existencias: req.body.existencias,
      precioPeliculas: req.body.precioPeliculas,
      Idproveedor: req.body.Idproveedor,
      img: req.file.filename 
    }; 

    Peli.update(req.params.id, new Peli(peliculas), function(err, peliculas) {      
      req.flash('message', 'Peli Actualizado Correctamente !');
      res.redirect('/');
    });

  }else{

    console.log("Si esta vacio");

    Peli.findById(req.params.id, function(err, peliculas) {    
      const key = "img";
      const value = peliculas[0].img;
      const apeliculas = {
        Idpeliculas : req.body.Idpeliculas,
        NombrePeliculas : req.body.NombrePeliculas,
        existencias: req.body.existencias,
        precioPeliculas: req.body.precioPeliculas,
        Idproveedor: req.body.Idproveedor,
        [key]: value, 
      }; 

      Peli.update(req.params.id, new Peli(apeliculas), function(err, apeliculas) {      
        req.flash('message', 'Peli Actualizado Correctamente !');
        res.redirect('/');
      });
    });     
  }    
};

exports.delete = function(req, res) {
  Peli.delete( req.params.id, function(err, peliculas) {
    req.flash('message', 'Peli Eliminado Correctamente !');
    res.redirect('/');
  });
};