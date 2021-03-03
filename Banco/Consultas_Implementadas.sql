/* Quantidade de pacientes por municipio */
SELECT CD_MUNICIPIO as municipio, count(*) as qtd 
FROM Paciente 
GROUP BY municipio;


/* Quantidade de atendimentos por municipio */
SELECT CD_MUNICIPIO as municipio, count(*) as qtd
FROM Paciente
INNER JOIN Atendimento
ON Paciente.ID_PACIENTE = Atendimento.fk_Paciente_ID_PACIENTE
GROUP BY municipio;


/* Razao de atendimentos por paciente por municipio */
select 
t1.municipio,
atendimentos / pacientes as qtd
from
( 
select CD_MUNICIPIO as municipio, count(*) as atendimentos
from Paciente
inner join Atendimento
on Paciente.ID_PACIENTE = Atendimento.fk_Paciente_ID_PACIENTE
group by municipio
order by atendimentos
) as t1 
inner join 
(
select CD_MUNICIPIO as municipio, count(*) as pacientes 
from Paciente group by municipio
) as t2 
on t2.municipio = t1.municipio
order by municipio;


/* Quantidade de desfechos por municipio */
select 
Paciente.CD_MUNICIPIO as municipio,
Desfecho.DE_DESFECHO as desfecho, 
count( * ) as qtd
from 
Paciente
inner join 
(select * from Atendimento left join Desfecho on 
Atendimento.ID_ATENDIMENTO = Desfecho.fk_Atendimento_ID_ATENDIMENTO) as Desfecho
on 
Paciente.ID_PACIENTE = Desfecho.fk_Paciente_ID_PACIENTE
where 
Paciente.CD_MUNICIPIO is not null and
Desfecho.DE_DESFECHO is not null and Desfecho.DE_DESFECHO not like "%alta%"
group by 
municipio,
desfecho
order by 
municipio;



/* Quantidade de casos positivos de covid por mes separado por municipio */
select 
table1.municipio as municipio, 
table2.de_resultado as de_resultado, 
table2.mes as mes,
count(*) as qtd
from
(
select 
Paciente.CD_MUNICIPIO as municipio, 
Atendimento.id_atendimento as id_atendimento
from 
Paciente 
inner join 
(select * from Atendimento left join Desfecho on 
Atendimento.ID_ATENDIMENTO = Desfecho.fk_Atendimento_ID_ATENDIMENTO) as Atendimento
on 
Paciente.ID_PACIENTE = Atendimento.fk_Paciente_ID_PACIENTE
where
${restriction}
) as table1
inner join 
(
select
fk_Atendimento_ID_ATENDIMENTO as id_atendimento,  
DE_RESULTADO as de_resultado,
substring(DT_COLETA, 4, 2) as mes
from 
Exame
where 
DE_EXAME like "%cov%"
and DE_RESULTADO like "%detec%"
) as table2
on 
table1.id_atendimento = table2.id_atendimento
group by 
municipio, 
mes, 
de_resultado 
order by 
municipio, 
de_resultado;
        
        
/* Quantidade de casos positivos de covid*/
select 
table1.municipio as municipio, 
table2.de_resultado as de_resultado, 
count(*) as qtd
from
(
select 
Paciente.CD_MUNICIPIO as municipio, 
Atendimento.ID_ATENDIMENTO as id_atendimento
from Paciente 
inner join (select * from Atendimento left join Desfecho on 
Atendimento.ID_ATENDIMENTO = Desfecho.fk_Atendimento_ID_ATENDIMENTO) as Atendimento
on Paciente.ID_PACIENTE = Atendimento.fk_Paciente_ID_PACIENTE
) as table1
inner join 
(
select
fk_Atendimento_ID_ATENDIMENTO as id_atendimento,  
DE_RESULTADO as de_resultado
from Exame
where DE_EXAME like "%cov%"
and DE_RESULTADO like "%detec%"
) as table2
on table1.id_atendimento = table2.id_atendimento
group by de_resultado, municipio
order by municipio, de_resultado;

    
/* Quantidade de mortes por covid por mes separado por cidade*/
select
table1.municipio as municipio, 
table1.mes as mes,
count(*) as qtd
from 
(
select 
Paciente.CD_MUNICIPIO as municipio,
Atendimento.ID_ATENDIMENTO as id_atendimento, 
Atendimento.DE_DESFECHO as desfecho,
substring(Atendimento.DT_ATENDIMENTO, 4, 2) as mes
from Paciente 
inner join (select * from Atendimento left join Desfecho on 
Atendimento.ID_ATENDIMENTO = Desfecho.fk_Atendimento_ID_ATENDIMENTO) as Atendimento
on Paciente.ID_PACIENTE = Atendimento.fk_Paciente_ID_PACIENTE
where Atendimento.DE_DESFECHO like "%obito%"
${restriction}
) as table1
inner join 
(
select 
fk_Atendimento_ID_ATENDIMENTO as id_atendimento,
DE_RESULTADO as de_resultado
from Exame 
where DE_EXAME like "%cov%"
and DE_RESULTADO like "%detec%"
) as table2 
on table1.id_atendimento = table2.id_atendimento
group by municipio, mes
order by municipio, mes;
    
    
/* Quantidade de casos positivos de covid por idade separado por cidade*/
select 
t1.municipio as municipio,
t1.ano_nascimento as ano_nascimento,
t2.de_resultado as de_resultado,
count(*) as qtd
from
(
select 
Paciente.ID_PACIENTE as id_paciente,
substring(Paciente.AA_NASCIMENTO,1, 3) as ano_nascimento,
Paciente.CD_MUNICIPIO as municipio, 
Atendimento.ID_ATENDIMENTO as id_atendimento 
from 
Paciente
inner join
(select * from Atendimento left join Desfecho on 
Atendimento.ID_ATENDIMENTO = Desfecho.fk_Atendimento_ID_ATENDIMENTO) as Atendimento
on 
Paciente.ID_PACIENTE = Atendimento.fk_Paciente_ID_PACIENTE
where
${restriction}
) as t1 
inner join 
(
select 
fk_Atendimento_ID_ATENDIMENTO as id_atendimento,
DE_RESULTADO as de_resultado
from 
Exame 
where 
DE_EXAME like "%cov%" and 
DE_RESULTADO like "%detec%" 
) as t2 
on 
t1.id_atendimento = t2.id_atendimento
group by 
municipio,
ano_nascimento, 
de_resultado
order by
municipio,
ano_nascimento,
de_resultado; 
