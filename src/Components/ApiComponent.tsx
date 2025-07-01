import { useState } from 'react';

const ApiComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://catfact.ninja/facts');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Get Cat Facts'}
      </button>

      {data && (
        <div style={{ background: 'green', color: 'white', padding: '10px', margin: '10px 0' }}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ background: 'red', color: 'white', padding: '10px', margin: '10px 0' }}>
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default ApiComponent;