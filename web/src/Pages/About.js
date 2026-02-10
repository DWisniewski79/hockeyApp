import React from 'react';
import GetNavBar from '../components/Navbar';


export default function AboutLayout() {
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
    <div className="max-w-screen-md mx-auto px-4 pb-24 pt-4 text-brand-white bg-brand-black min-h-screen">
      {/* ------------------------------------------------ */}
      {/* THIS WEEK SECTION */}
      {/* ------------------------------------------------ */}
      <section className="mb-8">
        {/* Heading */}
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-lg font-bold text-brand-gold">This Week</h2>
          <span className="text-xs text-brand-white/60">Key info at a glance</span>
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



      {/* ------------------------------------------------ */}
      {/* LADDER SNAPSHOT */}
      {/* ------------------------------------------------ */}
      <section className="mb-8">
        <div className="flex items-baseline justify-between mb-3">
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

    </div>
  );
}
