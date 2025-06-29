const express = require('express');
const router = express.Router();

const qrCodeController = require('../controllers/qrCode.controller');
const { validateQrCodeRequest } = require('../validators/qrCode.validator');

/**
 * @swagger
 * tags:
 *   - name: QRCode
 *     description: Endpoint para geração de QR Codes
 *
 * components:
 *   schemas:
 *     QRCodeRequest:
 *       type: object
 *       required:
 *         - data
 *       properties:
 *         data:
 *           type: string
 *           description: O texto ou URL para codificar no QR Code.
 *           example: "https://www.google.com"
 *         options:
 *           type: object
 *           description: Opções de customização para o QR Code.
 *           properties:
 *             width:
 *               type: integer
 *               description: A largura do QR Code em pixels (min 100, max 2048 ).
 *               example: 300
 *             color:
 *               type: object
 *               properties:
 *                 dark:
 *                   type: string
 *                   description: A cor do QR Code em formato hexadecimal.
 *                   example: "#000000"
 *                 light:
 *                   type: string
 *                   description: A cor do fundo em formato hexadecimal.
 *                   example: "#FFFFFF"
 *     QRCodeSuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "QR Code gerado com sucesso!"
 *         qrCodeUrl:
 *           type: string
 *           format: uri
 *           description: A URL de dados (Data URL) da imagem do QR Code.
 *           example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA..."
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           example: ["\"data\" é um campo obrigatório."]
 *
 * paths:
 *   /api/generate:
 *     post:
 *       summary: Gera um novo QR Code customizável
 *       tags: [QRCode]
 *       requestBody:
 *         required: true
 *         description: Objeto contendo os dados e as opções para o QR Code.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QRCodeRequest'
 *       responses:
 *         '200':
 *           description: QR Code gerado com sucesso.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/QRCodeSuccessResponse'
 *         '400':
 *           description: Erro de validação nos dados de entrada.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         '500':
 *           description: Erro interno do servidor.
 */
router.post('/generate', validateQrCodeRequest, qrCodeController.generateQrCode);

// Exporta o router (index.js)
module.exports = router;
