import React, { useEffect, useState } from 'react';

export const Players = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://icehq.hockeysyte.com/api/players/player?player_id=21997&api_key=hYYUDGj632husuyq&format=json') // replace with your API URL
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>API Page</h2>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};