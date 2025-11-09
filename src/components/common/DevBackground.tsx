export const DevBackground = () => {
  return (
    <>
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 font-mono text-xs animate-matrix-rain"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${5 + i * 0.5}s`
            }}
          >
            {("01").repeat(50)}
          </div>
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      {/* Scan Line */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-2 bg-green-400/30 animate-scan-line"></div>
      </div>
    </>
  );
};
