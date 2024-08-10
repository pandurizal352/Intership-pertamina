var fs = require('fs');
var path = require('path');
var connection = require('../library/database');

/**
 * INDEX sopir
 */
const getAllSopir = function (req, res) {
    connection.query('SELECT * FROM sopir', function (err, rows) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({
                data: rows
            });
        }
    });
};

const getSopirId = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM sopir WHERE id_sopir = ?', [id], function (err, rows) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({
                data: rows
            });
        }
    });
};

const createSopir = function (req, res) {
    let nama_sopir = req.body.nama_sopir;
    let nomer_LO = req.body.nomer_LO;
    let errors = false;

    if (!nama_sopir) {
        errors = true;
        res.json({ pesan: 'Field nama sopir belum diisi, Field harus diisi dengan lengkap' });
    }

    if (!nomer_LO) {
        errors = true;
        res.json({ pesan: 'Field nomer LO belum diisi, Field harus diisi dengan lengkap' });
    }

    if (!errors) {
        let formData = {
            nama_sopir: nama_sopir,
            nomer_LO: nomer_LO
        };

        connection.query('INSERT INTO sopir SET ?', formData, function (err, result) {
            if (err) {
                res.json({ pesan: 'Data gagal disimpan' });
            } else {
                res.send('Data Berhasil Disimpan!');
            }
        });
    }
};

const updateSopir = function (req, res) {
    let id = req.params.id;
    let nama_sopir = req.body.nama_sopir;
    let nomer_LO = req.body.nomer_LO;
    let errors = false;

    if (!nama_sopir) {
        errors = true;
        res.json({ pesan: 'Field nama sopir belum diisi, Field harus diisi dengan lengkap' });
        return;
    }

    if (!nomer_LO) {
        errors = true;
        res.json({ pesan: 'Field nomer LO belum diisi, Field harus diisi dengan lengkap' });
        return;
    }

    let formData = {
        nama_sopir: nama_sopir,
        nomer_LO: nomer_LO
    };

    connection.query('UPDATE sopir SET ? WHERE id_sopir = ?', [formData, id], function (err, result) {
        if (err) {
            res.json({ error: err });
        } else {
            res.send('Data Berhasil Diupdate!');
        }
    });
};

const deleteSopir = function (req, res) {
    let id = req.params.id;

    connection.query('DELETE FROM sopir WHERE id_sopir = ?', [id], function (err, result) {
        if (err) {
            res.json({ error: err });
        } else {
            res.send('Data berhasil dihapus!');
        }
    });
};

module.exports = {
    getAllSopir,
    getSopirId,
    createSopir,
    updateSopir,
    deleteSopir
};
