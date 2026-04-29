const BRIEF_VERSION = 'mvp-v1';

function slugifyAccountName(accountName) {
  return accountName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

function summarizeWebsite(websiteUrl) {
  let hostname = '';

  try {
    hostname = new URL(websiteUrl).hostname.replace(/^www\./, '');
  } catch (error) {
    hostname = websiteUrl;
  }

  return `Initial account brief generated from ${hostname}.`;
}

async function generateBrief(input) {
  const createdAt = new Date().toISOString();
  const id = `${slugifyAccountName(input.accountName) || 'brief'}-${Date.now()}`;

  return {
    id,
    version: BRIEF_VERSION,
    accountName: input.accountName,
    websiteUrl: input.websiteUrl,
    notes: input.notes || '',
    summary: summarizeWebsite(input.websiteUrl),
    createdAt
  };
}

module.exports = { generateBrief };