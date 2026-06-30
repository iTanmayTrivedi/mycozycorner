import { useEffect, useRef, useState } from "react";

const messages = [
  "drink water ♡",
  "stretch a little",
  "you're doing great",
  "ten deep breaths",
  "save the file !",
  "go outside today",
  "tea > stress",
];

/** Draggable sticky-note doodle, bottom-left. Desktop only. */
export function StickyNote() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 18, y: 0, init: false });
  const [msg, setMsg] = useState(messages[0]);
  const drag = useRef({ down: false, dx: 0, dy: 0 });

  useEffect(() => {
    setPos({ x: 18, y: window.innerHeight - 200, init: true });
    setMsg(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  const onDown = (e: React.PointerEvent) => {
    const el = ref.current; if (!el) return;
    el.setPointerCapture(e.pointerId);
    drag.current = { down: true, dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    el.style.transition = "none";
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return;
    setPos({ x: e.clientX - drag.current.dx, y: e.clientY - drag.current.dy, init: true });
  };
  const onUp = (e: React.PointerEvent) => {
    drag.current.down = false;
    const el = ref.current; if (el) el.style.transition = "";
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  if (!pos.init) return null;
  return (
    <div
      ref={ref}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onDoubleClick={() => setMsg(messages[Math.floor(Math.random() * messages.length)])}
      className="sticky-note"
      style={{ left: pos.x, top: pos.y }}
      title="drag me · double-click for a new note"
    >
      <span className="sticky-note-pin" />
      <span className="sticky-note-text">{msg}</span>
      <span className="sticky-note-hint">drag · dbl-click</span>
    </div>
  );
}
