var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser'); // Menambahkan middleware body-parser

// Mengimpor router dari masing-masing route
const usercheck = require('./routes/users');
const sopircheck = require('./routes/sopir');
const perusahaancheck = require('./routes/perusahaan');
const petugascheck = require('./routes/petugas');
var authRouter = require('./routes/auth');
const test = require('./routes/screentest');
// const pemeriksaanRouter = require('./routes/Pemeriksaan');

var app = express();
const PORT = process.env.PORT || 5000; // Mendefinisikan PORT
const HOST = process.env.HOST || 'localhost'; // Mendefinisikan HOST

// Middleware CORS untuk mengizinkan permintaan dari domain lain
app.use(cors({
  origin: 'http://localhost:3000', // Gantilah ini dengan domain frontend Anda jika berbeda
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode HTTP yang diizinkan
  allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
  credentials: true // Jika Anda memerlukan pengelolaan kredensial seperti cookies
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // Middleware untuk parsing body dari request menjadi JSON

// Menggunakan router dari setiap route yang telah diimpor
app.use('/auth', authRouter);
app.use('/sopir', sopircheck);
app.use('/perusahaan', perusahaancheck);
app.use('/petugas', petugascheck);
app.use('/test', test);
// app.use('/pemeriksaan', pemeriksaanRouter);
app.use('/user', usercheck);

// Penanganan error global untuk keseluruhan aplikasi
app.use((err, req, res, next) => {
    console.error('Global error handler:', err.message);
    res.status(500).json({ error: 'Something went wrong' });
});

// Mendaftarkan aplikasi Express untuk mendengarkan permintaan pada PORT tertentu
app.listen(PORT, HOST, () => {
    console.log(`Pertamini listening on "http://${HOST}:${PORT}"`);
});

module.exports = app;
