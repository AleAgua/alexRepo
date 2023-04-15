'use strict';
var conexion = require('../config/db');

var Peli = function(peliculas){

  this.NombrePeliculas = peliculas.NombrePeliculas;
  this.existencias     = peliculas.existencias;
  this.precioPeliculas = peliculas.precioPeliculas;
  this.Idproveedor     = peliculas.Idproveedor;
  this.img        = peliculas.img;
};

Peli.create = function (newEmp, result) {
  conexion.query("INSERT INTO peliculas set ?", newEmp, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Peli.findById = function (id, result) {
  conexion.query("Select * from peliculas where Idpeliculas = ? ", id, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
  });
};

Peli.findAll = function (result) {
  conexion.query("Select * from peliculas", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
  });
}; 

Peli.update = function(id, peliculas, result){
  conexion.query("UPDATE peliculas SET NombrePeliculas=?,existencias=?,precioPeliculas=?,Idproveedor=?,img=? WHERE Idpeliculas = ?", [peliculas.NombrePeliculas,peliculas.existencias,peliculas.precioPeliculas,peliculas.Idproveedor,peliculas.img, id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }else{
      result(null, res);
    }
  });
}; 

Peli.delete = function(id, result){
  conexion.query("DELETE FROM peliculas WHERE Idpeliculas = ?", [id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
  });
};
module.exports = Peli;