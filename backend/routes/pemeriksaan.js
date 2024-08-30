// routes/pemeriksaanRouter.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client'); // Gunakan PrismaClient dari '@prisma/client'
const prisma = new PrismaClient(); // Buat instance baru PrismaClient

// Create Pemeriksaan
router.post('/', async (req, res) => {
  const {
    userId,
    tanggal_pemeriksaan,
    nama_perusahaan,
    kapasitas_tangki,
    nomor_polisi,
    masa_berlakustnk,
    masa_berlakupajak,
    sim_Amt1,
    sim_Amt2,
    masa_berlakutera,
    t2_depan,
    t2_tengah1,
    t2_tengah2,
    t2_belakang,
    masa_berlakukeur,
    umur_tangki,
    safety_switch,
    kabellistrik1,
    kabellistrik2,
    kabellistrik3,
    kabellistrik4,
    kabellistrik5,
    Batteraiaccu1,
    Batteraiaccu2,
    Batteraiaccu3,
    Batteraiaccu4,
    temuan,
 
    Verifikasi
  } = req.body;

  try {
    const pemeriksaan = await prisma.pemeriksaan.create({
      data: {
        userId,
        tanggal_pemeriksaan,
        nama_perusahaan,
        kapasitas_tangki,
        nomor_polisi,
        masa_berlakustnk,
        masa_berlakupajak,
        sim_Amt1,
        sim_Amt2,
        masa_berlakutera,
        t2_depan,
        t2_tengah1,
        t2_tengah2,
        t2_belakang,
        masa_berlakukeur,
        umur_tangki,
        safety_switch,
        kabellistrik1,
        kabellistrik2,
        kabellistrik3,
        kabellistrik4,
        kabellistrik5,
        Batteraiaccu1,
        Batteraiaccu2,
        Batteraiaccu3,
        Batteraiaccu4,
        temuan,
     
        Verifikasi,
      },
    });
    res.status(201).json(pemeriksaan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read Pemeriksaan
router.get('/', async (req, res) => {
  try {
    const pemeriksaan = await prisma.pemeriksaan.findMany();
    res.status(200).json(pemeriksaan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pemeriksaan = await prisma.pemeriksaan.findUnique({
      where: { id_pemeriksaan: parseInt(id) },
    });
    if (pemeriksaan) {
      res.status(200).json(pemeriksaan);
    } else {
      res.status(404).json({ message: 'Pemeriksaan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Pemeriksaan
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const pemeriksaan = await prisma.pemeriksaan.update({
      where: { id_pemeriksaan: parseInt(id) },
      data: updates,
    });
    res.status(200).json(pemeriksaan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Pemeriksaan
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pemeriksaan = await prisma.pemeriksaan.delete({
      where: { id_pemeriksaan: parseInt(id) },
    });
    res.status(200).json({ message: 'Pemeriksaan berhasi dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
