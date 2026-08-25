// ─── BLOCKFARM · Farm visual — swaps in, holders earn ──────────────────────
// Procedural CSS farm scene: sun, barn, crop rows. Fees flow in from every
// swap, split pro-rata to holders. No GPU, no claim — automatic launchpad.
export default function PoolVisual() {
  return (
    <div className="fv">
      {/* sun glow */}
      <div className="fv-sun" />
      {/* rolling hills */}
      <div className="fv-hill fv-hill--l" />
      <div className="fv-hill fv-hill--r" />
      {/* barn */}
      <div className="fv-barn">
        <div className="fv-barn-roof" />
        <div className="fv-barn-body">
          <div className="fv-barn-door" />
          <div className="fv-barn-window" />
        </div>
      </div>
      {/* crop rows */}
      <div className="fv-fields">
        {[0, 1, 2, 3].map(r => (
          <div className="fv-row" key={r}>
            {[0, 1, 2, 3, 4, 5].map(c => (
              <span className="fv-crop" key={c} />
            ))}
          </div>
        ))}
      </div>
      {/* floating chips */}
      <span className="fv-chip fv-chip--in1">SWAPS ▲</span>
      <span className="fv-chip fv-chip--in2">TRADERS ▲</span>
      <span className="fv-chip fv-chip--out1">HOLDERS ▼</span>
      <span className="fv-chip fv-chip--out2">PRO-RATA ▼</span>
      <span className="fv-chip fv-chip--out3">AUTO ▼</span>
    </div>
  );
}