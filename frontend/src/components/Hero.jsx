export default function Hero({ onGetStarted }) {
  return (
    <section style={{
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative background rings */}
      {[400, 600, 800].map((size, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          border: `1px solid rgba(82, 183, 136, ${0.06 - i * 0.015})`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: `pulse ${4 + i}s ease-in-out infinite alternate`,
        }} />
      ))}

      <style>{`
        @keyframes pulse {
          from { transform: translate(-50%, -50%) scale(0.97); opacity: 0.6; }
          to   { transform: translate(-50%, -50%) scale(1.03); opacity: 1; }
        }
        @keyframes float {
          from { transform: translateY(0px); }
          to   { transform: translateY(-14px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        textAlign: 'center',
        maxWidth: 780,
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(82,183,136,0.1)',
          border: '1px solid rgba(82,183,136,0.25)',
          borderRadius: 100,
          padding: '6px 18px',
          marginBottom: 32,
          animation: 'fadeUp 0.6s ease forwards',
        }}>
          <span style={{ fontSize: 14, color: 'var(--green-light)', fontWeight: 500 }}>
            🤖 Powered by MobileNetV2 + PyTorch
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.8rem, 6vw, 5rem)',
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          marginBottom: 24,
          animation: 'fadeUp 0.7s 0.1s ease both',
        }}>
          <span style={{ color: 'var(--text)' }}>Detect Plant </span>
          <span style={{
            background: 'linear-gradient(135deg, var(--green-light), var(--green-pale))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Diseases</span>
          <br />
          <span style={{ color: 'var(--text)' }}>Instantly</span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'var(--text-muted)',
          maxWidth: 560,
          margin: '0 auto 48px',
          lineHeight: 1.7,
          animation: 'fadeUp 0.7s 0.2s ease both',
        }}>
          Upload a photo of any leaf and our deep learning model will identify diseases across 15 categories of Apple, Corn, Potato, and Tomato plants — with treatment recommendations.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: 16,
          justifyContent: 'center',
          flexWrap: 'wrap',
          animation: 'fadeUp 0.7s 0.3s ease both',
        }}>
          <button
            onClick={onGetStarted}
            style={{
              background: 'linear-gradient(135deg, var(--green-mid), var(--green-light))',
              border: 'none',
              borderRadius: 'var(--radius)',
              color: '#fff',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              fontWeight: 600,
              padding: '16px 36px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 8px 32px rgba(82, 183, 136, 0.35)',
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 40px rgba(82, 183, 136, 0.45)';
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 32px rgba(82, 183, 136, 0.35)';
            }}
          >
            🔬 Analyze a Leaf
          </button>
          <button
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              fontWeight: 500,
              padding: '16px 36px',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.target.style.borderColor = 'var(--green-light)';
              e.target.style.color = 'var(--green-light)';
            }}
            onMouseLeave={e => {
              e.target.style.borderColor = 'var(--border)';
              e.target.style.color = 'var(--text-muted)';
            }}
          >
            How it works ↓
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 48,
          marginTop: 72,
          flexWrap: 'wrap',
          animation: 'fadeUp 0.7s 0.4s ease both',
        }}>
          {[
            { value: '15', label: 'Disease Classes' },
            { value: '4', label: 'Plant Types' },
            { value: '~95%', label: 'Accuracy (trained)' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.2rem',
                fontWeight: 900,
                color: 'var(--green-light)',
                lineHeight: 1,
              }}>
                {stat.value}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
