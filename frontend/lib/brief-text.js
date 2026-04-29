export function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function getBriefParts(text) {
  return text
    .split(/[\n.!?]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function listMarkup(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}