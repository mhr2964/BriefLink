const express = require('express');
const { generateBrief } = require('../services/brief-generator');

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

function createSuccessResponse(data) {
  return {
    success: true,
    data,
    error: null
  };
}

function validateCreateBriefPayload(body) {
  const details = [];

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return [{ field: 'body', message: 'Request body must be a JSON object.' }];
  }

  if (typeof body.accountName !== 'string' || body.accountName.trim().length === 0) {
    details.push({ field: 'accountName', message: 'accountName is required.' });
  }

  if (typeof body.websiteUrl !== 'string' || body.websiteUrl.trim().length === 0) {
    details.push({ field: 'websiteUrl', message: 'websiteUrl is required.' });
  } else {
    try {
      new URL(body.websiteUrl);
    } catch (error) {
      details.push({ field: 'websiteUrl', message: 'websiteUrl must be a valid URI.' });
    }
  }

  if (body.notes !== undefined && typeof body.notes !== 'string') {
    details.push({ field: 'notes', message: 'notes must be a string when provided.' });
  }

  return details;
}

function createBriefsRouter() {
  const router = express.Router();

  router.post('/', async (req, res, next) => {
    const validationErrors = validateCreateBriefPayload(req.body);

    if (validationErrors.length > 0) {
      return res
        .status(400)
        .json(createErrorResponse('validation_error', 'Invalid brief request.', validationErrors));
    }

    try {
      const brief = await generateBrief({
        accountName: req.body.accountName.trim(),
        websiteUrl: req.body.websiteUrl.trim(),
        notes: req.body.notes ? req.body.notes.trim() : ''
      });

      return res.status(201).json(
        createSuccessResponse({
          brief
        })
      );
    } catch (error) {
      return next(error);
    }
  });

  return router;
}

module.exports = { createBriefsRouter };