import { mountBriefForm } from "./components/brief-form.js";

mountBriefForm({
  formId: "brief-form",
  sourceId: "source-text",
  submitId: "submit-button",
  resetId: "reset-button",
  messageId: "form-message",
  resultId: "result"
});