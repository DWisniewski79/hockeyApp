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
  // const [data, setData] = useState([]);

  // const getNextGame = async () => {
  //   try {
  //     const response = await fetch('https://icehq.hockeysyte.com/api/teams/team?team_id=1393&api_key=hYYUDGj632husuyq&format=json', {
  //       method: 'GET'
  //     });
  //     const json = await response.json();
  //     setData(json);
  //   } catch (error) {
  //     console.error('Error fetching next match:', error);
  //     return null;
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   getNextGame();
  // }, []);


  // if(!isLoading) {

  // let lastGame = data.games


  // const lastGameData = findLastResult(lastGame || []);  

  // console.log("Last Game Data:", lastGameData);

  // }

  const teamId = 1393;

    const nextGame = {
    opponent: "Thunder Wolves",
    date: "Sat 14 Jun",
    time: "7:30 PM",
    venue: "Local Ice Arena 1",
  };

  

  const lastResult = {
    opponent: "Frostbite Flyers",
    score: "4 - 2",
    result: "Win",
    date: "Sat 7 Jun",
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
                {lastResult.opponent}: {lastResult.score}
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