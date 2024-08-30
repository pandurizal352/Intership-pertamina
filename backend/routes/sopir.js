const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// MIddleware
const authenticateJWT = require('../middleware/authenticateJWT');
const authorizeRole = require('../middleware/authorizeRole');


// Tambah data transportir
router.post('/',authenticateJWT, async (req, res) => {
  const { nama_sopir, nomer_LO, userId } = req.body;

  try {
    const newtransportir = await prisma.transportir.create({
      data: {
        nama_sopir,
        nomer_LO,
        userId
      }
    });
    res.json(newtransportir);
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ error: 'Error adding data', details: error.message });
  }
});

// Ambil semua data transportir
router.get('/',authenticateJWT, async (req, res) => {
  try {
    const transportir = await prisma.transportir.findMany();
    res.json(transportir);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ambil detail transportir berdasarkan ID
router.get('/search',authenticateJWT, async (req, res) => {
  const { nama } = req.query; // Mengambil parameter query 'nama'

  try {
    console.log(`Mencari transportir dengan nama: ${nama}`);

    // Mencari transportir yang sesuai dengan nama yang diberikan
    const transportir = await prisma.transportir.findMany({
      where: {
        nama_sopir: {
          contains: nama // Menggunakan 'contains' untuk pencarian yang lebih fleksibel
        }
      }
    });

    if (transportir.length > 0) {
      res.json(transportir); // Mengembalikan daftar transportir yang sesuai
    } else {
      res.status(404).json({ error: 'transportir not found' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data', details: error.message });
  }
});

// Edit data transportir
router.put('/:id',authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { nomer_LO, userId } = req.body;

  try {
    // Cari user berdasarkan userId untuk mendapatkan nama_sopir
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update hanya nomer_LO berdasarkan id_transportir
    const updatedTransportir = await prisma.transportir.update({
      where: { id_sopir: Number(id) },
      data: {
        nomer_LO,
        nama_sopir: user.username,  // Gunakan nama dari user
      },
    });

    res.json(updatedTransportir);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating data', details: error.message });
  }
});

// Hapus data transportir
router.delete('/:id',authenticateJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedtransportir = await prisma.transportir.delete({
      where: { id_sopir: Number(id) }
    });
    res.json(deletedtransportir);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting data' });
  }
});

module.exports = router;