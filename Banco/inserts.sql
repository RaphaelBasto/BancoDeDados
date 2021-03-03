LOAD DATA local INFILE 'HSL_Pacientes_3.csv' INTO TABLE Paciente
FIELDS TERMINATED BY '|' LINES TERMINATED BY '\n'  IGNORE 1 LINES
(@col1,@col2,@col3,@col4,@col5,@col6,@col7) set ID_PACIENTE = @col1,
IC_SEXO = @col2, AA_NASCIMENTO = @col3, CD_PAIS = @col4, CD_UF = @col5, CD_MUNICIPIO = @col6, CD_CEPREDUZIDO = @col7 ;


LOAD DATA local INFILE 'HSL_Desfechos_3.csv' INTO TABLE Clinica
FIELDS TERMINATED BY '|' LINES TERMINATED BY '\n'  IGNORE 1 LINES
(@col1,@col2,@col3,@col4,@col5,@col6,@col7,@col8) set ID_CLINICA=@col5,DE_CLINICA=@col6 ;

LOAD DATA local INFILE 'HSL_Desfechos_3.csv' INTO TABLE Atendimento
FIELDS TERMINATED BY '|' LINES TERMINATED BY '\n'  IGNORE 1 LINES
(@col1,@col2,@col3,@col4,@col5,@col6,@col7,@col8) set ID_ATENDIMENTO=@col2, fk_Paciente_ID_PACIENTE=@col1 ;


LOAD DATA local INFILE 'HSL_Exames_3.csv' INTO TABLE Atendimento
FIELDS TERMINATED BY '|' LINES TERMINATED BY '\n'  IGNORE 1 LINES
(@col1,@col2,@col3,@col4,@col5,@col6,@col7,@col8, @col9) set ID_ATENDIMENTO=@col2, fk_Paciente_ID_PACIENTE=@col1 ;

LOAD DATA local INFILE 'HSL_Desfechos_3.csv' INTO TABLE Desfecho
FIELDS TERMINATED BY '|' LINES TERMINATED BY '\n'  IGNORE 1 LINES
(@col1,@col2,@col3,@col4,@col5,@col6,@col7,@col8) set DT_DESFECHO=@col7,DE_DESFECHO=@col8, DT_ATENDIMENTO=@col3, 
DE_TIPO_ATENDIMENTO = @col4, fk_Atendimento_ID_ATENDIMENTO = @col2, fk_Clinica_ID_CLINICA = @col5;

LOAD DATA local INFILE 'HSL_Exames_3.csv' INTO TABLE Analito
FIELDS TERMINATED BY '|' LINES TERMINATED BY '\n'  IGNORE 1 LINES
(@col1,@col2,@col3,@col4,@col5,@col6,@col7,@col8, @col9) set DE_ANALITO=@col6, DE_VALOR_REFERENCIA=@col9, 
CD_UNIDADE=@col8;


LOAD DATA local INFILE 'HSL_Exames_3.csv' INTO TABLE Exame
FIELDS TERMINATED BY '|' LINES TERMINATED BY '\n'  IGNORE 1 LINES
(@col1,@col2,@col3,@col4,@col5,@col6,@col7,@col8, @col9) set DE_RESULTADO=@col7, DT_COLETA=@col3,
DE_EXAME=@col5, DE_ORIGEM=@col4, fk_Atendimento_ID_ATENDIMENTO=@col2, fk_Analito_DE_ANALITO=@col6 ; SHOW WARNINGS