const qrCodeService = require('../services/qrCode.service');

/**
 * Controlador para gerar QR Codes.
 * Recebe os dados e opções do corpo da requisição e chama o serviço para criar o QR Code.
 * @param {Object} req - Requisição Express.
 * @param {Object} res - Resposta Express.
 */
const generateQrCode = async (req, res) => {
    const { data, options } = req.body;

    if (!data) {
        return res.status(400).json({ error: 'O campo "data" é obrigatório no corpo da requisição.' });
    }

    try {
        const qrCodeUrl = await qrCodeService.createQrCode(data, options);
        
        res.status(200).json({
            message: 'QR Code gerado com sucesso!',
            qrCodeUrl: qrCodeUrl
        });

    } catch (error) {
        console.error('Erro ao gerar o QR Code:', error);
        res.status(500).json({ error: 'Ocorreu um erro interno ao gerar o QR Code.' });
    }
};

// Exporta a função do controller para rotas
module.exports = {
    generateQrCode,
};