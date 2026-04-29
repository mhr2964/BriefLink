const express = require('express');

function createStatusRouter(dependencies) {
  const router = express.Router();
  const { createSuccessResponse } = dependencies;

  router.get('/', (req, res) => {
    res.json(
      createSuccessResponse({
        service: 'backend',
        status: 'ok',
        version: 'v1'
      })
    );
  });

  return router;
}

module.exports = {
  createStatusRouter
};