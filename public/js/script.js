const dataInput = document.getElementById('dataInput');
const generateBtn = document.getElementById('generateBtn');
const qrCodeResult = document.getElementById('qrCodeResult');
const errorMessage = document.getElementById('errorMessage');

// Campos de personalização
const darkColorInput = document.getElementById('darkColorInput');
const lightColorInput = document.getElementById('lightColorInput');
const widthInput = document.getElementById('widthInput');


// Função principal para gerar o QR Code
const generateQRCode = async () => {
    // Pega os valores de todos os campos
    const data = dataInput.value.trim();
    const width = parseInt(widthInput.value, 10) || 256; // Garante um valor padrão
    const darkColor = darkColorInput.value;
    const lightColor = lightColorInput.value;

    // Limpa mensagens e resultados anteriores
    errorMessage.textContent = '';
    qrCodeResult.src = '';
    qrCodeResult.classList.remove('fade-in');

    // Início da Validação

    // 1. Validação do texto/URL
    if (!data) {
        errorMessage.textContent = 'Por favor, insira um texto ou URL.';
        dataInput.focus();
        return;
    }

    // 2. Validação para o tamanho do QR Code
    const minWidth = 100;
    const maxWidth = 2048;
    if (isNaN(width) || width < minWidth || width > maxWidth) {
        errorMessage.textContent = `O tamanho deve ser entre ${minWidth}px e ${maxWidth}px.`;
        widthInput.focus();
        return;
    }

    // Fim da Validação 

    // Mostra um estado de "carregando" no botão para o usuário saber que algo está acontecendo
    generateBtn.disabled = true;
    generateBtn.textContent = 'A gerar...';

    try {
        // Monta o objeto que será enviado para a API, incluindo as opções de personalização
        const requestBody = {
            data: data,
            options: {
                width: width,
                color: {
                    dark: darkColor,
                    light: lightColor,
                }
            }
        };

        // Faz a chamada (fetch) para a nossa API backend
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error('Falha ao comunicar com o servidor. Tente novamente.');
        }

        const result = await response.json();
        
        // Atualiza a imagem com o QR Code recebido da API
        qrCodeResult.src = result.qrCodeUrl;
        // Ajusta o tamanho da imagem na tela para corresponder ao solicitado
        qrCodeResult.width = width; 
        qrCodeResult.height = width;
        qrCodeResult.classList.add('fade-in');
    } catch (error) {
        errorMessage.textContent = error.message || 'Ocorreu um erro desconhecido.';
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = 'Gerar QR Code';
    }
};

// Adiciona o evento de clique ao botão para chamar nossa função
generateBtn.addEventListener('click', generateQRCode);

// Adiciona um "listener" para a tecla "Enter" no campo de texto para conveniência
dataInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        generateQRCode();
    }
});