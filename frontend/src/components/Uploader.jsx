import { useState, useRef, useCallback } from 'react';

export default function Uploader({ onUpload, loading }) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, []);

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  const handleChange = (e) => handleFile(e.target.files[0]);

  const handleSubmit = () => {
    if (selectedFile) onUpload(selectedFile);
  };

  const handleReset = () => {
    setPreview(null);
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      {!preview ? (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? 'var(--green-light)' : 'rgba(82, 183, 136, 0.3)'}`,
            borderRadius: 'var(--radius)',
            padding: '72px 40px',
            textAlign: 'center',
            cursor: 'pointer',
            background: dragging
              ? 'rgba(82, 183, 136, 0.06)'
              : 'rgba(22, 43, 31, 0.5)',
            transition: 'all 0.25s ease',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 20, filter: 'saturate(0.8)' }}>🍃</div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            color: 'var(--text)',
            marginBottom: 10,
          }}>
            Drop your leaf image here
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>
            or click to browse — JPG, PNG, WEBP supported
          </p>
          <div style={{
            display: 'inline-block',
            background: 'rgba(82, 183, 136, 0.12)',
            border: '1px solid rgba(82, 183, 136, 0.25)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--green-light)',
            padding: '10px 24px',
            fontWeight: 600,
            fontSize: '0.95rem',
          }}>
            Choose File
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          border: '1px solid var(--border)',
        }}>
          {/* Preview image */}
          <div style={{ position: 'relative' }}>
            <img
              src={preview}
              alt="Leaf preview"
              style={{
                width: '100%',
                maxHeight: 380,
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(13,31,23,0.7) 0%, transparent 60%)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              color: '#fff',
              fontWeight: 500,
              fontSize: '0.9rem',
            }}>
              📎 {selectedFile.name}
            </div>
          </div>

          {/* Action bar */}
          <div style={{
            display: 'flex',
            gap: 12,
            padding: 24,
            justifyContent: 'flex-end',
          }}>
            <button
              onClick={handleReset}
              disabled={loading}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                padding: '12px 24px',
                transition: 'all 0.2s',
              }}
            >
              ← Change Image
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                background: loading
                  ? 'rgba(82, 183, 136, 0.3)'
                  : 'linear-gradient(135deg, var(--green-mid), var(--green-light))',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                color: '#fff',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '12px 36px',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    display: 'inline-block',
                    width: 16,
                    height: 16,
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff',
                    borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite',
                  }} />
                  Analyzing...
                </>
              ) : (
                '🔬 Detect Disease'
              )}
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        marginTop: 24,
      }}>
        {[
          { icon: '☀️', tip: 'Use clear, well-lit photos' },
          { icon: '🎯', tip: 'Focus on the affected area' },
          { icon: '📐', tip: 'Single leaf per image works best' },
        ].map(({ icon, tip }) => (
          <div key={tip} style={{
            background: 'rgba(22, 43, 31, 0.5)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}>
            <span style={{ fontSize: 18 }}>{icon}</span>
            {tip}
          </div>
        ))}
      </div>
    </div>
  );
}
