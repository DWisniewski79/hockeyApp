import React from 'react';
import smallMascot from '../../assets/SmallMascot.svg';
import medMascot from '../../assets/MedMascot.svg';
import lrgMascot from '../../assets/LrgMascot.svg';
//hasdioahsd

export default function ContentLayout() {
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

  const player =
    { name: "John Doe", goals: 12, assists: 8, points: 20, position: "Forward", rank: 1, stars: 5 };

  return (

    <div className="max-w-screen-md mx-auto px-4 pb-24 pt-4 text-brand-white bg-brand-black min-h-screen">
        
      {/* ------------------------------------------------ */}
      {/* LADDER SNAPSHOT */}
      {/* ------------------------------------------------ */}
      <section className="mt-4 mb-8 relative">
        <div className="absolute w-full inset-x-0 top-0 h-1 mb-4 bg-gradient-to-r from-brand-tealDark via-brand-teal to-brand-retroYellow"></div>
        <div className="flex items-baseline justify-between mb-3 mt-3 pt-4">
          <h2 className="text-lg font-bold text-brand-gold">Ladder Snapshot</h2>

          <a
            href="/teams"
            className="text-xs text-brand-white/60 hover:text-brand-teal transition"
          >
            View full ladder →
          </a>
        </div>

        <div className="bg-brand-grey rounded-xl border border-brand-greyLight p-4 shadow">

          {ladder.map((row, index) => (
            <div
              key={row.team}
              className={`flex justify-between items-center py-3 ${
                index !== ladder.length - 1 ? "border-b border-brand-greyLight" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-brand-white/40 font-bold">
                  #{row.position}
                </span>

                <span className="text-sm text-brand-white font-medium">
                  {row.team}
                </span>
              </div>

              <div className="text-xs text-brand-white/60">
                GP {row.played} • Pts {row.points}
              </div>
            </div>
          ))}

        </div>
      </section>

      

        <section className="relative mb-8">
            <div className="absolute w-full inset-x-0 top-0 h-1 mb-4 bg-gradient-to-r from-brand-retroYellow via-brand-purple to-brand-magenta"></div>
            {/* Heading */}
            <div className="flex items-baseline justify-between mb-3 mt-3 pt-4">
                <h2 className="text-lg font-bold text-brand-gold">Team Leaders</h2>
                <span className="text-xs text-brand-white/60">View Full Team Stats</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Next Game */}

                <div className="bg-brand-grey rounded-xl border border-brand-purple/40 p-4 shadow-lg hover:border-brand-magenta/60 transition group">
                    <div className="flex flex-row items-center justify-between">
                        
                        {/* Left Side: Info & Stats */}
                        <div className="flex flex-col gap-2">
                            <div>
                                <span className="text-xs uppercase tracking-wider font-bold text-brand-teal bg-brand-teal/10 px-2 py-1 rounded">
                                    Top Scorer
                                </span>
                                <h3 className="mt-2 text-xl font-bold text-brand-white">
                                    {player.name}
                                </h3>
                                <p className="text-sm text-brand-white/60">
                                    {player.position} • #{player.rank}
                                </p>
                            </div>

                            {/* Stat Grid - Easier to scan than a single line of text */}
                            <div className="flex items-center gap-4 mt-1">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-brand-white/50 uppercase">Goals</span>
                                    <span className="font-mono font-bold text-brand-white">{player.goals}</span>
                                </div>
                                <div className="w-px h-8 bg-brand-white/10"></div> {/* Vertical Divider */}
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-brand-white/50 uppercase">Assists</span>
                                    <span className="font-mono font-bold text-brand-white">{player.assists}</span>
                                </div>
                                <div className="w-px h-8 bg-brand-white/10"></div> {/* Vertical Divider */}
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-brand-teal uppercase font-bold">Points</span>
                                    <span className="font-mono font-bold text-brand-teal text-lg leading-none">{player.points}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Avatar */}
                        <div className="flex-shrink-0 ml-4">
                            <div 
                                className="w-20 h-20 bg-cover bg-center rounded-full border-2 border-brand-teal/50 shadow-md bg-brand-purple/20"
                                style={{ backgroundImage: `url(${medMascot})` }}
                            >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="relative mb-8">
            <div className="absolute w-full inset-x-0 top-0 h-1 mb-4 bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-teal"></div>
            {/* Heading */}
            <div className="flex items-baseline justify-between mb-3 mt-3 pt-4">
            <h2 className="text-lg font-bold text-brand-gold">Merch</h2>
            <span className="text-xs text-brand-white/60">Looking good</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Next Game */}
                <div className="bg-brand-grey rounded-xl border border-brand-purple/40 p-4 shadow hover:border-brand-magenta/60 transition">
                    <p className="text-xs uppercase tracking-wide font-bold text-brand-teal">
                    Next Game
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-brand-white">
                    vs {nextGame.opponent}
                    </h3>

                    <p className="text-sm text-brand-white/70 mt-1">
                    {nextGame.date} • {nextGame.time}
                    </p>

                    <p className="text-xs text-brand-white/50 mt-3">
                    Venue: {nextGame.venue}
                    </p>
                </div>

                {/* Last Result */}
                <div className="bg-brand-grey rounded-xl border border-brand-purple/40 p-4 shadow hover:border-brand-magenta/60 transition">
                    <p className="text-xs uppercase tracking-wide font-bold text-brand-magenta">
                    Last Result
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-brand-white">
                    {lastResult.result}: {lastResult.score}
                    </h3>

                    <p className="text-sm text-brand-white/70 mt-1">
                    vs {lastResult.opponent}
                    </p>

                    <p className="text-xs text-brand-white/50 mt-3">
                    {lastResult.date}
                    </p>
                </div>

            </div>
        </section>
    </div>
  );
}
