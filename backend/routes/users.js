var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();



const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    // Mengambil data Sopir dengan relasi role
    const sopirUsers = await prisma.sopir.findMany({
      include: { role: true }
    });

    // Mengambil data Petugas dengan relasi role
    const petugasUsers = await prisma.petugas.findMany({
      include: { role: true }
    });

    // Gabungkan data Sopir dan Petugas ke dalam satu array
    const users = [
      ...sopirUsers.map(user => ({
        id: user.id_sopir,
        nama: user.nama_sopir,
        username: user.username,
        role: user.role.name,
        type: 'sopir' // Menandakan bahwa ini adalah data sopir
      })),
      ...petugasUsers.map(user => ({
        id: user.id_petugas,
        nama: user.nama_petugas,
        username: user.username,
        role: user.role.name,
        type: 'petugas' // Menandakan bahwa ini adalah data petugas
      }))
    ];

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
