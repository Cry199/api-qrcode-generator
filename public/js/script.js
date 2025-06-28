const dataInput = document.getElementById('dataInput');
const generateBtn = document.getElementById('generateBtn');
const qrCodeResult = document.getElementById('qrCodeResult');
const errorMessage = document.getElementById('errorMessage');

// Função principal para gerar o QR Code
const generateQRCode = async () => {
    const data = dataInput.value.trim();

    // Limpa mensagens e resultados anteriores
    errorMessage.textContent = '';
    qrCodeResult.src = '';
    qrCodeResult.classList.remove('fade-in');

    // Validação: verifica se o campo de texto não está vazio
    if (!data) {
        errorMessage.textContent = 'Por favor, insira um texto ou URL.';
        dataInput.focus();
        return;
    }

    // Mostra um estado de "carregando" no botão para o usuário saber que algo está acontecendo
    generateBtn.disabled = true;
    generateBtn.textContent = 'A gerar...';

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: data }),
        });

        if (!response.ok) {
            throw new Error('Falha ao comunicar com o servidor. Tente novamente.');
        }

        const result = await response.json();
        
        // Atualiza a imagem com o QR Code recebido da API
        qrCodeResult.src = result.qrCodeUrl;
        qrCodeResult.classList.add('fade-in'); // Adiciona a animação de fade-in

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