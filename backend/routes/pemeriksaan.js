const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// --- Routes untuk Pemeriksaan ---

// Tambah data Pemeriksaan
router.post('/', async (req, res) => {
  const {
    id_perusahaan,
    id_petugas,
    id_sopir,
    tanggal_pemeriksaan,
    jenis_pemeriksaan,
    penjelasan,
    keterangan,
    status,
    foto,
    id_kabelListrik,
    id_bateraiAccu
  } = req.body;

  try {
    const newPemeriksaan = await prisma.pemeriksaan.create({
      data: {
        id_perusahaan,
        id_petugas,
        id_sopir,
        tanggal_pemeriksaan,
        jenis_pemeriksaan,
        penjelasan,
        keterangan,
        status,
        foto,
        id_kabelListrik,
        id_bateraiAccu
      }
    });
    res.json(newPemeriksaan);
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ error: 'Error adding data', details: error.message });
  }
});

// Ambil semua data pemeriksaan
router.get('/pemeriksaan', async (req, res) => {
  try {
    const pemeriksaan = await prisma.pemeriksaan.findMany();
    res.json(pemeriksaan);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ambil detail pemeriksaan berdasarkan ID
router.get('/pemeriksaan/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pemeriksaan = await prisma.pemeriksaan.findUnique({
      where: { id_pemeriksaan: Number(id) }
    });
    if (pemeriksaan) {
      res.json(pemeriksaan);
    } else {
      res.status(404).json({ error: 'Pemeriksaan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Edit data pemeriksaan
router.put('/pemeriksaan/:id', async (req, res) => {
  const { id } = req.params;
  const {
    id_perusahaan,
    id_petugas,
    id_sopir,
    tanggal_pemeriksaan,
    jenis_pemeriksaan,
    penjelasan,
    keterangan,
    status,
    foto,
    id_kabelListrik,
    id_bateraiAccu
  } = req.body;

  try {
    const updatedPemeriksaan = await prisma.pemeriksaan.update({
      where: { id_pemeriksaan: Number(id) },
      data: {
        id_perusahaan,
        id_petugas,
        id_sopir,
        tanggal_pemeriksaan,
        jenis_pemeriksaan,
        penjelasan,
        keterangan,
        status,
        foto,
        id_kabelListrik,
        id_bateraiAccu
      }
    });
    res.json(updatedPemeriksaan);
  } catch (error) {
    res.status(500).json({ error: 'Error updating data' });
  }
});

// Hapus data pemeriksaan
router.delete('/pemeriksaan/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPemeriksaan = await prisma.pemeriksaan.delete({
      where: { id_pemeriksaan: Number(id) }
    });
    res.json({ message: 'Berhasil Terhapus' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting data' });
  }
});

// --- Routes untuk KabelListrik ---

// Tambah data KabelListrik
router.post('/kabel-listrik', async (req, res) => {
  const {
    semua_terisolasi,
    kondisi_konduit,
    perlindungan_kabel,
    alat_listrik_tambahan,
    pemantik_dilepas
  } = req.body;

  try {
    const newKabelListrik = await prisma.kabelListrik.create({
      data: {
        semua_terisolasi,
        kondisi_konduit,
        perlindungan_kabel,
        alat_listrik_tambahan,
        pemantik_dilepas
      }
    });
    res.json(newKabelListrik);
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ error: 'Error adding data', details: error.message });
  }
});

// Ambil semua data kabel listrik
router.get('/kabel-listrik', async (req, res) => {
  try {
    const kabelListrik = await prisma.kabelListrik.findMany();
    res.json(kabelListrik);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ambil detail kabel listrik berdasarkan ID
router.get('/kabel-listrik/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const kabelListrik = await prisma.kabelListrik.findUnique({
      where: { id: Number(id) }
    });
    if (kabelListrik) {
      res.json(kabelListrik);
    } else {
      res.status(404).json({ error: 'KabelListrik not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Edit data kabel listrik
router.put('/kabel-listrik/:id', async (req, res) => {
  const { id } = req.params;
  const {
    semua_terisolasi,
    kondisi_konduit,
    perlindungan_kabel,
    alat_listrik_tambahan,
    pemantik_dilepas
  } = req.body;

  try {
    const updatedKabelListrik = await prisma.kabelListrik.update({
      where: { id: Number(id) },
      data: {
        semua_terisolasi,
        kondisi_konduit,
        perlindungan_kabel,
        alat_listrik_tambahan,
        pemantik_dilepas
      }
    });
    res.json(updatedKabelListrik);
  } catch (error) {
    res.status(500).json({ error: 'Error updating data' });
  }
});

// Hapus data kabel listrik
router.delete('/kabel-listrik/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedKabelListrik = await prisma.kabelListrik.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Berhasil Terhapus' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting data' });
  }
});

// --- Routes untuk BateraiAccu ---

// Tambah data BateraiAccu
router.post('/baterai-accu', async (req, res) => {
  const {
    accuBawahtanki,
    Posisiaccu,
    accuIsolator,
    bukanLogam
  } = req.body;

  try {
    const newBateraiAccu = await prisma.bateraiAccu.create({
      data: {
        accuBawahtanki,
        Posisiaccu,
        accuIsolator,
        bukanLogam
      }
    });
    res.json(newBateraiAccu);
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ error: 'Error adding data', details: error.message });
  }
});

// Ambil semua data baterai accu
router.get('/baterai-accu', async (req, res) => {
  try {
    const bateraiAccu = await prisma.bateraiAccu.findMany();
    res.json(bateraiAccu);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ambil detail baterai accu berdasarkan ID
router.get('/baterai-accu/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const bateraiAccu = await prisma.bateraiAccu.findUnique({
      where: { id: Number(id) }
    });
    if (bateraiAccu) {
      res.json(bateraiAccu);
    } else {
      res.status(404).json({ error: 'BateraiAccu not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Edit data baterai accu
router.put('/baterai-accu/:id', async (req, res) => {
  const { id } = req.params;
  const {
    accuBawahtanki,
    Posisiaccu,
    accuIsolator,
    bukanLogam
  } = req.body;

  try {
    const updatedBateraiAccu = await prisma.bateraiAccu.update({
      where: { id: Number(id) },
      data: {
        accuBawahtanki,
        Posisiaccu,
        accuIsolator,
        bukanLogam
      }
    });
    res.json(updatedBateraiAccu);
  } catch (error) {
    res.status(500).json({ error: 'Error updating data' });
  }
});

// Hapus data baterai accu
router.delete('/baterai-accu/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBateraiAccu = await prisma.bateraiAccu.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Berhasil Terhapus' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting data' });
  }
});

module.exports = router;
