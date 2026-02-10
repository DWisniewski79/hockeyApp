import React from 'react';
import smallMascot from '../../assets/SmallMascot.svg';
import medMascot from '../../assets/MedMascot.svg';
import lrgMascot from '../../assets/LrgMascot.svg';

export default function ContentLayout() {
  // 1. DATA: Team Leaders Configuration
  // We use this array to generate the 3 cards dynamically
  const leaders = [
    {
      category: "Top Goal Scorer",
      accentColor: "text-brand-teal", 
      borderColor: "border-brand-teal",
      player: "C. McDavid",
      number: "97",
      position: "C",
      mainStat: { label: "Goals", value: "64" }, 
      subStats: [ { label: "Assists", value: "89" }, { label: "Points", value: "153" } ]
    },
    {
      category: "Assist Leader",
      accentColor: "text-brand-magenta",
      borderColor: "border-brand-magenta",
      player: "N. Kucherov",
      number: "86",
      position: "RW",
      mainStat: { label: "Assists", value: "83" },
      subStats: [ { label: "Goals", value: "30" }, { label: "Points", value: "113" } ]
    },
    {
      category: "Top Goaltender",
      accentColor: "text-blue-400",
      borderColor: "border-blue-400",
      player: "I. Shesterkin",
      number: "31",
      position: "G",
      mainStat: { label: "Save %", value: ".926" },
      subStats: [ { label: "GAA", value: "2.04" }, { label: "Wins", value: "37" } ]
    }
  ];


  // 2. DATA: Existing Ladder & Game Data
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

      {/* ------------------------------------------------ */}
      {/* TEAM LEADERS (Updated) */}
      {/* ------------------------------------------------ */}
      <section className="relative mb-8">
            <div className="absolute w-full inset-x-0 top-0 h-1 mb-4 bg-gradient-to-r from-brand-retroYellow via-brand-purple to-brand-magenta"></div>
            
            <div className="flex items-baseline justify-between mb-3 mt-3 pt-4">
                <h2 className="text-lg font-bold text-brand-gold">Team Leaders</h2>
                <a href="/stats" className="text-xs text-brand-white/60 hover:text-brand-teal transition">
                    View Full Team Stats →
                </a>
            </div>

            {/* Changed to grid-cols-3 for Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {leaders.map((leader, index) => (
                    <div 
                        key={index}
                        className={`
                            bg-brand-grey rounded-xl border p-4 shadow-lg relative overflow-hidden group transition-all duration-300
                            border-brand-purple/40 hover:border-opacity-100 hover:-translate-y-1
                            ${leader.borderColor}
                        `}
                    >
                        <div className="flex flex-col h-full justify-between">
                            
                            {/* Top Row: Info & Avatar */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded bg-white/5 ${leader.accentColor}`}>
                                        {leader.category}
                                    </span>
                                    <h3 className="mt-2 text-lg font-bold text-brand-white leading-tight">
                                        {leader.player}
                                    </h3>
                                    <p className="text-xs text-brand-white/60 font-mono">
                                        #{leader.number} • {leader.position}
                                    </p>
                                </div>

                                {/* Avatar */}
                                <div className="flex-shrink-0 ml-2">
                                    <div 
                                        className={`w-14 h-14 rounded-full bg-brand-purple/20 border-2 shadow-md bg-cover bg-center ${leader.borderColor}`}
                                        style={{ backgroundImage: `url(${medMascot})` }}
                                    >
                                    </div>
                                </div>
                            </div>

                            {/* Middle Row: The BIG Stat */}
                            <div className="mt-4 flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-brand-white font-mono tracking-tighter">
                                    {leader.mainStat.value}
                                </span>
                                <span className={`text-xs font-bold uppercase tracking-wide ${leader.accentColor}`}>
                                    {leader.mainStat.label}
                                </span>
                            </div>

                            {/* Bottom Row: Secondary Stats */}
                            <div className="mt-3 pt-3 border-t border-brand-white/10 flex gap-4">
                                {leader.subStats.map((stat, i) => (
                                    <div key={i} className="flex flex-col">
                                        <span className="text-[10px] text-brand-white/40 uppercase font-bold">{stat.label}</span>
                                        <span className="text-sm font-mono font-bold text-brand-white/90">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </section>

        {/* ------------------------------------------------ */}
        {/* MERCH (Placeholder for now) */}
        {/* ------------------------------------------------ */}
        <section className="relative mb-8">
            <div className="absolute w-full inset-x-0 top-0 h-1 mb-4 bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-teal"></div>
            
            <div className="flex items-baseline justify-between mb-3 mt-3 pt-4">
                <h2 className="text-lg font-bold text-brand-gold">Merch</h2>
                <span className="text-xs text-brand-white/60">Looking good</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Next Game (Placeholder for Merch Item 1) */}
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

                {/* Last Result (Placeholder for Merch Item 2) */}
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