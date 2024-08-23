const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
