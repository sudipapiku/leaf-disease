import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Uploader from './components/Uploader';
import ResultCard from './components/ResultCard';
import HowItWorks from './components/HowItWorks';
import DiseaseLibrary from './components/DiseaseLibrary';
import Footer from './components/Footer';

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  const handlePrediction = async (file) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Prediction failed');
      setResult(data);
      setActiveTab('result');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setActiveTab('home');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={{ flex: 1 }}>
        {activeTab === 'home' && (
          <>
            <Hero onGetStarted={() => setActiveTab('detect')} />
            <HowItWorks />
          </>
        )}

        {activeTab === 'detect' && (
          <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: 'var(--green-pale)',
                marginBottom: 12
              }}>
                Diagnose Your Plant
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                Upload a clear photo of the affected leaf for instant analysis
              </p>
            </div>
            <Uploader onUpload={handlePrediction} loading={loading} />
            {error && (
              <div style={{
                marginTop: 24,
                padding: '16px 24px',
                background: 'rgba(214, 40, 40, 0.12)',
                border: '1px solid rgba(214, 40, 40, 0.3)',
                borderRadius: 'var(--radius)',
                color: '#ff8a80',
                textAlign: 'center'
              }}>
                ⚠️ {error}
              </div>
            )}
          </div>
        )}

        {activeTab === 'result' && result && (
          <ResultCard result={result} onReset={handleReset} />
        )}

        {activeTab === 'library' && <DiseaseLibrary />}
      </main>

      <Footer />
    </div>
  );
}
