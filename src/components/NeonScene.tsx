/**
 * Global animated background — aurora mesh + floating neon orbs.
 * Sits behind everything via fixed positioning.
 */
export function NeonScene() {
  return (
    <>
      <div className="aurora-bg" aria-hidden />
      <div
        className="neon-orb"
        aria-hidden
        style={{
          top: "10%",
          left: "5%",
          width: "380px",
          height: "380px",
          background: "oklch(0.72 0.28 320)",
          animationDelay: "0s",
        }}
      />
      <div
        className="neon-orb"
        aria-hidden
        style={{
          top: "55%",
          right: "8%",
          width: "440px",
          height: "440px",
          background: "oklch(0.78 0.2 200)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="neon-orb"
        aria-hidden
        style={{
          bottom: "5%",
          left: "30%",
          width: "320px",
          height: "320px",
          background: "oklch(0.85 0.22 130)",
          animationDelay: "-12s",
          opacity: 0.35,
        }}
      />
    </>
  );
}
