/**
 * Global animated background scene.
 * Sunset Horizon: starfield + sun glow + drifting aurora orbs.
 * Sits fixed behind every page.
 */
export function NeonScene() {
  return (
    <>
      {/* Starfield (two layers via radial-gradient dots) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-30 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 15%, oklch(0.98 0.02 80 / 0.9) 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 70% 25%, oklch(0.98 0.02 80 / 0.7) 50%, transparent 51%)," +
            "radial-gradient(1.5px 1.5px at 40% 10%, oklch(0.98 0.02 80 / 0.9) 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 85% 8%, oklch(0.85 0.18 75 / 0.8) 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 10% 30%, oklch(0.78 0.16 195 / 0.7) 50%, transparent 51%)," +
            "radial-gradient(1.5px 1.5px at 55% 20%, oklch(0.98 0.02 80 / 0.85) 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 92% 35%, oklch(0.98 0.02 80 / 0.6) 50%, transparent 51%)",
          backgroundSize: "100% 60vh",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
        }}
      />

      {/* Twinkling layer */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-30 animate-pulse"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 30% 18%, oklch(1 0 0 / 0.6) 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 65% 12%, oklch(1 0 0 / 0.5) 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 80% 28%, oklch(1 0 0 / 0.5) 50%, transparent 51%)",
          backgroundSize: "100% 50vh",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          animationDuration: "4s",
        }}
      />

      {/* The sun — a bright disc on the horizon */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-1/2 -translate-x-1/2 -z-20"
        style={{
          bottom: "-8vh",
          width: "60vh",
          height: "60vh",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle at 50% 40%, oklch(0.95 0.15 80) 0%, oklch(0.8 0.22 50) 35%, oklch(0.6 0.24 15 / 0.6) 60%, transparent 75%)",
          filter: "blur(2px)",
        }}
      />

      {/* Horizon halo glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-1/2 -translate-x-1/2 -z-20"
        style={{
          bottom: "-30vh",
          width: "180vw",
          height: "60vh",
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.78 0.22 50 / 0.55) 0%, oklch(0.55 0.22 0 / 0.25) 35%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      {/* Drifting aurora */}
      <div className="aurora-bg" aria-hidden />

      {/* Floating amber + teal orbs for parallax depth */}
      <div
        className="neon-orb"
        aria-hidden
        style={{
          top: "12%",
          left: "6%",
          width: "360px",
          height: "360px",
          background: "oklch(0.78 0.22 50)",
          animationDelay: "0s",
        }}
      />
      <div
        className="neon-orb"
        aria-hidden
        style={{
          top: "55%",
          right: "8%",
          width: "420px",
          height: "420px",
          background: "oklch(0.78 0.16 195)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="neon-orb"
        aria-hidden
        style={{
          bottom: "10%",
          left: "35%",
          width: "300px",
          height: "300px",
          background: "oklch(0.7 0.26 0)",
          animationDelay: "-12s",
          opacity: 0.4,
        }}
      />

      {/* Distant mountain silhouette at the bottom */}
      <svg
        aria-hidden
        className="pointer-events-none fixed bottom-0 left-0 right-0 -z-20 w-full"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        style={{ height: "22vh" }}
      >
        <defs>
          <linearGradient id="mountain-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.18 0.06 280)" />
            <stop offset="100%" stopColor="oklch(0.08 0.03 270)" />
          </linearGradient>
        </defs>
        <path
          fill="url(#mountain-grad)"
          d="M0,180 L120,90 L220,140 L340,60 L460,130 L600,40 L740,120 L880,70 L1020,150 L1160,80 L1280,140 L1440,100 L1440,220 L0,220 Z"
        />
      </svg>
    </>
  );
}
