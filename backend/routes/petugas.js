const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Tambah data petugas
router.post('/', async (req, res) => {
  const { nomor_petugas,
    nama_petugas, userId } = req.body;

  try {
    const newPetugas = await prisma.petugas.create({
      data: {
        nomor_petugas,
        nama_petugas,
        userId
      }
    });
    res.json(newPetugas);
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ error: 'Error adding data', details: error.message });
  }
});

// Ambil semua data petugas
router.get('/', async (req, res) => {
  try {
    const petugas = await prisma.petugas.findMany();
    res.json(petugas);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ambil detail petugas berdasarkan ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const petugas = await prisma.petugas.findUnique({
      where: { id_petugas: Number(id) }
    });
    if (petugas) {
      res.json(petugas);
    } else {
      res.status(404).json({ error: 'petugas not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Edit data petugas
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {    nomor_petugas,
    nama_petugas } = req.body;

  try {
    const updatedPetugas = await prisma.petugas.update({
      where: { id_petugas: Number(id) },
      data: {
        nomor_petugas,
        nama_petugas
      }
    });
    res.status(200).json({Message:"Berhasil Terupdate"});
  } catch (error) {
    res.status(500).json({ error: 'Error updating data' });
  }
});

// Hapus data petugas
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedpetugas = await prisma.petugas.delete({
      where: { id_petugas: Number(id) }
    });
    res.status(200).json({Message:"Berhasil Terhapus"});
  } catch (error) {
    res.status(500).json({ error: 'Error deleting data' });
  }
});

module.exports = router;
