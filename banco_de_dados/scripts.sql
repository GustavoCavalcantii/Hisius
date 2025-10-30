create database hisius;
use hisius;

-- Tabela Usuario
CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    deletado BOOLEAN DEFAULT FALSE,
    nivel_acesso INT NOT NULL DEFAULT 1,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_usuario_email (email),
    INDEX idx_usuario_deletado (deletado),
    INDEX idx_usuario_nivel_acesso (nivel_acesso)
);

-- Tabela Gerente
CREATE TABLE gerente (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    codigo_hospital VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    
    INDEX idx_codigo_hospital (codigo_hospital),
    INDEX idx_data_criacao (data_criacao),
    INDEX idx_data_atualizacao (data_atualizacao)
);

-- Tabela Paciente
CREATE TABLE Paciente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    sexo ENUM('MASCULINO', 'FEMININO') NOT NULL,
    numero_cns VARCHAR(20) NOT NULL,
    telefone_emergencia VARCHAR(20) NOT NULL,
    nome_mae VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_usuario_paciente
        FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    
    INDEX idx_paciente_cpf (cpf),
    INDEX idx_paciente_usuario_id (usuario_id),
    INDEX idx_paciente_data_nascimento (data_nascimento)
);

-- Tabela Eventos da Fila
CREATE TABLE fila_eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    fila_id CHAR(36) NOT NULL,
    fila ENUM('triagem', 'atendimento') NOT NULL,
    entrou_em DATETIME NOT NULL,
    iniciou_em DATETIME NULL,
    
    CONSTRAINT fk_fila_paciente 
        FOREIGN KEY (paciente_id) REFERENCES Paciente(id),
    
    INDEX idx_fila_eventos_paciente (paciente_id),
    INDEX idx_fila_eventos_fila (fila),
    INDEX idx_fila_eventos_entrou_em (entrou_em),
    INDEX idx_fila_eventos_fila_id (fila_id),
    INDEX idx_fila_eventos_fila_status (fila, iniciou_em)
);



-- Tabela Token 
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_usuario
        FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    
    INDEX idx_refresh_tokens_token (token),
    INDEX idx_refresh_tokens_usuario (usuario_id),
    INDEX idx_refresh_tokens_data_criacao (data_criacao)
);

-- Tabela Atendimento 
CREATE TABLE Atendimento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,  -- Profissional que registrou
    paciente_id INT NOT NULL,
    
    data_entrada DATETIME NOT NULL,
    data_atendimento DATETIME NOT NULL,
    data_alta DATETIME,
    
    prioridade ENUM('imediato', 'muito urgente','urgente','pouco urgente','não urgente') NOT NULL,
    
    -- Dados Clínicos Relevantes
    queixa_principal VARCHAR(500) NOT NULL,
    historico_doenca_atual TEXT,
    alergias TEXT,
    medicamentos_uso TEXT,
    
    -- Achados do Atendimento
    diagnostico_principal VARCHAR(500),
    diagnosticos_secundarios TEXT,
    procedimentos_realizados TEXT,
    
    -- Destino do Paciente
    destino ENUM(
        'alta',
        'internacao', 
        'observacao_24h',
        'transferencia',
        'obito',
        'fugiu'
    ) DEFAULT 'alta',
    
    -- Encaminhamentos
    encaminhamento_para VARCHAR(300),
    observacoes_alta TEXT, 
    
    -- Status do Registro (para controle interno)
    status ENUM('rascunho', 'finalizado', 'cancelado') DEFAULT 'finalizado',
    
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (paciente_id) REFERENCES Paciente(id),
    
    INDEX idx_paciente_data (paciente_id, data_atendimento),
    INDEX idx_destino (destino),
    INDEX idx_prioridade_data (prioridade, data_atendimento)
);

-- Tabela Registro (Log)
CREATE TABLE Registro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    acao VARCHAR(100) NOT NULL, 
    modulo VARCHAR(50) NOT NULL,
    ip_origem VARCHAR(45) NULL, 
    user_agent TEXT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_registro_usuario 
        FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    
    INDEX idx_registro_data (data_criacao),
    INDEX idx_registro_acao (acao),
    INDEX idx_registro_modulo (modulo),
    INDEX idx_registro_usuario_data (usuario_id, data_criacao)
);