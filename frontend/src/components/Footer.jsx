export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '40px 24px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: 20 }}>🌿</span>
          <span style={{ fontFamily: 'var(--font-display)', color: 'var(--green-pale)', fontWeight: 700 }}>
            Leaf Disease
          </span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: 480, margin: '0 auto 16px' }}>
          An open-source plant disease detection system powered by deep learning. 
          Built with React + Flask + PyTorch.
        </p>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'PlantVillage Dataset', href: 'https://github.com/spMohanty/PlantVillage-Dataset' },
            { label: 'PyTorch Docs', href: 'https://pytorch.org/docs' },
            { label: 'MobileNetV2 Paper', href: 'https://arxiv.org/abs/1801.04381' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.82rem',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--green-light)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >
              {link.label}
            </a>
          ))}
        </div>
        {/* Copyright */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          alignItems: 'center',
        }}>
          <p style={{ color: 'rgba(125,171,138,0.5)', fontSize: '0.8rem' }}>
            © {year} <strong style={{ color: 'var(--green-light)' }}>Sudipa Biswas</strong>. All rights reserved.
          </p>
        </div>

       
      </div>
    </footer>
  );
}
