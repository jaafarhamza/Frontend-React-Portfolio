import { useEffect, useState } from "react";

export const DevCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed w-6 h-6 z-50 mix-blend-difference"
      style={{ left: mousePos.x - 12, top: mousePos.y - 12 }}
    >
      <div className="w-full h-full border-2 border-green-400 rounded-full animate-pulse-ring"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full"></div>
    </div>
  );
};
