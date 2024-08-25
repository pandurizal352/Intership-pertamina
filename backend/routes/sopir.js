const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Tambah data sopir
router.post('/', async (req, res) => {
  const { nama_sopir, nomer_LO } = req.body;

  try {
    const newSopir = await prisma.sopir.create({
      data: {
        nama_sopir,
        nomer_LO
      }
    });
    res.json(newSopir);
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ error: 'Error adding data', details: error.message });
  }
});

// Ambil semua data sopir
router.get('/', async (req, res) => {
  try {
    const sopir = await prisma.sopir.findMany();
    res.json(sopir);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ambil detail sopir berdasarkan ID
router.get('/search', async (req, res) => {
  const { nama } = req.query; // Mengambil parameter query 'nama'

  try {
    console.log(`Mencari sopir dengan nama: ${nama}`);

    // Mencari sopir yang sesuai dengan nama yang diberikan
    const sopir = await prisma.sopir.findMany({
      where: {
        nama_sopir: {
          contains: nama // Menggunakan 'contains' untuk pencarian yang lebih fleksibel
        }
      }
    });

    if (sopir.length > 0) {
      res.json(sopir); // Mengembalikan daftar sopir yang sesuai
    } else {
      res.status(404).json({ error: 'Sopir not found' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data', details: error.message });
  }
});

// Edit data sopir
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nama_sopir, nomer_LO } = req.body;

  try {
    const updatedSopir = await prisma.sopir.update({
      where: { id_sopir: Number(id) },
      data: {
        nama_sopir,
        nomer_LO
      }
    });
    res.json(updatedSopir);
  } catch (error) {
    res.status(500).json({ error: 'Error updating data' });
  }
});

// Hapus data sopir
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSopir = await prisma.sopir.delete({
      where: { id_sopir: Number(id) }
    });
    res.json(deletedSopir);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting data' });
  }
});

module.exports = router;
