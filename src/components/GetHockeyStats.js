export async function getDivision9GoalStats(apiUrl) {
    const res = await fetch(apiUrl);
    console.log(res);
    const json = await res.json();
    
  
    const division9 = json.career_divisions["46"].seasons;
  
    const labels = [];
    const goals = [];
  
    for (const seasonId in division9) {
      const season = division9[seasonId];
      const name = season.season_info.season_name;
      const goalCount = Number(season.stats.R["101"]);
  
      labels.push(name);
      goals.push(goalCount);
    }
  
    return {
      labels,
      datasets: [
        {
          label: 'Goals per Season (Division 9)',
          data: goals,
          borderColor: 'rgb(75, 192, 192)',
          fill: false,
        },
      ],
    };
  }
  