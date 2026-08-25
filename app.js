// ─── BLOCKFARM · app.js — live stats + CA / buy config ─────────────────────
// Price/MCAP/Volume: DexScreener (real-time, CORS-friendly).
// Holders: Blockscout (on-chain, updated by indexer).
// Auto-refresh every 60s so the numbers stay synced.

// ─── CONFIG — isi setelah launch BLOCKFARM di ponsfamily ───────────────────
const CONFIG = {
  BLOCKFARM_CA: '0x5131F946C67110d3d0f1F211FC70dB33FF6eecf0',
  DISTRIBUTOR_CA: null,   // ← isi CA FeeDistributor setelah deploy
  BUY_URL: 'https://www.ponsfamily.com/launchpad/0x5131F946C67110d3d0f1F211FC70dB33FF6eecf0',
  PONS_CA: '0x39dBED3a2bd333467115dE45665cC57F813C4571',
};

// ─── utils ─────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

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
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return '$' + (n / 1e3).toFixed(1) + 'K';
  return '$' + n.toFixed(0);
};
const fmtNum = v => {
  const n = Number(v);
  if (!isFinite(n)) return '—';
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
};
const short = a => (a ? a.slice(0, 6) + '…' + a.slice(-4) : null);

// ─── stats ─────────────────────────────────────────────────────────────────
async function loadStats() {
  try {
    // DexScreener — real-time price/mcap/volume (best pair by liquidity + sum volume)
    const res = await fetch('https://api.dexscreener.com/latest/dex/tokens/' + CONFIG.PONS_CA);
    const d = await res.json();
    const pairs = (d.pairs || []).filter(p => p.chainId === 'robinhood');
    if (pairs.length) {
      const best = pairs.reduce((a, b) =>
        (Number(b.liquidity?.usd) || 0) > (Number(a.liquidity?.usd) || 0) ? b : a);
      const vol = pairs.reduce((s, p) => s + (Number(p.volume?.h24) || 0), 0);
      const mcap = best.marketCap || pairs[0].marketCap;
      $('st-price').textContent = fmtPrice(best.priceUsd);
      $('st-mcap').textContent = fmtCompact(mcap);
      $('st-vol').textContent = fmtCompact(vol);
    }
  } catch (e) { /* keep "—" */ }

  try {
    // Blockscout — holders only
    const res = await fetch('https://robinhoodchain.blockscout.com/api/v2/tokens/' + CONFIG.PONS_CA);
    const d = await res.json();
    $('st-holders').textContent = fmtNum(d.holders_count);
  } catch (e) { /* keep "—" */ }
}

// ─── CA + buy ──────────────────────────────────────────────────────────────
function renderCA() {
  const caEl = $('bf-ca');
  const btn = $('buy-btn');
  if (!caEl) return;

  if (CONFIG.BLOCKFARM_CA) {
    caEl.textContent = CONFIG.BLOCKFARM_CA;
    btn.href = CONFIG.BUY_URL || ('https://www.ponsfamily.com/token/' + CONFIG.BLOCKFARM_CA);
    btn.textContent = 'BUY $BLOCKFARM ↗';
  } else {
    caEl.textContent = '0x… published at launch';
    btn.href = 'https://www.ponsfamily.com/launchpad/create';
    btn.textContent = 'BUY NOW ↗';
  }

  // copy CA
  const copy = $('copy-ca');
  if (copy) {
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(caEl.textContent);
        copy.textContent = '✓ Copied';
        setTimeout(() => { copy.textContent = 'Copy'; }, 1500);
      } catch { /* clipboard blocked */ }
    });
  }
}

// ─── init ──────────────────────────────────────────────────────────────────
renderCA();
loadStats();
setInterval(loadStats, 60_000); // keep synced
