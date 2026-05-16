const STEPS = [
  {
    icon: '📸',
    number: '01',
    title: 'Upload a Leaf Photo',
    desc: 'Take a clear photo of the affected leaf under good lighting. JPG, PNG, and WEBP formats are all supported.',
  },
  {
    icon: '🧠',
    number: '02',
    title: 'Analysis',
    desc: 'Our MobileNetV2 deep learning model processes the image and identifies patterns associated with known plant diseases.',
  },
  {
    icon: '📋',
    number: '03',
    title: 'Get Diagnosis',
    desc: 'Receive an instant diagnosis with confidence scores, disease description, and severity rating.',
  },
  {
    icon: '💊',
    number: '04',
    title: 'Treatment Plan',
    desc: 'View actionable treatment recommendations and prevention tips tailored to the specific disease detected.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        padding: '100px 24px',
        background: 'rgba(22, 43, 31, 0.4)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ color: 'var(--green-light)', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: 12 }}>
            THE PROCESS
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--text)',
            marginBottom: 16,
          }}>
            How Leaf Disease Works
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto', fontSize: '1.05rem' }}>
            From upload to diagnosis in seconds — here's what happens behind the scenes.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: 24,
        }}>
          {STEPS.map((step, i) => (
            <div key={step.number} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '36px 28px',
              position: 'relative',
              transition: 'transform 0.25s, border-color 0.25s',
              cursor: 'default',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(82, 183, 136, 0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              {/* Step number */}
              <div style={{
                position: 'absolute',
                top: 20,
                right: 20,
                fontFamily: 'var(--font-display)',
                fontSize: '3rem',
                fontWeight: 900,
                color: 'rgba(82, 183, 136, 0.08)',
                lineHeight: 1,
              }}>
                {step.number}
              </div>

              {/* Icon */}
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: 'rgba(82, 183, 136, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
                marginBottom: 20,
              }}>
                {step.icon}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                color: 'var(--text)',
                marginBottom: 12,
              }}>
                {step.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {step.desc}
              </p>

              {/* Connector arrow (except last) */}
              {i < STEPS.length - 1 && (
                <div style={{
                  display: 'none', // hidden on mobile grid
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Model info */}
        <div style={{
          marginTop: 56,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '32px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 32,
        }}>
          {[
            { label: 'Architecture', value: 'MobileNetV2' },
            { label: 'Framework', value: 'PyTorch 2.x' },
            { label: 'Input Size', value: '224 × 224 px' },
            { label: 'Dataset', value: 'PlantVillage' },
          ].map(item => (
            <div key={item.label}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 6 }}>
                {item.label.toUpperCase()}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', color: 'var(--green-light)', fontSize: '1.2rem', fontWeight: 700 }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
