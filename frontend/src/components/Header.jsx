import { useState } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'detect', label: 'Detect Disease' },
  { id: 'library', label: 'Disease Library' },
];

export default function Header({ activeTab, setActiveTab }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(13, 31, 23, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <button
          onClick={() => setActiveTab('home')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: 'linear-gradient(135deg, var(--green-mid), var(--green-light))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
          }}>
            🌿
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            fontWeight: 700,
            color: 'var(--green-pale)',
            letterSpacing: '-0.02em',
          }}>
            Leaf Disease <span style={{ color: 'var(--green-light)', fontWeight: 400, fontSize: '0.9rem' }}></span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: activeTab === item.id
                  ? 'rgba(82, 183, 136, 0.15)'
                  : 'none',
                border: activeTab === item.id
                  ? '1px solid rgba(82, 183, 136, 0.3)'
                  : '1px solid transparent',
                borderRadius: 'var(--radius-sm)',
                color: activeTab === item.id ? 'var(--green-light)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                fontWeight: 500,
                padding: '8px 18px',
                transition: 'all 0.2s ease',
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => setActiveTab('detect')}
          style={{
            background: 'linear-gradient(135deg, var(--green-mid), var(--green-light))',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            color: '#fff',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            fontWeight: 600,
            padding: '10px 22px',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.target.style.opacity = '0.85'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >
          Analyze Leaf →
        </button>
      </div>
    </header>
  );
}
