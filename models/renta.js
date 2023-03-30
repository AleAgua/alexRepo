'use strict';
var conexion = require('../config/db');

var Rent = function(renta){

  this.NombrePeli = renta.NombrePeli;
  this.cantidad    = renta.cantidad;
  this.PrecioUnitario = renta.PrecioUnitario;
  this.Telefonos     = renta.Telefonos;

};

Rent.create = function (newEmp, result) {
  conexion.query("INSERT INTO renta set ?", newEmp, function (err, res) {
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

Rent.findById = function (id, result) {
  conexion.query("Select * from renta where IdRenta = ? ", id, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
  });
};

Rent.findAll = function (result) {
  conexion.query("Select * from renta", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
  });
}; 

Rent.update = function(id, renta, result){
  conexion.query("UPDATE renta SET NombrePeli=?,cantidad=?,PrecioUnitario=?,Telefonos=? WHERE IdRenta = ?", [renta.NombrePeli,renta.cantidad,renta.PrecioUnitario,renta.Telefonos, id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }else{
      result(null, res);
    }
  });
}; 

Rent.delete = function(id, result){
  conexion.query("DELETE FROM renta WHERE IdRenta = ?", [id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
  });
};
module.exports = Rent;