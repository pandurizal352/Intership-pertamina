var express = require('express');
var router = express.Router();

var path = require('path');
var sopir = require('../controller/sopircontroller');



// Routes
router.get('/', sopir.getAllSopir);
router.get('/:id', sopir.getSopirId);
router.post('/',  sopir.createSopir);
router.put('/:id',  sopir.updateSopir);
router.delete('/:id', sopir.deleteSopir);

module.exports = router;