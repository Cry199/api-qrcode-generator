const qrCodeService = require('../services/qrCode.service');

/**
 * Controlador para gerar QR Codes.
 * Recebe os dados e opções do corpo da requisição e chama o serviço para criar o QR Code.
 * @param {Object} req - Requisição Express.
 * @param {Object} res - Resposta Express.
 */
const generateQrCode = async (req, res) => {
    // Extrai 'data' e 'options' do corpo da requisição
    const { data, options } = req.body;

    try {
        // Chama o serviço para gerar o QR code, passando os dados e as opções
        const qrCodeUrl = await qrCodeService.createQrCode(data, options);
        
        // Retorna o QR code como uma URL de dados em uma resposta JSON bem-sucedida (status 200)
        res.status(200).json({
            message: 'QR Code gerado com sucesso!',
            qrCodeUrl: qrCodeUrl
        });

    } catch (error) {
        console.error('Erro ao gerar o QR Code:', error);
        res.status(500).json({ error: 'Ocorreu um erro interno ao gerar o QR Code.' });
    }
};

// Exporta a função do controller para ser usada nas rotas
module.exports = {
    generateQrCode,
};