var express = require('express');
var router = express.Router();

var path = require('path');
var petugas = require('../controller/petugascontroller');



// Routes
router.get('/', petugas.getAllPetugas);
router.get('/:id', petugas.getPetugasId);
router.post('/',  petugas.createPetugas);
router.put('/:id',  petugas.updatePetugas);
router.delete('/:id', petugas.deletePetugas);

module.exports = router;