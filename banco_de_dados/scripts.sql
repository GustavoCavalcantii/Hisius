create database hisius_bd;

use hisius_bd;

-- Tabela Usuario
CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    telefone VARCHAR(20),
    sexo ENUM('MASCULINO', 'FEMININO') NULL,
    data_nascimento DATE,
    nivel_acesso INT NOT NULL DEFAULT 0,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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