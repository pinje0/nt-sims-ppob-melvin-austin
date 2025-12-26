import sanitizeHtml from "sanitize-html";

export function sanitizePlainText(value) {
  if (typeof value !== "string") return value;

  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
}
