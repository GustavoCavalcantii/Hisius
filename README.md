# Hisius

O projeto consiste em uma plataforma que melhora a transparência na comunicação com os pacientes sobre o tempo de espera e otimiza a gestão das filas hospitalares. A aplicação busca reduzir a ansiedade e os conflitos gerados pela superlotação, evitar que o pré-cadastro seja realizado no local e auxiliar na organização do hospital, permitindo identificar pontos que demandam maior atenção.

## ✅ Funcionalidades
- Registro de pacientes
- Controle de status de atendimento
- Relatórios de espera
- Relatórios de demanda

## 🚀 Tecnologias
- [GitHub](https://github.com/)

### Backend (API)

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)

### Frontend
#### Web
- [Vite](https://vitejs.dev/)

#### Mobile
- [React Native](https://reactnative.dev/) 
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## 📂 Estrutura do Projeto
```bash
hisius/
├─ banco_de_dados/ 
│   ├─ scripts.sql
├─ codigo_fonte/
│   ├─ backend/
│   │   ├─ src/
│   │   │  ├─ controllers/    # Lógica de controle da API (ex: User, Status)
│   │   │  ├─ database/       # Conexão, models e configuração do Sequelize
│   │   │  ├─ middlewares/    # Middlewares globais
│   │   │  ├─ routes.ts       # Rotas principais
│   │   │  └─ server.ts       # Inicialização do servidor
│   │   ├─ .env.example       # Variáveis de ambiente de exemplo
│   │   ├─ package.json       # Dependências do backend
│   │   └─ tsconfig.json      # Configuração do TypeScript
│   └─ frontend/
│       ├─ mobile/     
│       └─ web/
├─ demonstracao/ # Vídeo de demonstracao 
├─ documentacao/
└─ README.md
```

## 🖥️ Instalação
### ⚡ Backend
```bash
cd codigo_fonte/backend
npm install
cp .env.example .env      # Configure as variáveis de ambiente
npm run dev               # Inicia o servidor em modo desenvolvimento
```

### 🌐 Frontend
```bash
cd codigo_fonte/frontend
npm install
npm run dev
```
## 🔧 Configuração
- No backend, ajuste o arquivo **.env** com:

    - Credenciais do banco de dados
    - Porta do servidor


- No frontend, configure **.env** com URLs da API

## 👤 Autores 
- Gabriel Estevão Gonçalves Amaro 
- Giuliane Ferreira Rodrigues 
- Guilherme De Carvalho Guedes 
- Gustavo Cavalcanti Leite 
- João Pedro Costa Souza 

## 🏷️ Licença 

```bash
Este projeto está licenciado sob a licença do CPS - ETEC ERMELINDA GIANNINI TEIXEIRA. 

Código Fonte sob licença APACHE 2.0 

Elementos Visuais sob Creative Commons By
```