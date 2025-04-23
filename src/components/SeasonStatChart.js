import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import statsData from './Juzzy.json';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  {
    id: 'backgroundColorPlugin',
    beforeDraw: (chart, args, options) => {
      const { ctx, width, height } = chart;
      ctx.save();
      ctx.fillStyle = options.color || '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }
  }
);

const statMap = {
  "101": "Goals",
  "102": "Assists",
  "103": "Points",
  "116": "Games Played",
  "117": "PPG"
};

const statColors = {
  Goals: { main: 'rgb(255, 99, 132)', light: 'rgba(255, 99, 132, 0.1)' },
  Assists: { main: 'rgb(54, 162, 235)', light: 'rgba(54, 162, 235, 0.1)' },
  Points: { main: 'rgb(255, 206, 86)', light: 'rgba(255, 206, 86, 0.1)' },
  GamesPlayed: { main: 'rgb(92, 73, 161)', light: 'rgba(75, 192, 192, 0.1)' },
  PPG: { main: 'rgb(75, 192, 192)', light: 'rgba(75, 192, 192, 0.1)' }
};

const extractSeasonStats = (data) => {
  const stats = [];

  for (const division of Object.values(data.career_divisions || {})) {
    if (division.cluster_name !== "Rec League") continue;

    for (const [seasonId, season] of Object.entries(division.seasons || {})) {
        if(season.positions[0].type === "Staff") continue;
        if(season.season_info.season_name === "Winter 2025") continue;
      const seasonName = season.season_info?.season_name || `Season ${seasonId}`;
      const gameTypes = { E: 'Exhibition', R: 'Regular', P: 'Playoff' };

      for (const key in gameTypes) {
        const gameStats = season.stats?.[key];
        if (!gameStats) continue;

        for (const statId in gameStats) {
          if (statMap[statId]) {
            stats.push({
              season: seasonName,
              seasonId: Number(seasonId),
              type: gameTypes[key],
              stat: statMap[statId],
              value: parseFloat(gameStats[statId])
            });
          }
        }
      }
    }
  }

  return stats.sort((a, b) => a.seasonId - b.seasonId);
};

const formatForChartJS = (statName, data) => {
  const filtered = data
    .filter(s => s.stat === statName && s.type === "Regular");

  const color = statColors[statName]?.main || 'rgb(99, 102, 241)';
  const bg = statColors[statName]?.light || 'rgba(99, 102, 241, 0.1)';

  const chartData = {
    labels: filtered.map(s => s.season),
    datasets: [
      {
        label: statName,
        data: filtered.map(s => s.value),
        fill: false,
        tension: 0.3,
        borderColor: color,
        backgroundColor: color,
        pointBackgroundColor: color,
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `${statName} Over Seasons`,
        color: color,
        font: { size: 18, weight: 'bold' }
      },
      legend: {
        labels: {
          color: color
        }
      },
      tooltip: {
        backgroundColor: color,
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: bg,
        borderWidth: 1
      },
      backgroundColorPlugin: {
        color: '#f0f4ff' // light canvas background
      }
    },
    scales: {
      x: {
        ticks: { color },
        grid: { color: bg }
      },
      y: {
        ticks: { color },
        grid: { color: bg }
      }
    }
  };

  return { chartData, chartOptions };
};

const SeasonStatChart = () => {
  const extractedStats = extractSeasonStats(statsData);
  const [selectedStat, setSelectedStat] = useState("Goals");

  const { chartData, chartOptions } = formatForChartJS(selectedStat, extractedStats);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-gradient-to-br from-indigo-100 to-purple-100 shadow-xl rounded-2xl p-6 border border-indigo-200">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4 tracking-tight">
          {selectedStat} Over Seasons
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-indigo-700 mb-1">
            Select stat:
          </label>
          <select
            value={selectedStat}
            onChange={(e) => setSelectedStat(e.target.value)}
            className="w-full border border-indigo-300 rounded-lg p-2 text-indigo-800 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {Object.values(statMap).map((stat) => (
              <option key={stat} value={stat}>
                {stat}
              </option>
            ))}
          </select>
        </div>

        <div key={selectedStat} className="transition-opacity duration-500 ease-in-out opacity-0 animate-fade-in">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default SeasonStatChart;
