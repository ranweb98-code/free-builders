import { useEffect, useState } from 'react';

function buildGrid() {
  const weeks = 30;
  const days = 7;
  const rows = [];
  for (let d = 0; d < days; d++) {
    const row = [];
    for (let w = 0; w < weeks; w++) {
      const rand = Math.random();
      let level = '';
      if (rand > 0.6) level = 'l1';
      if (rand > 0.75) level = 'l2';
      if (rand > 0.88) level = 'l3';
      if (rand > 0.95) level = 'l4';
      row.push(level);
    }
    rows.push(row);
  }
  return rows;
}

export default function ContribGrid() {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    setRows(buildGrid());
  }, []);

  if (!rows) {
    return <div className="contrib-title" style={{ opacity: 0.5 }}>Loading…</div>;
  }

  return (
    <div className="contribution-grid" id="contribGrid">
      <div className="contrib-title">Activity-style preview</div>
      <p className="contrib-sub">
        Decorative pattern inspired by contribution heatmaps—not live data from GitHub.
      </p>
      {rows.map((row, d) => (
        <div key={d} className="contrib-row">
          {row.map((level, w) => (
            <div key={w} className={`contrib-cell ${level}`} />
          ))}
        </div>
      ))}
    </div>
  );
}
