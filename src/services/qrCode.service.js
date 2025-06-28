const QRCode = require('qrcode');

/**
 * Cria um QR Code a partir dos dados fornecidos.
 * @param {string} data - Os dados para codificar no QR Code (URL, texto, etc.).
 * @param {object} optionsFromRequest - Opções de customização para o QR Code (opcional).
 * @returns {Promise<string>} Uma Promise que resolve com a URL de dados (Data URL) do QR Code gerado.
 */
const createQrCode = async (data, optionsFromRequest = {}) => {
    try {
        const defaultOptions = {
            errorCorrectionLevel: 'H',
            type: 'image/png',
            quality: 0.92,
            margin: 1,
            color: {
                dark: "#000000",  
                light: "#FFFFFF"
            }
        };

        // Mescla as opções padrão com as opções enviadas na requisição.
        // As opções da requisição sobrescrevem as padrão, se fornecidas.
        const finalOptions = { 
            ...defaultOptions, 
            ...optionsFromRequest,
            color: {
                ...defaultOptions.color,
                ...(optionsFromRequest.color || {})
            }
        };

        // Gera o QR Code como uma Data URL (string em base64)
        const qrCodeDataURL = await QRCode.toDataURL(data, finalOptions);
        
        return qrCodeDataURL;
    } catch (err) {
        console.error('Falha ao criar o QR Code no serviço:', err);
        throw new Error('Falha na geração do QR Code.');
    }
};

// Exporta a função do serviço para o controller
module.exports = {
    createQrCode,
};