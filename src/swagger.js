const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Gerador de QR Code',
    version: '1.0.0',
    description: 'Uma API RESTful simples para gerar QR Codes customizáveis. A API permite definir o tamanho e as cores do QR Code.',
    contact: {
      name: 'Cauã Ribeiro',
    },
  },
  servers: [
    {
      url: `/api`,
      description: 'Servidor de Desenvolvimento'
    }
  ]
};

const options = {
  swaggerDefinition,
  // O caminho para os arquivos que contêm as anotações do Swagger (nossas rotas)
  apis: ['./src/routes/*.js'],
};

// Gera a especificação do Swagger
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;