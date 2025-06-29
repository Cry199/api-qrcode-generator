# API QR Code Generator

Uma API RESTful para gerar QR Codes de forma rápida e personalizável. Esta API permite que você crie QR Codes a partir de dados fornecidos, com opções de customização como nível de correção de erro, tipo de imagem, qualidade, margem e cores.

## Funcionalidades

- Geração de QR Codes a partir de texto ou URLs.
- Opções de personalização avançadas (cores, margem, qualidade da imagem).
- API RESTful de fácil integração.
- Documentação interativa com Swagger.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework web para Node.js.
- **qrcode**: Biblioteca para geração de QR Codes.
- **Swagger/OpenAPI**: Para documentação e teste da API.
- **Docker**: Para conteinerização da aplicação.




## Configuração e Instalação

Para configurar e executar este projeto localmente, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)
- Docker (opcional, para execução via contêiner)

### Instalação

1.  Clone o repositório:

    ```bash
    git clone https://github.com/Cry199/api-qrcode-generator.git
    cd api-qrcode-generator
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
PORT=8080
```

- `PORT`: A porta na qual a API será executada. O valor padrão é `8080`.

### Executando a Aplicação

#### Localmente

```bash
npm start
```

A API estará disponível em `http://localhost:8080` (ou na porta que você configurou).

#### Com Docker

1.  Construa a imagem Docker:

    ```bash
    docker build -t api-qrcode-generator .
    ```

2.  Execute o contêiner Docker:

    ```bash
    docker run -p 8080:8080 api-qrcode-generator
    ```

A API estará disponível em `http://localhost:8080` (mapeada para a porta 8080 do contêiner).




## Uso da API

A API expõe um endpoint para a geração de QR Codes. A documentação completa e interativa da API está disponível via Swagger.

### Documentação Swagger

Após iniciar a aplicação, acesse a documentação Swagger em:

`http://localhost:8080/api-docs`

### Endpoint de Geração de QR Code

- **URL:** `/api/qrcode`
- **Método:** `POST`
- **Content-Type:** `application/json`

#### Corpo da Requisição (Exemplo)

```json
{
  "data": "https://www.example.com",
  "options": {
    "errorCorrectionLevel": "H",
    "type": "image/png",
    "quality": 0.92,
    "margin": 1,
    "color": {
      "dark": "#000000",
      "light": "#FFFFFF"
    }
  }
}
```

#### Parâmetros do Corpo da Requisição

- `data` (obrigatório, string): Os dados a serem codificados no QR Code (URL, texto, etc.).
- `options` (opcional, objeto): Opções de customização para o QR Code. As propriedades incluem:
    - `errorCorrectionLevel` (string, padrão: `'H'`): Nível de correção de erro. Valores possíveis: `'L'`, `'M'`, `'Q'`, `'H'`.
    - `type` (string, padrão: `'image/png'`): Tipo de imagem de saída. Valores possíveis: `'image/png'`, `'image/jpeg'`, `'image/webp'`.
    - `quality` (número, padrão: `0.92`): Qualidade da imagem (para JPEG e WebP). Valor entre `0` e `1`.
    - `margin` (número, padrão: `1`): Margem em torno do QR Code.
    - `color` (objeto): Cores do QR Code.
        - `dark` (string, padrão: `'#000000'`): Cor dos módulos escuros (formato hexadecimal).
        - `light` (string, padrão: `'#FFFFFF'`): Cor dos módulos claros (formato hexadecimal).

#### Resposta (Sucesso - 200 OK)

```json
{
  "message": "QR Code gerado com sucesso!",
  "qrCodeUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

- `qrCodeUrl`: Uma Data URL contendo a imagem do QR Code gerado. Você pode usar esta URL diretamente em tags `<img>` em HTML ou para download.




## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

