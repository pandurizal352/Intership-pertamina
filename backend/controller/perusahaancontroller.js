var fs = require('fs');
var path = require('path');
var connection = require('../library/database');

/**
 * INDEX perusahaan
 */
const getAllPerusahaan = function (req, res) {
    connection.query('SELECT * FROM perusahaan', function (err, rows) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({
                data: rows
            });
        }
    });
};

const getPerusahaanId = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM perusahaan WHERE id_perusahaan = ?', [id], function (err, rows) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({
                data: rows
            });
        }
    });
};

const createPerusahaan = function (req, res) {
    let tanggal_cek_fisik = req.body.tanggal_cek_fisik;
    let nomor_polisi = req.body.nomor_polisi;
    let nama_perusahaan = req.body.nama_perusahaan;
    let errors = false;

    if (!tanggal_cek_fisik) {
        errors = true;
        res.json({ pesan: 'Field tanggal cek fisik belum diisi, Field harus diisi dengan lengkap' });
    }

    if (!nomor_polisi) {
        errors = true;
        res.json({ pesan: 'Field nomor polisi belum diisi, Field harus diisi dengan lengkap' });
    }

    if (!nama_perusahaan) {
        errors = true;
        res.json({ pesan: 'Field nama perusahaan belum diisi, Field harus diisi dengan lengkap' });
    }

    if (!errors) {
        let formData = {
            tanggal_cek_fisik: tanggal_cek_fisik,
            nomor_polisi: nomor_polisi,
            nama_perusahaan: nama_perusahaan
        };

        connection.query('INSERT INTO perusahaan SET ?', formData, function (err, result) {
            if (err) {
                res.json({ pesan: 'Data gagal disimpan' });
            } else {
                res.send('Data Berhasil Disimpan!');
            }
        });
    }
};

const updatePerusahaan = function (req, res) {
    let id = req.params.id;
    let tanggal_cek_fisik = req.body.tanggal_cek_fisik;
    let nomor_polisi = req.body.nomor_polisi;
    let nama_perusahaan = req.body.nama_perusahaan;
    let errors = false;

    if (!tanggal_cek_fisik) {
        errors = true;
        res.json({ pesan: 'Field tanggal cek fisik belum diisi, Field harus diisi dengan lengkap' });
        return;
    }

    if (!nomor_polisi) {
        errors = true;
        res.json({ pesan: 'Field nomor polisi belum diisi, Field harus diisi dengan lengkap' });
        return;
    }

    if (!nama_perusahaan) {
        errors = true;
        res.json({ pesan: 'Field nama perusahaan belum diisi, Field harus diisi dengan lengkap' });
        return;
    }

    let formData = {
        tanggal_cek_fisik: tanggal_cek_fisik,
        nomor_polisi: nomor_polisi,
        nama_perusahaan: nama_perusahaan
    };

    connection.query('UPDATE perusahaan SET ? WHERE id_perusahaan = ?', [formData, id], function (err, result) {
        if (err) {
            res.json({ error: err });
        } else {
            res.send('Data Berhasil Diupdate!');
        }
    });
};

const deletePerusahaan = function (req, res) {
    let id = req.params.id;

    connection.query('DELETE FROM perusahaan WHERE id_perusahaan = ?', [id], function (err, result) {
        if (err) {
            res.json({ error: err });
        } else {
            res.send('Data berhasil dihapus!');
        }
    });
};

module.exports = {
    getAllPerusahaan,
    getPerusahaanId,
    createPerusahaan,
    updatePerusahaan,
    deletePerusahaan
};
