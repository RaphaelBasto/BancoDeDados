--numero de total de obitos
select count(DT_DESFECHO) as num_obitos_total from Desfecho where DT_DESFECHO = 'DDMMAA';*/

--numero de obitos de pacientes que se examinaram para covid
select count(distinct Exame.fk_Atendimento_ID_ATENDIMENTO) as num_obitos_covid from Exame inner join Desfecho 
on Exame.fk_Atendimento_ID_ATENDIMENTO = Desfecho.fk_Atendimento_ID_ATENDIMENTO
where Exame.DE_EXAME like '%Cov%' and Desfecho.DT_DESFECHO = 'DDMMAA';

--numero de casos de covid
select count(distinct Exame.fk_Atendimento_ID_ATENDIMENTO) as num_casos_covid from Exame where ((Exame.DE_RESULTADO like 'DETECTADO%') 
or (Exame.DE_RESULTADO like '%POSITIVO%'))
and Exame.DE_EXAME like '%Cov%';

--media de tempo de atendimento para pacientes que não vieram a óbito
select  avg(DATEDIFF(str_to_date(DT_DESFECHO, '%d/%m/%Y'), str_to_date(DT_ATENDIMENTO, '%d/%m/%Y'))) as media_tempo_atendimento
from Desfecho
where DT_DESFECHO != 'DDMMAA';

--media de tempo de atendimento para pacientes diagnosticados com covid e não vieram a óbito
select  avg(DATEDIFF(str_to_date(datas.DT_DE, '%d/%m/%Y'), str_to_date(datas.DT_AT, '%d/%m/%Y'))) as media_tempo_atendimento
from (select Desfecho.DT_ATENDIMENTO as DT_AT, Desfecho.DT_DESFECHO as DT_DE from Exame inner join Desfecho 
on Exame.fk_Atendimento_ID_ATENDIMENTO = Desfecho.fk_Atendimento_ID_ATENDIMENTO
where Exame.DE_EXAME like '%Cov%' and ((Exame.DE_RESULTADO like 'DETECTADO%') or (Exame.DE_RESULTADO like '%POSITIVO%')))  as datas
where datas.DT_DE != 'DDMMAA';

--Atendimentos sem desfechos
select count(Atendimento.ID_ATENDIMENTO) from
Atendimento left join Desfecho
on Atendimento.ID_ATENDIMENTO = Desfecho.fk_Atendimento_ID_ATENDIMENTO
where Desfecho.DE_DESFECHO is null;


--Numero de óbitos/mes entre pessoas diagnosticadas com COVID-19
select count(distinct Exame.fk_Atendimento_ID_ATENDIMENTO) as num_obitos_covid,
month(str_to_date(Desfecho.DT_ATENDIMENTO, '%d/%m/%Y')) as meses
from Exame inner join Desfecho 
on Exame.fk_Atendimento_ID_ATENDIMENTO = Desfecho.fk_Atendimento_ID_ATENDIMENTO
where Exame.DE_EXAME like '%Cov%' and Desfecho.DT_DESFECHO = 'DDMMAA' and 
((Exame.DE_RESULTADO like 'DETECTADO%') or (Exame.DE_RESULTADO like '%POSITIVO%'))
group by meses;


--Quantidade de contaminados por covid-19/idade
select count(distinct contaminados.PA_ID) as quantidade_contaminados, 
2020-CONVERT(Paciente.AA_NASCIMENTO, unsigned integer) as idade_contaminados
from Paciente inner join
(select ( Exame.fk_Atendimento_ID_ATENDIMENTO) as AT_ID, Atendimento.fk_Paciente_ID_PACIENTE as PA_ID 
from Exame inner join Atendimento
on Atendimento.ID_ATENDIMENTO = Exame.fk_Atendimento_ID_ATENDIMENTO
where ((Exame.DE_RESULTADO like 'DETECTADO%') or (Exame.DE_RESULTADO like '%POSITIVO%'))
and Exame.DE_EXAME like '%Cov%') as contaminados
on contaminados.PA_ID = Paciente.ID_PACIENTE
where Paciente.AA_NASCIMENTO != 'AAAA' and Paciente.AA_NASCIMENTO != 'YYYY'
group by(idade_contaminados)
;

--Atendimentos(qualquer doença) / município
select Paciente.CD_MUNICIPIO as municipio, count(at_sem_desfecho.PA_ID) as num_pacientes
from Paciente inner join
(select (Atendimento.ID_ATENDIMENTO) as AT_ID, Atendimento.fk_Paciente_ID_PACIENTE as PA_ID
from Atendimento left outer join Desfecho
on Atendimento.ID_ATENDIMENTO = Desfecho.fk_Atendimento_ID_ATENDIMENTO
where Desfecho.DE_DESFECHO is null) as at_sem_desfecho
on at_sem_desfecho.PA_ID = Paciente.ID_PACIENTE
group by municipio
;

--Atendimentos(qualquer doença) / município utilizando diferença(not in)
select Paciente.CD_MUNICIPIO as municipio, count(at_sem_desfecho.PA_ID) as num_pacientes
from Paciente inner join
((select dife.ID_ATENDIMENTO as ID_AT, Atendimento.fk_Paciente_ID_PACIENTE as PA_ID
from Atendimento inner join
(select Atendimento.ID_ATENDIMENTO from Atendimento where Atendimento.ID_ATENDIMENTO not in (select Desfecho.fk_Atendimento_ID_ATENDIMENTO from Desfecho)) as dife
on Atendimento.ID_ATENDIMENTO = dife.ID_ATENDIMENTO)) as at_sem_desfecho
on at_sem_desfecho.PA_ID = Paciente.ID_PACIENTE
group by municipio
;
