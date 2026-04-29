const GENERATION_DELAY_MS = 700;

export function waitForBriefGeneration() {
  return new Promise((resolve) => window.setTimeout(resolve, GENERATION_DELAY_MS));
}