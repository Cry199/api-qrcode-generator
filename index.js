const express = require('express');
const cors = require('cors');

// --- Importações para o Swagger ---
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/swagger');

// --- Importações para o Rate Limiter ---
const rateLimit = require('express-rate-limit');

// Configura o middleware de limite de requisições
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100, 
	standardHeaders: true, 
	legacyHeaders: false, 
    message: { error: 'Muitos pedidos enviados a partir deste IP, por favor tente novamente após 15 minutos.' }
});

async function startServer() {
    try {
        console.log("[Inicialização 1/4] Carregando configuração...");
        const config = require('./src/config/config'); 

        console.log("[Inicialização 2/4] Carregando rotas...");
        const qrCodeRoutes = require('./src/routes/qrCode.routes');

        const app = express();

        app.set('trust proxy', 1);
        
        app.use(cors());
        app.use(express.json());
        app.use(express.static('public'));

        // Aplica o middleware de limite de requisições a todas as rotas da API
        app.use('/api', apiLimiter);

        // --- Configuração da Rota do Swagger UI ---
        // A documentação interativa ficará disponível em /api-docs
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        console.log("[Inicialização 3/4] Documentação da API disponível em /api-docs");

        // --- Rotas da API ---
        app.use('/api', qrCodeRoutes);

        app.get('/', (req, res) => {
            res.send('<h1>API Gerador de QR Code</h1><p>Acesse a <a href="/api-docs">documentação da API</a> para mais detalhes.</p>');
        });

        console.log(`[Inicialização 4/4] Configurando o servidor para escutar na porta ${config.port}...`);
        app.listen(config.port, () => {
            console.log(`--- SUCESSO! O servidor está online na porta ${config.port} ---`);
        });

    } catch (error) {
        console.error("### ERRO FATAL AO INICIAR O SERVIDOR ###");
        console.error(error);
        process.exit(1);
    }
}

startServer();