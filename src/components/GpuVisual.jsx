// ─── BLOCKFARM · GPU visual — pure-CSS mining rig, decorative ──────────────
// A GPU card with spinning fans, shroud, PCB, RGB strip, floating chips.
// No external assets — pure JSX + CSS.

function Fan({ n }) {
  return (
    <div className={`gpu-fan gpu-fan--${n}`}>
      <div className="gpu-fan-blades" />
      <div className="gpu-fan-hub"><span className="gpu-fan-bolt">⚡</span></div>
    </div>
  );
}

export default function GpuVisual() {
  return (
    <div className="gpu">
      {/* orbital rings */}
      <div className="gpu-ring" />
      <div className="gpu-glow" />

      {/* card */}
      <div className="gpu-card">
        <div className="gpu-shroud">
          <Fan n={1} />
          <Fan n={2} />
          <div className="gpu-brand">
            <span className="gpu-brand-name">BLOCKFARM</span>
            <span className="gpu-brand-sub">GPU · RENDER UNIT</span>
          </div>
        </div>
        <div className="gpu-pcb">
          <span className="gpu-pcb-chip">BF-1</span>
          <span className="gpu-pcb-chip">BF-2</span>
          <span className="gpu-pcb-chip">PCIe</span>
        </div>
        <div className="gpu-rgb" />
      </div>

      {/* floating chips */}
      <div className="gpu-chip gpu-chip--1">⛏ HOLD</div>
      <div className="gpu-chip gpu-chip--2">🧊 MINE</div>
      <div className="gpu-chip gpu-chip--3">💸 EARN</div>

      {/* caption */}
      <div className="gpu-caption">
        <span className="gpu-caption-dot" /> 100% FEES → HOLDERS · NO CLAIM
      </div>
    </div>
  );
}