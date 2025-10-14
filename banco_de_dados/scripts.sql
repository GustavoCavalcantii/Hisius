create database hisius_bd;

use hisius_bd;

-- Tabela Usuario
CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    deletado bool default false,
    nivel_acesso INT NOT NULL DEFAULT 1,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela Paciente
CREATE TABLE Paciente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    telefone VARCHAR(20),
    sexo ENUM('MASCULINO', 'FEMININO') NULL,
    data_nascimento DATE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT fk_usuario_paciente
        FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
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
        ON UPDATE CASCADE
);
CREATE TABLE eventos_fila (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    fila ENUM('triagem', 'atendimento') NOT NULL,
    entrou_em DATETIME NOT NULL,
    iniciou_em DATETIME NULL,
    CONSTRAINT fk_eventos_fila_paciente
        FOREIGN KEY (paciente_id) REFERENCES Paciente(id)
        ON DELETE CASCADE
);

-- Tabela de estatísticas diárias (o "produto final" para a API)
CREATE TABLE estatisticas_fila (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `data` DATE NOT NULL,
    fila ENUM('triagem', 'atendimento') NOT NULL,
    tempo_medio_espera_minutos INT NOT NULL,
    pico_demanda INT NULL,
    total_atendidos INT NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_data_fila (`data`, fila)
);

-- Tabela Relatorio
CREATE TABLE Relatorio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    atendimento_id INT NOT NULL,
    tempo_medio TEXT NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_relatorio_atendimento FOREIGN KEY (atendimento_id) REFERENCES Atendimento(id)
);

-- Índice para performance
CREATE INDEX idx_eventos_fila_entrou_em ON eventos_fila(entrou_em);