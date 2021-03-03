/* Logico_v3: */

CREATE TABLE Paciente (
    ID_PACIENTE char(32) PRIMARY KEY,
    IC_SEXO Char,
    AA_NASCIMENTO char(4),
    CD_CEPREDUZIDO varchar(5),
    CD_PAIS varchar(2),
    CD_UF varchar(2),
    CD_MUNICIPIO varchar(50)
);

CREATE TABLE Exame (
    DE_RESULTADO varchar(1000),
    DT_COLETA varchar(24),
    DE_EXAME varchar(200),
    DE_ORIGEM varchar(200),
    ID_EXAME int(20) not null AUTO_INCREMENT,
    fk_Atendimento_ID_ATENDIMENTO char(32),
    fk_Analito_DE_ANALITO varchar(200),
    PRIMARY KEY(ID_EXAME)
);

CREATE TABLE Desfecho (
    DT_DESFECHO varchar(12),
    DE_DESFECHO varchar(100),
    DT_ATENDIMENTO varchar(12),
    DE_TIPO_ATENDIMENTO varchar(100),
    fk_Atendimento_ID_ATENDIMENTO char(32),
    fk_Clinica_ID_CLINICA numeric
);

CREATE TABLE Atendimento (
    ID_ATENDIMENTO char(32) PRIMARY KEY,
    fk_Paciente_ID_PACIENTE char(32)
);

CREATE TABLE Clinica (
    ID_CLINICA numeric PRIMARY KEY,
    DE_CLINICA varchar(100)
);

CREATE TABLE Analito (
    DE_ANALITO varchar(100) PRIMARY KEY,
    DE_VALOR_REFERENCIA varchar(25),
    CD_UNIDADE varchar(25)
);
 
ALTER TABLE Exame ADD CONSTRAINT FK_Exame_2
    FOREIGN KEY (fk_Atendimento_ID_ATENDIMENTO)
    REFERENCES Atendimento (ID_ATENDIMENTO)
    ON DELETE CASCADE;
 
ALTER TABLE Exame ADD CONSTRAINT FK_Exame_3
    FOREIGN KEY (fk_Analito_DE_ANALITO)
    REFERENCES Analito (DE_ANALITO)
    ON DELETE RESTRICT;
 
ALTER TABLE Desfecho ADD CONSTRAINT FK_Desfecho_1
    FOREIGN KEY (fk_Atendimento_ID_ATENDIMENTO)
    REFERENCES Atendimento (ID_ATENDIMENTO)
    ON DELETE CASCADE;
 
ALTER TABLE Desfecho ADD CONSTRAINT FK_Desfecho_2
    FOREIGN KEY (fk_Clinica_ID_CLINICA)
    REFERENCES Clinica (ID_CLINICA)
    ON DELETE RESTRICT;
 
ALTER TABLE Atendimento ADD CONSTRAINT FK_Atendimento_2
    FOREIGN KEY (fk_Paciente_ID_PACIENTE)
    REFERENCES Paciente (ID_PACIENTE)
    ON DELETE RESTRICT;