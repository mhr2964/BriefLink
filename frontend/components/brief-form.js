import {
  buildBriefMarkup,
  emptyStateMarkup,
  processingMarkup
} from "./brief-view.js";

function getElement(id) {
  return document.getElementById(id);
}

function setMessage(messageNode, text, isError) {
  messageNode.textContent = text;
  messageNode.className = isError ? "message error" : "message";
}

function setBusyState(sourceNode, submitNode, isBusy) {
  sourceNode.disabled = isBusy;
  submitNode.disabled = isBusy;
  submitNode.textContent = isBusy ? "Generating..." : "Generate brief";
}

function waitForBriefGeneration() {
  return new Promise((resolve) => window.setTimeout(resolve, 700));
}

export function mountBriefForm(ids) {
  const formNode = getElement(ids.formId);
  const sourceNode = getElement(ids.sourceId);
  const submitNode = getElement(ids.submitId);
  const resetNode = getElement(ids.resetId);
  const messageNode = getElement(ids.messageId);
  const resultNode = getElement(ids.resultId);

  if (!formNode || !sourceNode || !submitNode || !resetNode || !messageNode || !resultNode) {
    return;
  }

  function renderEmptyState() {
    resultNode.className = "result empty";
    resultNode.innerHTML = emptyStateMarkup();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const sourceText = sourceNode.value.trim();

    if (!sourceText) {
      setMessage(messageNode, "Paste source material before generating a brief.", true);
      renderEmptyState();
      return;
    }

    setBusyState(sourceNode, submitNode, true);
    setMessage(messageNode, "Generating brief...", false);
    resultNode.className = "result";
    resultNode.innerHTML = processingMarkup();

    await waitForBriefGeneration();

    resultNode.className = "result";
    resultNode.innerHTML = buildBriefMarkup(sourceText);
    setMessage(messageNode, "Brief generated.", false);
    setBusyState(sourceNode, submitNode, false);
  }

  function handleReset() {
    formNode.reset();
    setBusyState(sourceNode, submitNode, false);
    setMessage(messageNode, "", false);
    renderEmptyState();
    sourceNode.focus();
  }

  formNode.addEventListener("submit", handleSubmit);
  resetNode.addEventListener("click", handleReset);
  renderEmptyState();
}