const express = require('express');
const router = express.Router();

const qrCodeController = require('../controllers/qrCode.controller');

/**
 * @route   POST /api/generate
 * @desc    Gera um QR Code
 * @access  Public
 */
router.post('/generate', qrCodeController.generateQrCode);

// Exporta o router (index.js)
module.exports = router;