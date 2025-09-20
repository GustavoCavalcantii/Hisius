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
│   ├─ scripts.sql            # Scripts SQL para criação e populamento do banco
├─ codigo_fonte/
│   ├─ backend/
│   │   ├─ src/
│   │   │  ├─ config/         # Configurações globais da aplicação (ex.: logger, env)
│   │   │  ├─ controllers/    # Lógica de controle da API (ex.: UserController, StatusController)
│   │   │  ├─ database/       # Conexão, models e configuração do Sequelize
│   │   │  ├─ decorators/     # Decorators customizados (ex.: validações)
│   │   │  ├─ dtos/           # Data Transfer Objects (DTOs) para requests
│   │   │  ├─ enums/          # Enumerações usadas na aplicação
│   │   │  ├─ interfaces/     # Interfaces TypeScript
│   │   │  ├─ middlewares/    # Middlewares globais da aplicação
│   │   │  ├─ routes/         # Arquivos de rotas organizados por módulo
│   │   │  ├─ service/        # Regras de negócio e serviços
│   │   │  ├─ utils/          # Funções utilitárias e helpers
│   │   │  ├─ routes.ts       # Rotas principais da aplicação
│   │   │  └─ server.ts       # Inicialização do servidor
│   │   ├─ swagger/
│   │   │  ├─ paths/          # Documentação Swagger dos endpoints
│   │   │  ├─ schemas/        # Schemas reutilizáveis da documentação
│   │   │  └─ index.ts        # Integração dos arquivos Swagger
│   │   ├─ .env.example       # Exemplo de variáveis de ambiente
│   │   ├─ package.json       # Dependências e scripts do backend
│   │   └─ tsconfig.json      # Configuração do TypeScript
│   └─ frontend/
│       ├─ mobile/            
│       └─ web/               
├─ demonstracao/              # Vídeo ou material de demonstração
├─ documentacao/              # Documentação geral do projeto
└─ README.md                  # README principal do projeto
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
