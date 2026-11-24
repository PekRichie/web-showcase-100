import React, { useMemo, useState } from 'react';

const INITIAL_ITEMS = [
  { id: 1, name: 'Savings Goals – Elsődleges modul', status: 'Aktív', metric: 94 },
  { id: 2, name: 'Savings Goals – Automatizált folyamat', status: 'Folyamatban', metric: 78 },
  { id: 3, name: 'Savings Goals – Jelentés & export', status: 'Kész', metric: 100 },
];

export default function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState('');

  const filtered = useMemo(
    () => items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase())),
    [items, query]
  );

  const avg = useMemo(
    () => (filtered.length ? Math.round(filtered.reduce((a, b) => a + b.metric, 0) / filtered.length) : 0),
    [filtered]
  );

  const add = () => {
    if (!draft.trim()) return;
    setItems([{ id: Date.now(), name: draft.trim(), status: 'Aktív', metric: 85 }, ...items]);
    setDraft('');
  };

  const toggle = (id) =>
    setItems(items.map((i) => (i.id === id ? { ...i, status: i.status === 'Kész' ? 'Aktív' : 'Kész' } : i)));

  return (
    <main>
      <div className="grid" style={{ marginBottom: 18 }}>
        <div className="card"><div className="muted">Aktív elemek</div><div className="kpi">{filtered.length}</div></div>
        <div className="card"><div className="muted">Átlagos mutató</div><div className="kpi">{avg}%</div></div>
      </div>
      <div className="card">
        <div className="row" style={{ marginTop: 0 }}>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Keresés..." style={{ flex: 1, minWidth: 180 }} />
          <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Új elem..." style={{ flex: 1, minWidth: 180 }} />
          <button onClick={add}>Hozzáadás</button>
        </div>
        <div className="list">
          {filtered.map((item) => (
            <div key={item.id} className="item">
              <div><strong>{item.name}</strong> <span className="pill">{item.metric}%</span></div>
              <button className="ghost" onClick={() => toggle(item.id)}>{item.status}</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
