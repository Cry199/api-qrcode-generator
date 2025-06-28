require('dotenv').config();

/**
 * Este arquivo centraliza toda a configuração da aplicação.
 * Ele lê as variáveis de ambiente e as exporta em um objeto,
 * facilitando o acesso em outras partes do código e garantindo
 * que as configurações obrigatórias estão presentes.
 */


const requiredEnvVars = ['PORT'];
for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
        throw new Error(`ERRO DE CONFIGURAÇÃO: A variável de ambiente obrigatória está em falta: ${varName}`);
    }
}

const config = {
    port: process.env.PORT || 8080,
};

module.exports = config;