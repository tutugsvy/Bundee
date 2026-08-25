// ─── BLOCKFARM · App — v2 "GPU FARM" redesign ──────────────────────────────
// Hold BLOCKFARM → ponsfamily launchpad shares 100% creator fees to holders,
// pro-rata, automatically. Wallet connect shows YOUR real share of the pool.
// Design: 100% different from PONSMINER — solid Robinhood green, GPU rig hero.
import { useEffect, useState } from 'react';
import './dashboard.css';
import { TOKEN, TARGET_CHAIN_ID, NETWORK_NAME } from './game/config.js';
import { hasInjectedWallet, connectInjected, onAccountsChanged, onChainChanged } from './game/wallet.js';
import GpuVisual from './components/GpuVisual.jsx';
import FeeShare from './components/FeeShare.jsx';
import HowItWorks from './components/HowItWorks.jsx';

const SHORT = a => (a ? `${a.slice(0, 6)}…${a.slice(-4)}` : null);

export default function App() {
  const [account, setAccount] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const offAcc = onAccountsChanged(a => { setAccount(a); setErr(null); });
    const offChain = onChainChanged(() => { setErr(null); });
    return () => { offAcc(); offChain(); };
  }, []);

  const connect = async () => {
    setErr(null);
    if (!hasInjectedWallet()) { setErr('No injected wallet (MetaMask/Rabby).'); return; }
    setBusy(true);
    try {
      const addr = await connectInjected();
      setAccount(addr);
    } catch (e) {
      setErr((e && e.message) || 'Wallet request failed');
    } finally {
      setBusy(false);
    }
  };

  const caShort = TOKEN.contractAddress ? SHORT(TOKEN.contractAddress) : null;

  return (
    <div className="app">
      {/* ── floating pill topbar ── */}
      <header className="topbar">
        <div className="topbar-brand">
          <span className="bf-logo" aria-hidden="true"><i /><i /><i /></span>
          <span className="topbar-name">BLOCKFARM</span>
        </div>
        <div className="topbar-right">
          <span className="topbar-chain"><span className="topbar-dot" /> {NETWORK_NAME} · {TARGET_CHAIN_ID}</span>
          {account ? (
            <button className="btn-wallet connected" onClick={() => setAccount(null)}>
              {SHORT(account)}
            </button>
          ) : (
            <button className="btn-wallet" onClick={connect} disabled={busy}>
              {busy ? 'CONNECTING…' : 'CONNECT WALLET'}
            </button>
          )}
        </div>
      </header>

      {/* ── hero: giant type + GPU rig ── */}
      <main className="hero">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="hero-live"><span className="hero-live-dot" /> HOLD TO EARN</span>
            <span className="hero-chain">ROBINHOOD CHAIN · 4663</span>
          </div>
          <h1 className="hero-title">BLOCK<span>FARM</span></h1>
          <p className="hero-tag">MINE BLOCKS. <b>HOLD.</b> EARN FEES.</p>
          <p className="hero-sub">
            Hold {TOKEN.symbol} and every trade pays you — <b>100% of creator fees
            shared to holders</b>, pro-rata, automatically. No claim needed.
          </p>
          <div className="hero-cta">
            <a className="btn primary" href="#pool">VIEW FEE SHARING</a>
            <a className="btn ghost" href={TOKEN.launchpadUrl} target="_blank" rel="noopener noreferrer">
              TRADE {TOKEN.symbol} ↗
            </a>
          </div>
          <div className="hero-token">
            <span className="hero-token-pill"><span className="hero-token-dot" /> {TOKEN.symbol}</span>
            {caShort && (
              <a className="hero-token-ca" href={TOKEN.launchpadUrl} target="_blank" rel="noopener noreferrer">{caShort} ↗</a>
            )}
          </div>
        </div>

        <div className="hero-visual">
          <GpuVisual />
        </div>
      </main>

      {err && <div className="app-err">{err}</div>}

      {/* ── stats band ── */}
      <section className="stats">
        <div className="stat"><span className="stat-n">100%</span><span className="stat-l">CREATOR FEES → HOLDERS</span></div>
        <div className="stat"><span className="stat-n">PRO-RATA</span><span className="stat-l">BALANCE ÷ SUPPLY</span></div>
        <div className="stat"><span className="stat-n">AUTO</span><span className="stat-l">PUSHED · NO CLAIM</span></div>
      </section>

      {/* ── fee sharing ── */}
      <FeeShare account={account} />

      {/* ── how it works ── */}
      <HowItWorks />

      {/* ── footer ── */}
      <footer className="ft">
        <p className="ft-note">{TOKEN.symbol} launched on ponsfamily.</p>
        <p className="ft-brand">BLOCKFARM · MINE · HOLD · EARN · ROBINHOOD CHAIN {TARGET_CHAIN_ID}</p>
      </footer>
    </div>
  );
}
