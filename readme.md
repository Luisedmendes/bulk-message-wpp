# 📲 WhatsApp Sender

Um projeto simples em **Node.js (JavaScript puro)** para envio automático de mensagens no **WhatsApp**.  
Não necessita de build ou transpiler — basta instalar as dependências e rodar.

---

## ✨ Funcionalidade

- Lê uma lista de contatos a partir de um arquivo **Excel (`.xlsx`)**.  
- Utiliza a biblioteca [`whatsapp-web.js`](https://github.com/pedroslopez/whatsapp-web.js) para automatizar o envio.  
- Cada contato recebe a mensagem personalizada definida no arquivo Excel.  

---

## 📂 Estrutura esperada do Excel (`CONTPREV.xlsx`)

O arquivo deve estar na raiz do projeto (ou em `assets/CONTPREV.xlsx` se for empacotado com `pkg`).  

Colunas esperadas:

| TELEFONE   | MENSAGEM              |
|------------|------------------------|
| 1199999999 | Olá, tudo bem? 👋      |
| 2198888888 | Promoção exclusiva 🎉  |

> 📌 Obs.: O número de telefone deve estar no formato **DDD + número**, sem espaços ou caracteres especiais.  

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) >= 16  
- Conta do WhatsApp conectada ao celular  

---

## 🚀 Como rodar

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
