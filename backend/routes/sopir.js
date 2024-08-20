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
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const sopir = await prisma.sopir.findUnique({
      where: { id_sopir: Number(id) }
    });
    if (sopir) {
      res.json(sopir);
    } else {
      res.status(404).json({ error: 'Sopir not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
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
