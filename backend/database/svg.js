const pool = require('./pool');

const getSVG = (request, response) => {
    const municipio = request.params.nome;

    pool.query('SELECT ST_AsSVG(geom) FROM municipio WHERE nome ilike $1', [municipio], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows[0]);
    });
  };

  const getViewBox = (request, response) => {
    const municipio = request.params.nome;

    pool.query('SELECT getViewBox($1)', [municipio], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows[0]);
    });
  };

  const getStateSVG = (request, response) => {
    const estado = request.params.nome;

    pool.query('SELECT ST_AsSVG(geom) FROM estado WHERE nome ilike $1', [estado], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows[0]);
    });
  };

  const getStateViewBox = (request, response) => {
    const estado = request.params.nome;

    pool.query('SELECT getStateViewBox($1)', [estado], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows[0]);
    });
  };

  const getStateName = (request, response) => {
    const municipio = request.params.nome;

    pool.query('SELECT e.nome FROM municipio mun, estado e WHERE mun.estado ilike e.sigla AND mun.nome ilike $1', [municipio], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows[0])
    })
  };

module.exports = {getSVG, getViewBox, getStateSVG, getStateViewBox, getStateName};
