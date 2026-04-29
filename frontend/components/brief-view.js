import { escapeHtml, getBriefParts, listMarkup } from "../lib/brief-text.js";

export function emptyStateMarkup() {
  return '<p class="placeholder">No brief yet. Submit source text to generate a result.</p>';
}

export function processingMarkup() {
  return '<p class="placeholder">Processing source material…</p>';
}

export function buildBriefMarkup(text) {
  const parts = getBriefParts(text);
  const title = (parts[0] || "Generated brief").slice(0, 72);
  const summary = parts[0] || "Source material received and condensed for review.";
  const highlights = parts.slice(0, 3);
  const nextSteps = parts.slice(3, 6);
  const safeHighlights = highlights.length
    ? highlights
    : ["Review generated summary and refine as needed."];
  const safeNextSteps = nextSteps.length
    ? nextSteps
    : ["Share the brief or run another source through the workspace."];

  return `
    <div class="status-chip">Ready</div>
    <article class="result-card">
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(summary)}</p>
    </article>
    <article class="result-card">
      <h3>Highlights</h3>
      <ul>${listMarkup(safeHighlights)}</ul>
    </article>
    <article class="result-card">
      <h3>Next steps</h3>
      <ul>${listMarkup(safeNextSteps)}</ul>
    </article>
  `;
}