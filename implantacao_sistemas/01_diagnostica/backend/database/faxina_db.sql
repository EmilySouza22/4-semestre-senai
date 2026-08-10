CREATE DATABASE IF NOT EXISTS faxina_db;
USE faxina_db;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    login VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    endereco VARCHAR(150),
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profissionais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    especialidade VARCHAR(50),
    disponivel BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    profissional_id INT NOT NULL,
    tipo_servico ENUM('residencial', 'comercial') NOT NULL,
    data_servico DATE NOT NULL,
    horario TIME NOT NULL,
    status ENUM('agendado', 'concluido', 'cancelado') NOT NULL DEFAULT 'agendado',
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_agendamento_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    CONSTRAINT fk_agendamento_profissional FOREIGN KEY (profissional_id) REFERENCES profissionais(id)
);

INSERT INTO usuarios (nome, login, senha) VALUES
('Ana Souza', 'ana.souza', '$2a$10$8kQhZ1n0pQfV6t1LxWZ8UeYQ1rM8s9xJmC5r3vLb0k7hQwYtN2fGa'),
('Carlos Lima', 'carlos.lima', '$2a$10$3hR9d2m1oNfE7v2MxYA9VfZR2sN9t0yKnD6s4wMc1l8iRxZuO3gHb'),
('Marcos Ribeiro', 'marcos.ribeiro', '$2a$10$5jS0e3n2pOgF8w3NyZB0WgAS3tO0u1zLoE7t5xNd2m9jSyAvP4hIc');

INSERT INTO clientes (nome, telefone, email, endereco) VALUES
('João Pereira', '(48) 99999-1111', 'joao.pereira@email.com', 'Rua das Flores, 123'),
('Maria Costa', '(48) 99999-2222', 'maria.costa@email.com', 'Av. Beira Mar, 456'),
('Empresa XYZ Ltda', '(48) 3333-3333', 'contato@xyz.com', 'Rua Comercial, 789');

INSERT INTO profissionais (nome, telefone, especialidade, disponivel) VALUES
('Fernanda Alves', '(48) 98888-1111', 'Residencial', TRUE),
('Roberto Dias', '(48) 98888-2222', 'Comercial', TRUE),
('Patrícia Gomes', '(48) 98888-3333', 'Residencial e Comercial', FALSE);

INSERT INTO agendamentos (cliente_id, profissional_id, tipo_servico, data_servico, horario, status) VALUES
(1, 1, 'residencial', '2026-08-15', '09:00:00', 'agendado'),
(2, 2, 'residencial', '2026-08-16', '14:00:00', 'agendado'),
(3, 3, 'comercial', '2026-08-17', '08:00:00', 'agendado');