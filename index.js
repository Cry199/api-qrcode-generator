const express = require('express');
const cors = require('cors');

/**
 * Função principal para iniciar o servidor.
 * Ela é assíncrona para permitir operações de inicialização
 * que possam demorar, como conectar a um banco de dados.
 */
async function startServer() {
    try {
        // Etapa 1: Carregar a configuração centralizada
        console.log("[Inicialização 1/3] Carregando configuração...");
        const config = require('./src/config/config');

        // Etapa 2: Carregar rotas e serviços
        console.log("[Inicialização 2/3] Carregando rotas...");
        const qrCodeRoutes = require('./src/routes/qrCode.routes');

        // Cria uma instância do aplicativo Express
        const app = express();
        
        // Middlewares 
        app.use(cors());
        app.use(express.json());
        app.use(express.static('public'));

        // Rotas da API
        app.use('/api', qrCodeRoutes);

        // Rota raiz para uma mensagem de boas-vindas
        app.get('/', (req, res) => {
            res.send('<h1>API Gerador de QR Code</h1><p>Use o endpoint <code>POST /api/generate</code> para criar um QR Code.</p>');
        });

        // Etapa 3: Iniciar o servidor
        console.log(`[Inicialização 3/3] Configurando o servidor para escutar na porta ${config.port}...`);
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