const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// MIddleware
const authenticateJWT = require('../middleware/authenticateJWT');
const authorizeRole = require('../middleware/authorizeRole');


// Tambah data Perusahaan
router.post('/',authenticateJWT, async (req, res) => {
  const { tanggal_cek_fisik,
    nomor_polisi,
    nama_perusahaan, id_user } = req.body;

  try {
    const newPerusahaan = await prisma.perusahaan.create({
      data: {
        tanggal_cek_fisik,
        nomor_polisi,
        nama_perusahaan,
        id_user
      }
    });
    res.json(newPerusahaan);
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ error: 'Error adding data', details: error.message });
  }
});

// Ambil semua data perusahaan
router.get('/',authenticateJWT, async (req, res) => {
  try {
    const perusahaan = await prisma.perusahaan.findMany();
    res.json(perusahaan);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ambil detail perusahaan berdasarkan ID
router.get('/:id',authenticateJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const perusahaan = await prisma.perusahaan.findUnique({
      where: { id_perusahaan: Number(id) }
    });
    if (perusahaan) {
      res.json(perusahaan);
    } else {
      res.status(404).json({ error: 'perusahaan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Edit data perusahaan
router.put('/:id',authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const {  tanggal_cek_fisik,
    nomor_polisi,
    nama_perusahaan } = req.body;

  try {
    const updatedSopir = await prisma.perusahaan.update({
      where: { id_perusahaan: Number(id) },
      data: {
        tanggal_cek_fisik,
        nomor_polisi,
        nama_perusahaan
      }
    });
    res.status(200).json({Message:"Berhasil Terupdate"});
  } catch (error) {
    res.status(500).json({ error: 'Error updating data' });
  }
});

// Hapus data perusahaan
router.delete('/:id',authenticateJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPerusahaan = await prisma.perusahaan.delete({
      where: { id_perusahaan: Number(id) }
    });
    res.status(200).json({Message:"Berhasil Terhapus"});
  } catch (error) {
    res.status(500).json({ error: 'Error deleting data' });
  }
});

module.exports = router;
