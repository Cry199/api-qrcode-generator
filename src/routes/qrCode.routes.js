const express = require('express');
const router = express.Router();

const qrCodeController = require('../controllers/qrCode.controller');
const { validateQrCodeRequest } = require('../validators/qrCode.validator');

/**
 * @route   POST /api/generate
 * @desc    Gera um QR Code
 * @access  Public
 */
router.post('/generate', validateQrCodeRequest, qrCodeController.generateQrCode);

// Exporta o router (index.js)
module.exports = router;