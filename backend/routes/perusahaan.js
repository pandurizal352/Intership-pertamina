var express = require('express');
var router = express.Router();

var path = require('path');
var perusahaan = require('../controller/perusahaancontroller');



// Routes
router.get('/', perusahaan.getAllPerusahaan);
router.get('/:id', perusahaan.getPerusahaanId);
router.post('/',  perusahaan.createPerusahaan);
router.put('/:id',  perusahaan.updatePerusahaan);
router.delete('/:id', perusahaan.deletePerusahaan);

module.exports = router;