const express = require('express');

async function startServer() {
    try {
        // Teste
    } catch (error) {
        console.error("### ERRO FATAL AO INICIAR O SERVIDOR ###");
        console.error(error);
        process.exit(1);
    }
}

startServer();