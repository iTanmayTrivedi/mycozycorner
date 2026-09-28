import { useEffect, useRef, useState } from "react";
import { Music, Pause, Play } from "lucide-react";

const tracks = [
  { title: "kawaii friends — ckotty", src: "/audio/kawaii-friends.mp3" },
];

export function VinylPlayer() {
  const [playing, setPlaying] = useState(false);
  const [idx, setIdx] = useState(0);
  const [ready, setReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // create audio element once
  useEffect(() => {
    const a = new Audio(tracks[0].src);
    a.loop = true;
    a.volume = 0.55;
    a.preload = "auto";
    a.addEventListener("canplay", () => setReady(true));
    audioRef.current = a;
    return () => { a.pause(); a.src = ""; audioRef.current = null; };
  }, []);

  // play / pause
  useEffect(() => {
    const a = audioRef.current; if (!a) return;
    if (playing) {
      a.play().catch(() => setPlaying(false));
    } else {
      a.pause();
    }
  }, [playing]);

  // switch track
  useEffect(() => {
    const a = audioRef.current; if (!a) return;
    a.src = tracks[idx].src;
    a.load();
    if (playing) a.play().catch(() => setPlaying(false));
  }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = () => setPlaying((p) => !p);
  const next = () => setIdx((i) => (i + 1) % tracks.length);

  return (
    <div className="vinyl-player" aria-label="cozy lo-fi widget">
      <button
        type="button"
        onClick={toggle}
        className="vinyl-disc-wrap"
        aria-label={playing ? "pause" : "play"}
        disabled={!ready}
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
        onClick={next}
        className="vinyl-track"
        title="next track"
      >
        <span className="vinyl-track-kicker">{playing ? "now playing" : ready ? "tap to play" : "loading…"}</span>
        <span className="vinyl-track-title">{tracks[idx].title}</span>
        <span className="vinyl-bars" aria-hidden data-playing={playing ? "1" : "0"}>
          <i style={{ animationDelay: "0s" }} />
          <i style={{ animationDelay: "0.15s" }} />
          <i style={{ animationDelay: "0.3s" }} />
          <i style={{ animationDelay: "0.45s" }} />
        </span>
      </button>
    </div>
  );
}
