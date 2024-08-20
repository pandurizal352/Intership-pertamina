const express = require('express');
// const pemeriksaanRouter = require('./routes/Pemeriksaan');
const usercheck = require('./routes/users');
const sopircheck = require('./routes/sopir');
const perusahaancheck = require('./routes/perusahaan');
const petugascheck = require('./routes/petugas');
var authRouter = require('./routes/auth');
const test = require('./routes/screentest');
const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";

app.use(express.json());

// Menggunakan router pemeriksaan
app.use('/auth', authRouter);
app.use('/sopir', sopircheck);
app.use('/perusahaan', perusahaancheck);
app.use('/petugas', petugascheck);
app.use('/test', test);

// app.use('/pemeriksaan', pemeriksaanRouter);
app.use('/user', usercheck);

app.listen(port, host, () => {
  console.log(`Pertamini listening on "http://${host}:${port}"`);
});

module.exports = app;