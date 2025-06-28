const Joi = require('joi');

/**
 * Schema de validação para a geração de QR Code.
 * @param {Object} req - Requisição Express contendo os dados e opções para gerar o QR Code.
 * @param {Object} res - Resposta Express para enviar erros de validação.
 * @param {Function} next - Função para passar o controle para o próximo middleware.
 * @module qrCode.validator
 */

const qrCodeGenerationSchema = Joi.object({
    // 'data' é obrigatório e deve ser uma string não vazia.
    data: Joi.string().min(1).required().messages({
        'string.base': `"data" deve ser um texto.`,
        'string.empty': `"data" não pode ser vazio.`,
        'any.required': `"data" é um campo obrigatório.`
    }),
    
    // 'options' é um objeto opcional.
    options: Joi.object({
        // 'width' é opcional, deve ser um número inteiro entre 100 e 2048.
        width: Joi.number().integer().min(100).max(2048).messages({
            'number.min': `"width" deve ser no mínimo 100.`,
            'number.max': `"width" deve ser no máximo 2048.`
        }),

        // 'color' é um objeto opcional com regras para 'dark' e 'light'.
        color: Joi.object({
            // 'dark' e 'light' são opcionais e devem ser um código de cor hexadecimal.
            dark: Joi.string().pattern(/^#[0-9a-fA-F]{6}$/).messages({
                'string.pattern.base': `"dark" deve ser um código de cor hexadecimal válido (ex: #000000).`
            }),
            light: Joi.string().pattern(/^#[0-9a-fA-F]{6}$/).messages({
                'string.pattern.base': `"light" deve ser um código de cor hexadecimal válido (ex: #FFFFFF).`
            }),
        })
    }).optional() // Torna o objeto 'options' inteiro opcional.
});

// Cria um middleware para validar o corpo da requisição usando o schema definido.
const validateQrCodeRequest = (req, res, next) => {
    // Valida o req.body contra o schema
    const { error } = qrCodeGenerationSchema.validate(req.body, { abortEarly: false });

    // Se houver erros de validação...
    if (error) {
        // Mapeia os detalhes do erro para uma lista de mensagens
        const errorMessages = error.details.map(detail => detail.message);
        // Retorna um status 400 (Bad Request) com a lista de erros.
        return res.status(400).json({ errors: errorMessages });
    }

    // Se a validação passar, continua para o próximo middleware (o controller).
    next();
};

module.exports = {
    validateQrCodeRequest
};