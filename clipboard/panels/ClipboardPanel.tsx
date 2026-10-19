import { useEffect, useRef, useState } from "react";
import "./clipboard.css";

type Summary = {
  kind: "empty" | "text" | "json" | "url" | "claude";
  bytes: number;
  lines: number;
  copiedAt: number | null;
  seq: number;
};

// The clipboard summary comes from zorin-clipboard-pling. The service never sends the text itself.
const SERVICE_URL = "http://127.0.0.1:8787";
const POLL_MS = 1000;

const KIND_LABEL: Record<Summary["kind"], string> = {
  empty: "Tomt",
  text: "Text",
  json: "JSON",
  url: "Länk",
  claude: "Claude-överlämning",
};

const size = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const clock = (ms: number) =>
  new Date(ms).toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

export function ClipboardPanel() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const lastSeq = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      try {
        const response = await fetch(`${SERVICE_URL}/clipboard`);
        if (!response.ok) {
          throw new Error(`tjänsten svarade ${response.status}`);
        }
        const next = (await response.json()) as Summary;
        if (cancelled) return;
        if (lastSeq.current !== null && next.seq !== lastSeq.current) {
          setFlash(true);
          window.setTimeout(() => setFlash(false), 600);
        }
        lastSeq.current = next.seq;
        setSummary(next);
        setError(null);
      } catch (failure) {
        if (!cancelled) setError(String(failure));
      }
    };

    void refresh();
    const id = window.setInterval(() => void refresh(), POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  if (!summary) {
    return <div className="clipboard__empty">{error ?? "Laddar…"}</div>;
  }

  return (
    <div className="clipboard">
      {error && <p className="clipboard__error">{error}</p>}
      <p className={flash ? "clipboard__value clipboard__value--flash" : "clipboard__value"}>
        {KIND_LABEL[summary.kind]} · {size(summary.bytes)}
      </p>
      <p className="clipboard__note">
        {summary.lines} {summary.lines === 1 ? "rad" : "rader"}
        {summary.copiedAt !== null && ` · kopierad ${clock(summary.copiedAt)}`}
      </p>
    </div>
  );
}
