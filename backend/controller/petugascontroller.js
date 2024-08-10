var fs = require('fs');
var path = require('path');
var connection = require('../library/database');

/**
 * INDEX petugas
 */
const getAllPetugas = function (req, res) {
    connection.query('SELECT * FROM petugas', function (err, rows) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({
                data: rows
            });
        }
    });
};

const getPetugasId = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM petugas WHERE id_petugas = ?', [id], function (err, rows) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({
                data: rows
            });
        }
    });
};

const createPetugas = function (req, res) {
    let nomor_petugas = req.body.nomor_petugas;
    let nama_petugas = req.body.nama_petugas;
    let errors = false;

    if (!nomor_petugas) {
        errors = true;
        res.json({ pesan: 'Field nomor petugas belum diisi, Field harus diisi dengan lengkap' });
    }

    if (!nama_petugas) {
        errors = true;
        res.json({ pesan: 'Field nama petugas belum diisi, Field harus diisi dengan lengkap' });
    }

    if (!errors) {
        let formData = {
            nomor_petugas: nomor_petugas,
            nama_petugas: nama_petugas
        };

        connection.query('INSERT INTO petugas SET ?', formData, function (err, result) {
            if (err) {
                res.json({ pesan: 'Data gagal disimpan' });
            } else {
                res.send('Data Berhasil Disimpan!');
            }
        });
    }
};

const updatePetugas = function (req, res) {
    let id = req.params.id;
    let nomor_petugas = req.body.nomor_petugas;
    let nama_petugas = req.body.nama_petugas;
    let errors = false;

    if (!nomor_petugas) {
        errors = true;
        res.json({ pesan: 'Field nomor petugas belum diisi, Field harus diisi dengan lengkap' });
        return;
    }

    if (!nama_petugas) {
        errors = true;
        res.json({ pesan: 'Field nama petugas belum diisi, Field harus diisi dengan lengkap' });
        return;
    }

    let formData = {
        nomor_petugas: nomor_petugas,
        nama_petugas: nama_petugas
    };

    connection.query('UPDATE petugas SET ? WHERE id_petugas = ?', [formData, id], function (err, result) {
        if (err) {
            res.json({ error: err });
        } else {
            res.send('Data Berhasil Diupdate!');
        }
    });
};

const deletePetugas = function (req, res) {
    let id = req.params.id;

    connection.query('DELETE FROM petugas WHERE id_petugas = ?', [id], function (err, result) {
        if (err) {
            res.json({ error: err });
        } else {
            res.send('Data berhasil dihapus!');
        }
    });
};

module.exports = {
    getAllPetugas,
    getPetugasId,
    createPetugas,
    updatePetugas,
    deletePetugas
};
