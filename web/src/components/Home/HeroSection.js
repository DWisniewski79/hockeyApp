import React, { useState, useEffect } from "react";
import Heading from "../../designSystem/Heading";
import Button from "../../designSystem/Button";
import Card from "../../designSystem/Card";
import logo from "../../assets/resizedMascot.svg";
export function HeroSection() {

  // const nextGame = {
  //   opponent: "Thunder Wolves",
  //   date: "Sat 14 Jun",
  //   time: "7:30 PM",
  //   venue: "Local Ice Arena 1",
  // };
  const [isLoading, setLoading] = useState(true);

    function useNextGame() {
      // Placeholder for future API call to fetch real team data
      const [data, setData] = useState(null);
      const [serverUrl, setServerUrl] = useState('http://192.168.0.203:8080/next-game');
  
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(serverUrl);
            const result = await response.json();
            setData(result);
            console.log('Fetched player data:', result);
  
          }
          catch (error) {
            console.error('Error fetching player data:', error);
          }
        };
  
        fetchData();
    }, []);
    return data;
  }

  var nextGameData = useNextGame();

  const teamId = 1393;

    const nextGame = {
    opponent: nextGameData?.next_game?.teams.find(team => team.team_id !== '1393')?.team_full_name || "Unknown Opponent",
    date: nextGameData?.next_game?.display_date || "Unknown Date",
    time: nextGameData?.next_game?.display_time || "Unknown Time",
    venue: nextGameData?.next_game?.location || "ICE HQ",
  };

  

// 1. Grab the game object to avoid repeated optional chaining
const game = nextGameData?.last_game;

// 2. Find "The Happys" specific team object to check if we were Home or Away
// Note: We check for "1" because you mentioned the variable is a string "0" or "1"
const myTeam = game?.teams?.find(team => team.team_id === '1393');
const isHome = myTeam?.is_home === "1"; 

// 3. Get the raw scores (defaulting to 0 if missing)
const homeScore = game?.game_result?.home_score || 0;
const awayScore = game?.game_result?.away_score || 0;

const lastResult = {
  // Find the opponent (the team that ISN'T 1393)
  opponent: game?.teams?.find(team => team.team_id !== '1393')?.team_full_name || "Unknown Opponent",
  
  // 4. Format Score: ALWAYS show "Us - Them"
  // If we were Home: "Home - Away"
  // If we were Away: "Away - Home"
  score: isHome ? `${homeScore} - ${awayScore}` : `${awayScore} - ${homeScore}`,
  
  // 5. Calculate Result
  // If the API returns the Winner's Team ID, your existing check is perfect.
  result: (game?.game_result?.winner === "home" && isHome) || (game?.game_result?.winner === "away" && !isHome) ? "Win" : "Loss", 
  
  date: game?.display_date || "Unknown Date",
};


  const ladder = [
    { team: "Mustangs", played: 10, points: 18, position: 2 },
    { team: "Thunder Wolves", played: 10, points: 20, position: 1 },
    { team: "Frostbite Flyers", played: 10, points: 16, position: 3 },
  ];
  return (
    <section className="relative w-full overflow-hidden bg-brand-black">

    
      

      {/* --------------------------------------------- */}
      {/* HERO MAIN CONTENT                              */}
      {/* --------------------------------------------- */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12 lg:py-20 grid gap-10 lg:grid-cols-2 items-center relative z-10">
              {/* --------------------------------------------- */}
      {/* DECORATIVE LOGO IN BACKGROUND                  */}
      {/* --------------------------------------------- */}


        

        {/* TEXT SIDE */}
        <div className="space-y-5">
          <Heading level={1} gradient className="leading-tight">
            Happy's Hockey Club
          </Heading>

          <p className="text-brand-white/70 max-w-lg text-sm sm:text-base">
            Welcome to the official home of Happy's Hockey Club — your source for
            schedules, match results, team updates, live streams, merch, and
            everything happening with Australia’s most electrifying amateur hockey team.
          </p>

          <div className="flex gap-3 flex-wrap pt-2">
            <Button variant="primary">Join the Team</Button>
            <Button variant="secondary">View Schedule</Button>
          </div>
        </div>

        {/* RIGHT RAIL (MEDIA CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          <Card variant="highlight" className="relative h-[180px] sm:h-[200px] lg:h-[220px] overflow-hidden">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            <p className="text-xs uppercase tracking-wide font-bold text-brand-teal">
              Next Game
            </p>

            <h3 className="mt-1 text-lg font-bold text-brand-white">
              vs {nextGame.opponent}
            </h3>

            <p className="text-sm text-brand-white/70 mt-1">
              {nextGame.date} • {nextGame.time}
            </p>

            <p className="text-sm text-brand-white/50 mt-3">
              Venue: {nextGame.venue}
            </p>
          </Card>

          <Card variant="highlight" className="relative h-[180px] sm:h-[200px] lg:h-[220px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <p className="text-xs uppercase tracking-wide font-bold text-brand-magenta">
                Last Result
              </p>

              <h3 className="mt-1 text-lg font-bold text-brand-white">
                {lastResult.result}: {lastResult.score}
              </h3>

              <p className="text-sm text-brand-white/70 mt-1">
                vs {lastResult.opponent}
              </p>

              <p className="text-sm text-brand-white/50 mt-3">
                {lastResult.date}
              </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

function findLastResult(games) {
  const completedGames = games.filter(game => game.game_result !== false);

  completedGames.sort((a, b) => a.integer_time - b.integer_time);

  const lastGame = completedGames.length > 0 ? completedGames[completedGames.length - 1] : null;

  return lastGame;
}


const getLastGameByIndex = (allGames, nextGame) => {
    // 1. Safety Check: If there is no next game (season over), this method breaks
    if (!nextGame) return null; 

    // 2. Find the index of the next game using the ID
    const nextGameIndex = allGames.findIndex(game => game.game_id === nextGame.game_id);

    // 3. Handle the "First Game of Season" edge case
    // If nextGame is at index 0, there IS no previous game (index -1)
    if (nextGameIndex <= 0) return null;

    // 4. Return the game at the previous index
    return allGames[nextGameIndex - 1];
}