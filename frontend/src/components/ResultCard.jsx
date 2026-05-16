const SEVERITY_COLORS = {
  None: { bg: 'rgba(82, 183, 136, 0.15)', border: 'rgba(82, 183, 136, 0.4)', text: '#52b788' },
  Moderate: { bg: 'rgba(244, 162, 97, 0.15)', border: 'rgba(244, 162, 97, 0.4)', text: '#f4a261' },
  High: { bg: 'rgba(231, 111, 81, 0.15)', border: 'rgba(231, 111, 81, 0.4)', text: '#e76f51' },
  Critical: { bg: 'rgba(214, 40, 40, 0.15)', border: 'rgba(214, 40, 40, 0.4)', text: '#ff6b6b' },
};

const SEVERITY_ICONS = { None: '✅', Moderate: '⚠️', High: '🔴', Critical: '🚨' };

export default function ResultCard({ result, onReset }) {
  const colors = SEVERITY_COLORS[result.severity] || SEVERITY_COLORS.Moderate;
  const isHealthy = result.severity === 'None';

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .result-card { animation: fadeUp 0.5s ease forwards; }
      `}</style>

      <div className="result-card">
        {/* Main result header */}
        <div style={{
          background: 'var(--surface)',
          border: `1px solid ${colors.border}`,
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          marginBottom: 24,
          boxShadow: `0 0 40px ${colors.bg}`,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', minHeight: 280 }}>
            {/* Leaf thumbnail */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src={result.thumbnail}
                alt="Analyzed leaf"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, transparent 60%, var(--surface))',
              }} />
            </div>

            {/* Disease info */}
            <div style={{ padding: '36px 40px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: 100,
                padding: '5px 14px',
                marginBottom: 20,
              }}>
                <span>{SEVERITY_ICONS[result.severity]}</span>
                <span style={{ color: colors.text, fontSize: '0.85rem', fontWeight: 600 }}>
                  {result.severity} Severity
                </span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                color: 'var(--text)',
                lineHeight: 1.1,
                marginBottom: 8,
              }}>
                {result.display_name}
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: '1rem' }}>
                Plant: <strong style={{ color: 'var(--green-light)' }}>{result.plant}</strong>
              </p>

              {/* Confidence bar */}
              <div style={{ marginBottom: 24 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                  fontSize: '0.85rem',
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>Confidence</span>
                  <span style={{ color: colors.text, fontWeight: 700 }}>{result.confidence}%</span>
                </div>
                <div style={{
                  height: 8,
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 100,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${result.confidence}%`,
                    background: `linear-gradient(90deg, ${colors.text}, ${colors.border})`,
                    borderRadius: 100,
                    transition: 'width 1s ease',
                  }} />
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                {result.description}
              </p>
            </div>
          </div>
        </div>

        {/* Top 3 predictions */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '28px 32px',
          marginBottom: 24,
        }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            color: 'var(--green-pale)',
            marginBottom: 20,
          }}>
            Top Predictions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {result.top3.map((pred, i) => {
              const isTop = i === 0;
              return (
                <div key={pred.class} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '12px 16px',
                  background: isTop ? 'rgba(82, 183, 136, 0.08)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isTop ? 'rgba(82,183,136,0.25)' : 'transparent'}`,
                  borderRadius: 'var(--radius-sm)',
                }}>
                  <span style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: isTop ? 'var(--green-mid)' : 'rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: isTop ? '#fff' : 'var(--text-muted)',
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 4,
                    }}>
                      <span style={{ color: isTop ? 'var(--text)' : 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                        {pred.display}
                      </span>
                      <span style={{ color: isTop ? 'var(--green-light)' : 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
                        {pred.confidence}%
                      </span>
                    </div>
                    <div style={{
                      height: 4,
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: 100,
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${pred.confidence}%`,
                        background: isTop ? 'var(--green-light)' : 'rgba(255,255,255,0.15)',
                        borderRadius: 100,
                      }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Treatment + Prevention */}
        {!isHealthy && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            {/* Treatment */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '28px 32px',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                color: 'var(--accent)',
                marginBottom: 20,
              }}>
                💊 Treatment Steps
              </h3>
              <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {result.treatment.map((step, i) => (
                  <li key={i} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Prevention */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '28px 32px',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                color: 'var(--green-pale)',
                marginBottom: 20,
              }}>
                🛡️ Prevention
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                {result.prevention}
              </p>
            </div>
          </div>
        )}

        {/* Healthy message */}
        {isHealthy && (
          <div style={{
            background: 'rgba(82, 183, 136, 0.08)',
            border: '1px solid rgba(82, 183, 136, 0.25)',
            borderRadius: 'var(--radius)',
            padding: '32px',
            textAlign: 'center',
            marginBottom: 24,
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🌱</div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--green-light)',
              fontSize: '1.4rem',
              marginBottom: 10,
            }}>
              Your plant looks healthy!
            </h3>
            <p style={{ color: 'var(--text-muted)' }}>
              {result.prevention}
            </p>
          </div>
        )}

        {/* Analyze another */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onReset}
            style={{
              background: 'linear-gradient(135deg, var(--green-mid), var(--green-light))',
              border: 'none',
              borderRadius: 'var(--radius)',
              color: '#fff',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 600,
              padding: '14px 40px',
              transition: 'opacity 0.2s',
            }}
          >
            ← Analyze Another Leaf
          </button>
        </div>
      </div>
    </div>
  );
}
