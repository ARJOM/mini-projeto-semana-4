# Mini projeto - Semana 4

Esse é o repositório do mini projeto desenvolvido para a disciplina de Banco de Dados II

O projeto foi desenvolvido em dois escopos: backend e frontend. Sendo o backend desenvolvido originalmento pelo 
professor Franciscp Paulo. Entretando a versão presente nesse repositório foi modificada para adicionar novas 
funcionalidades. Já o frontend foir desenvolvido em React para consumir a API, e é uma SPA.

### Executando
1. No banco de dados do IBGE execute o seguinte comando:
    ~~~sql
    CREATE OR REPLACE FUNCTION getStateViewBox(TEXT) RETURNS TEXT AS $$ 
    
        DECLARE 
            nome1 ALIAS FOR $1;
            viewBox TEXT;
        BEGIN
            SELECT INTO viewBox CAST(ST_xmin(ST_Envelope(geom)) as varchar) || ' ' || 
                  CAST(ST_ymax(ST_Envelope(geom)) * -1 as varchar) || ' ' ||
                  CAST(ST_xmax(ST_Envelope(geom)) - ST_xmin(ST_Envelope(geom)) as varchar) || ' ' ||
                  CAST(ST_ymax(ST_Envelope(geom)) - ST_ymin(ST_Envelope(geom)) as varchar)
                  FROM estado
                  WHERE nome ilike nome1;
              return viewBox;
        END;
        
    $$language plpgsql;
    ~~~
1. No diretório backend siga as instruções de instalação e inicialização. 
    1. Esse projeto foi desenvolvido com o backend executando na porta 3333.
1. No diretório frontend siga as instruções de instalação e inicialização.
    1. Caso o backend execute em uma porta diferente da 3333 será necessário alterar o arquivo api.js e configurar o 
    baseURL na porta correta. 
