const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const authenticateJWT = require('../middleware/authenticateJWT');
const authorizeRole = require('../middleware/authorizeRole');

const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
  const { username, password, role = "user", nama_perusahaan } = req.body; 

  try {
    // Cek apakah username sudah ada
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username Kurang Unik" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Validate role
    const roleData = await prisma.role.findFirst({ where: { name: role } });
    if (!roleData) {
      return res.status(400).json({ error: "Invalid role" });
    }

    // Buat user baru
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        roleId: roleData.id,
        nama_perusahaan, // Simpan nama_perusahaan
      },
    });

    // Cek atau buat entri perusahaan
    let existingPerusahaan = await prisma.perusahaan.findFirst({
      where: { nama_perusahaan }
    });

    if (!existingPerusahaan) {
      await prisma.perusahaan.create({
        data: {
          id_user: user.id,
          nama_perusahaan
        }
      });
    } else {
      // Menghindari pembaruan jika `id_user` sudah ada
      await prisma.perusahaan.update({
        where: { id_perusahaan: existingPerusahaan.id_perusahaan },
        data: {
          // Update hanya field lain yang boleh diupdate
          tanggal_cek_fisik: existingPerusahaan.tanggal_cek_fisik,
          nomor_polisi: existingPerusahaan.nomor_polisi
        }
      });
    }

    res.status(201).json({ message: "Registrasi berhasil", id: user.id, username: user.username, role: roleData.name, nama_perusahaan: user.nama_perusahaan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan saat registrasi." });
  }
});
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Use include to fetch the role data
    const user = await prisma.user.findUnique({
      where: { username },
      include: { role: true , perusahaan: true} // Include role data
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user.id, role: user.role.name }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, username: user.username, role: user.role.name, nama_perusahaan: user.nama_perusahaan  } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




module.exports = router;
