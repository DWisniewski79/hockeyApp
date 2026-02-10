import {Line} from 'react-chartjs-2';
import {getDivision9GoalStats} from './GetHockeyStats.js';
import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const Division9LineChart  = () => {
const [chartData, setChartData] = useState(null);

useEffect(() => {
    getDivision9GoalStats('https://icehq.hockeysyte.com/api/players/player?player_id=22135&api_key=hYYUDGj632husuyq&format=json')
      .then(setChartData)
      .catch(console.error);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Goals per Season (Division 9)',
      },
    },
  };

  return (
    <div>
      <h2>Goals Over Time (Division 9)</h2>
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};