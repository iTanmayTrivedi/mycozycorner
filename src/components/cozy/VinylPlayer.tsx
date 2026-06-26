import { useState } from "react";
import { Music, Pause, Play } from "lucide-react";

const tracks = [
  "lofi cafe — rainy window",
  "midnight study — slow jazz",
  "garden tape — side B",
  "kettle whistle bossa",
];

export function VinylPlayer() {
  const [playing, setPlaying] = useState(true);
  const [idx, setIdx] = useState(0);
  return (
    <div className="vinyl-player" aria-label="cozy lo-fi widget">
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        className="vinyl-disc-wrap"
        aria-label={playing ? "pause" : "play"}
      >
        <span className={`vinyl-disc ${playing ? "spinning" : ""}`}>
          <span className="vinyl-shine" />
          <span className="vinyl-label">
            <Music className="h-3.5 w-3.5" />
          </span>
        </span>
        <span className="vinyl-toggle">
          {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
        </span>
      </button>
      <button
        type="button"
        onClick={() => setIdx((i) => (i + 1) % tracks.length)}
        className="vinyl-track"
        title="next track"
      >
        <span className="vinyl-track-kicker">now playing</span>
        <span className="vinyl-track-title">{tracks[idx]}</span>
        <span className="vinyl-bars" aria-hidden>
          <i style={{ animationDelay: "0s" }} />
          <i style={{ animationDelay: "0.15s" }} />
          <i style={{ animationDelay: "0.3s" }} />
          <i style={{ animationDelay: "0.45s" }} />
        </span>
      </button>
    </div>
  );
}
