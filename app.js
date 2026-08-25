// ─── BLOCKFARM · app.js — live PONS stats from Blockscout (in-browser) ─────
// Fetched from robinhoodchain.blockscout.com — read off the chain, not estimated.
const PONS = '0x39dBED3a2bd333467115dE45665cC57F813C4571';
const API = 'https://robinhoodchain.blockscout.com/api/v2/tokens/' + PONS;

const fmtPrice = v => {
  const n = Number(v);
  if (!isFinite(n)) return '—';
  if (n >= 1) return '$' + n.toFixed(4);
  if (n >= 0.01) return '$' + n.toFixed(4);
  return '$' + n.toPrecision(3);
};
const fmtCompact = v => {
  const n = Number(v);
  if (!isFinite(n)) return '—';
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return '$' + (n / 1e3).toFixed(1) + 'K';
  return '$' + n.toFixed(0);
};
const fmtNum = v => {
  const n = Number(v);
  if (!isFinite(n)) return '—';
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
};

(async () => {
  try {
    const res = await fetch(API);
    const d = await res.json();
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('st-price', fmtPrice(d.exchange_rate));
    set('st-mcap', fmtCompact(d.circulating_market_cap));
    set('st-holders', fmtNum(d.holders_count));
    set('st-vol', fmtCompact(d.volume_24h));
  } catch (e) {
    // silent — page works fine with "—"
  }
})();
