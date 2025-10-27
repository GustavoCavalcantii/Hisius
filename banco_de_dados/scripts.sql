create database hisius_bd;

use hisius_bd;


-- Tabela Eventos da Fila
CREATE TABLE fila_eventos (
	id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    fila_id CHAR(36) NOT NULL,
    fila ENUM('triagem', 'atendimento') NOT NULL,
    entrou_em DATETIME NOT NULL,
    iniciou_em DATETIME NULL,
    CONSTRAINT fk_fila_paciente FOREIGN KEY (paciente_id) REFERENCES Paciente(id)
);

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
    cpf VARCHAR(14) UNIQUE NULL,
    telefone VARCHAR(20) NULL,
    sexo ENUM('MASCULINO', 'FEMININO') NULL,
	numero_cns VARCHAR(20) NULL,
    telefone_emergencia VARCHAR(20) NULL,
    nome_mae VARCHAR(100) NULL,
    data_nascimento DATE NULL,
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

-- Tabela Atendimento
CREATE TABLE Atendimento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    descricao TEXT NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_atendimento_usuario FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

-- Tabela Registro (Log)
CREATE TABLE Registro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    descricao TEXT NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_registro_usuario FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

-- Tabela Relatorio
CREATE TABLE Relatorio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    atendimento_id INT NOT NULL,
    tempo_medio TEXT NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_relatorio_atendimento FOREIGN KEY (atendimento_id) REFERENCES Atendimento(id)
);