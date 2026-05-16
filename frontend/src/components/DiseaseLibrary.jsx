import { useState } from 'react';

const DISEASES = [
  { id: 'Apple___Apple_scab', display: 'Apple Scab', plant: 'Apple', severity: 'Moderate', emoji: '🍎', desc: 'Dark, scabby lesions on leaves and fruit caused by Venturia inaequalis fungus.' },
  { id: 'Apple___Black_rot', display: 'Apple Black Rot', plant: 'Apple', severity: 'High', emoji: '🍎', desc: 'Caused by Botryosphaeria obtusa. Causes leaf spots, fruit rot, and branch cankers.' },
  { id: 'Apple___Cedar_apple_rust', display: 'Cedar Apple Rust', plant: 'Apple', severity: 'Moderate', emoji: '🍎', desc: 'Orange rust spots on leaves; requires two hosts (apple and juniper).' },
  { id: 'Apple___healthy', display: 'Healthy Apple', plant: 'Apple', severity: 'None', emoji: '🍎', desc: 'No signs of disease. Plant is in good condition.' },
  { id: 'Corn___Cercospora_leaf_spot', display: 'Gray Leaf Spot', plant: 'Corn', severity: 'Moderate', emoji: '🌽', desc: 'Rectangular gray-tan lesions parallel to leaf veins. Caused by Cercospora.' },
  { id: 'Corn___Common_rust', display: 'Common Rust', plant: 'Corn', severity: 'Moderate', emoji: '🌽', desc: 'Brick-red powdery pustules on leaf surfaces. Caused by Puccinia sorghi.' },
  { id: 'Corn___Northern_Leaf_Blight', display: 'Northern Leaf Blight', plant: 'Corn', severity: 'High', emoji: '🌽', desc: 'Large cigar-shaped tan lesions caused by Exserohilum turcicum.' },
  { id: 'Corn___healthy', display: 'Healthy Corn', plant: 'Corn', severity: 'None', emoji: '🌽', desc: 'No visible disease symptoms. Plant is thriving.' },
  { id: 'Potato___Early_blight', display: 'Potato Early Blight', plant: 'Potato', severity: 'Moderate', emoji: '🥔', desc: 'Dark brown target-board lesions on older leaves. Caused by Alternaria solani.' },
  { id: 'Potato___Late_blight', display: 'Potato Late Blight', plant: 'Potato', severity: 'Critical', emoji: '🥔', desc: 'Rapidly spreading dark patches. Caused the Irish Potato Famine (Phytophthora infestans).' },
  { id: 'Potato___healthy', display: 'Healthy Potato', plant: 'Potato', severity: 'None', emoji: '🥔', desc: 'No signs of disease detected on the plant.' },
  { id: 'Tomato___Bacterial_spot', display: 'Bacterial Spot', plant: 'Tomato', severity: 'Moderate', emoji: '🍅', desc: 'Small dark water-soaked spots with yellow halos. Caused by Xanthomonas species.' },
  { id: 'Tomato___Early_blight', display: 'Tomato Early Blight', plant: 'Tomato', severity: 'Moderate', emoji: '🍅', desc: 'Target-board lesion pattern on older leaves. Caused by Alternaria solani.' },
  { id: 'Tomato___Late_blight', display: 'Tomato Late Blight', plant: 'Tomato', severity: 'Critical', emoji: '🍅', desc: 'Large greasy dark patches on leaves/stems. Caused by Phytophthora infestans.' },
  { id: 'Tomato___healthy', display: 'Healthy Tomato', plant: 'Tomato', severity: 'None', emoji: '🍅', desc: 'Plant appears healthy with no disease signs.' },
];

const PLANTS = ['All', 'Apple', 'Corn', 'Potato', 'Tomato'];
const SEVERITY_COLORS = {
  None:     { bg: 'rgba(82,183,136,0.12)',  border: 'rgba(82,183,136,0.3)',  text: '#52b788' },
  Moderate: { bg: 'rgba(244,162,97,0.12)',  border: 'rgba(244,162,97,0.3)',  text: '#f4a261' },
  High:     { bg: 'rgba(231,111,81,0.12)',  border: 'rgba(231,111,81,0.3)',  text: '#e76f51' },
  Critical: { bg: 'rgba(214,40,40,0.12)',   border: 'rgba(214,40,40,0.3)',   text: '#ff6b6b' },
};

export default function DiseaseLibrary() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = DISEASES.filter(d => {
    const matchPlant = filter === 'All' || d.plant === filter;
    const matchSearch = d.display.toLowerCase().includes(search.toLowerCase()) ||
                        d.plant.toLowerCase().includes(search.toLowerCase());
    return matchPlant && matchSearch;
  });

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--green-pale)',
          marginBottom: 12,
        }}>
          Disease Library
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          All 15 plant conditions our model can detect
        </p>
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 40, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search diseases..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: 200,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            padding: '12px 18px',
            outline: 'none',
          }}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          {PLANTS.map(plant => (
            <button
              key={plant}
              onClick={() => setFilter(plant)}
              style={{
                background: filter === plant ? 'rgba(82,183,136,0.2)' : 'var(--surface)',
                border: `1px solid ${filter === plant ? 'rgba(82,183,136,0.5)' : 'var(--border)'}`,
                borderRadius: 'var(--radius-sm)',
                color: filter === plant ? 'var(--green-light)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 500,
                padding: '10px 18px',
                transition: 'all 0.2s',
              }}
            >
              {plant}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 20,
      }}>
        {filtered.map(disease => {
          const c = SEVERITY_COLORS[disease.severity];
          return (
            <div
              key={disease.id}
              style={{
                background: 'var(--surface)',
                border: `1px solid ${c.border}`,
                borderRadius: 'var(--radius)',
                padding: '28px',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 32px ${c.bg}`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{disease.emoji}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--text)', fontWeight: 700 }}>
                      {disease.display}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{disease.plant}</div>
                  </div>
                </div>
                <span style={{
                  background: c.bg,
                  border: `1px solid ${c.border}`,
                  borderRadius: 100,
                  color: c.text,
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  padding: '4px 10px',
                  whiteSpace: 'nowrap',
                }}>
                  {disease.severity}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>
                {disease.desc}
              </p>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
          No diseases found matching your search.
        </div>
      )}
    </div>
  );
}
