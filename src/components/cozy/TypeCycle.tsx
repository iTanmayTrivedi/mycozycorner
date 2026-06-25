import { useEffect, useState } from "react";

export function TypeCycle({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[i % words.length];
    const speed = deleting ? 55 : 110;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1200);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setI((v) => v + 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return (
    <span className="font-hand text-4xl md:text-5xl ink-underline px-1" style={{ color: "var(--primary)" }}>
      {text}
      <span
        className="inline-block w-[2px] ml-1 align-middle"
        style={{ height: "0.9em", background: "currentColor", animation: "notebook-cursor 1s steps(2) infinite" }}
      />
    </span>
  );
}
