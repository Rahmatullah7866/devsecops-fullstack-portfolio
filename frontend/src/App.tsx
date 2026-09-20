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
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/notes/');
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      setNotes(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load notes');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      const res = await fetch('/api/notes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setTitle('');
      setContent('');
      fetchNotes();
    } catch (err: any) {
      setError(err.message || 'Could not save note');
    }
  };

  return (
    <div style={{ maxWidth: '720px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>SecureNotes Portal (DevSecOps Demo)</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          required
        />
        <textarea
          placeholder="Note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: '100%', padding: '10px', minHeight: '80px', marginBottom: '10px' }}
          required
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Save Secure Note
        </button>
      </form>

      <h2>Stored Notes</h2>
      {notes.map((note) => (
        <div key={note.id} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px' }}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <small>{new Date(note.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default App;