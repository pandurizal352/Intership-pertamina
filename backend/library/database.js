let mysql = require('mysql2');
//konfigurasi untuk koneksi database MySql
let connection = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '',
 database: 'intership-pertamina'
});
//Kondisi untuk mengecek database berjalan atau tidak
connection.connect(function(error){
 if(!!error){
 console.log(error);
 }else{
 console.log('Koneksi ke database MySql Berhasil!');
 }
})
module.exports = connection;
