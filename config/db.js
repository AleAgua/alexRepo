'use strict';
const mysql = require('mysql');
const con = mysql.createConnection({
  host     : '34.222.130.2', // Host
  user     : 'univar',       // Usuario 
  password : 'Univar98.',    // Password  
  database : 'db0122110087'  // Base de datos 
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Conectado a la Base de Datos !");
}); 
module.exports = con;