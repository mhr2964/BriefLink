import { useEffect, useMemo, useState } from "react";

const STATUS_ENDPOINT = "/api/v1/status";

function getStatusUrl() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (!baseUrl) {
    return STATUS_ENDPOINT;
  }

  return `${baseUrl.replace(/\/$/, "")}${STATUS_ENDPOINT}`;
}

function formatPayload(payload) {
  return JSON.stringify(payload, null, 2);
}

export default function App() {
  const [viewState, setViewState] = useState("loading");
  const [payload, setPayload] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const statusUrl = useMemo(() => getStatusUrl(), []);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadStatus() {
      try {
        setViewState("loading");
        setErrorMessage("");

        const response = await fetch(statusUrl, {
          method: "GET",
          signal: abortController.signal,
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setPayload(data);
        setViewState("success");
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Unknown error"
        );
        setViewState("error");
      }
    }

    loadStatus();

    return () => {
      abortController.abort();
    };
  }, [statusUrl]);

  return (
    <main className="app-shell">
      <section className="status-card">
        <p className="eyebrow">BriefLink</p>
        <h1>Frontend foundation</h1>
        <p className="subtitle">
          Checks backend availability through a single status endpoint.
        </p>

        {viewState === "loading" ? (
          <div className="state-block" aria-live="polite">
            <div className="spinner" aria-hidden="true" />
            <h2>Loading status</h2>
            <p>
              Requesting <code>{statusUrl}</code>
            </p>
          </div>
        ) : null}

        {viewState === "success" ? (
          <div className="state-block success" aria-live="polite">
            <h2>Status available</h2>
            <p>The API responded successfully.</p>
            <pre>{formatPayload(payload)}</pre>
          </div>
        ) : null}

        {viewState === "error" ? (
          <div className="state-block error" aria-live="polite">
            <h2>Status unavailable</h2>
            <p>{errorMessage}</p>
            <p>
              Checked <code>{statusUrl}</code>
            </p>
          </div>
        ) : null}
      </section>
    </main>
  );
}