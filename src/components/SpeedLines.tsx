export function SpeedLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="animate-speed-line absolute h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{
            top: `${(i * 13 + 5) % 100}%`,
            width: `${120 + (i % 4) * 60}px`,
            animationDelay: `${i * 0.35}s`,
            animationDuration: `${2 + (i % 3) * 0.6}s`,
          }}
        />
      ))}
    </div>
  );
}
