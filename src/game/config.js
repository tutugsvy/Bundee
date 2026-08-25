// ─── BLOCKFARM · core config ───────────────────────────────────────────────
// Everything tunable lives here. The site reads these constants only.

// ─── BLOCKFARM TOKEN (yang di-hold — launch di ponsfamily) ─────────────────
// Setelah launch di ponsfamily.com/launchpad/create (aktifkan "Share fees with
// holders"), isi contractAddress di sini.
export const TOKEN = {
  symbol: 'BLOCKFARM',
  name: 'BLOCKFARM',
  decimals: 18,
  supply: 1_000_000_000,        // 1B, fixed-supply launchpad pattern
  contractAddress: null,        // ← isi CA setelah launch di ponsfamily
  // Where the CA link points. Kosongkan → otomatis ke explorer.
  launchpadUrl: 'https://www.ponsfamily.com/launchpad/create',
};

// ─── FEE SHARING (ponsfamily native — no custom contract) ──────────────────
// ponsfamily launchpad has "Share fees with holders": 100% of the creator fee
// is distributed to holders pro-rata and pushed straight to their wallets.
// Permanent — the distributor cannot hand the role back. No claim needed.
export const FEE_SHARE = {
  enabled: true,
  mode: 'native',               // ponsfamily launchpad distributor
  creatorCut: '100%',           // of the creator fee → holders
  rewards: 'BLOCKFARM + WETH',  // fee tokens (paid in both sides of the swap)
  distribution: 'automatic',    // pushed to wallets, no claim needed
  permanence: 'permanent',      // cannot be revoked
};

export const TARGET_CHAIN_ID = 4663;         // Robinhood Chain
export const NETWORK_NAME = 'Robinhood Chain';
export const EXPLORER_URL = 'https://robinhoodchain.blockscout.com';
