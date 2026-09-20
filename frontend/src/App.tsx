import React, { useEffect, useState } from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/notes/');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      setNotes(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch notes');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/notes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error('Failed to create note');
      setTitle('');
      setContent('');
      fetchNotes();
    } catch (err: any) {
      setError(err.message || 'Submission error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <header style={{ borderBottom: '1px solid #334155', paddingBottom: '20px', marginBottom: '30px' }}>
          <h1 style={{ margin: 0, fontSize: '1.8rem', color: '#38bdf8' }}>SecureNotes Portal</h1>
          <p style={{ margin: '8px 0 0', color: '#94a3b8', fontSize: '0.95rem' }}>
            Full-Stack Application with Automated DevSecOps, SAST, DAST & Zero-Trust K8s
          </p>
        </header>

        {error && (
          <div style={{ backgroundColor: '#7f1d1d', color: '#fecaca', padding: '12px', borderRadius: '6px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '30px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>Create Encrypted Note</h3>
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            required
            style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', marginBottom: '12px' }}
          />
          <textarea
            placeholder="Write note content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            required
            style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', marginBottom: '16px' }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
          >
            {loading ? 'Saving...' : 'Add Note'}
          </button>
        </form>

        <section>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#cbd5e1' }}>Stored Records ({notes.length})</h3>
          {notes.length === 0 ? (
            <p style={{ color: '#64748b' }}>No notes stored yet. Create one above.</p>
          ) : (
            notes.map((note) => (
              <div key={note.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '16px', marginBottom: '12px' }}>
                <h4 style={{ margin: '0 0 8px', color: '#38bdf8' }}>{note.title}</h4>
                <p style={{ margin: '0 0 12px', color: '#cbd5e1', lineHeight: '1.5' }}>{note.content}</p>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  {new Date(note.created_at).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default App;