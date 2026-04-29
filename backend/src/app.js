const express = require('express');
const { createStatusRouter } = require('./routes/status');

function createSuccessResponse(data) {
  return {
    success: true,
    data,
    error: null
  };
}

function createErrorResponse(code, message, details = null) {
  return {
    success: false,
    data: null,
    error: {
      code,
      message,
      details
    }
  };
}

function createApp() {
  const app = express();

  app.use(express.json());

  app.use('/api/v1/status', createStatusRouter({ createSuccessResponse }));

  app.use((req, res) => {
    res.status(404).json(
      createErrorResponse('not_found', 'Route not found', {
        method: req.method,
        path: req.originalUrl
      })
    );
  });

  app.use((err, req, res, next) => {
    const statusCode = err && Number.isInteger(err.statusCode) ? err.statusCode : 500;
    const message =
      statusCode === 500 ? 'Internal server error' : err.message || 'Request failed';

    res.status(statusCode).json(
      createErrorResponse(
        statusCode === 500 ? 'internal_error' : 'request_error',
        message,
        statusCode === 500 ? null : err.details || null
      )
    );
  });

  return app;
}

module.exports = { createApp };