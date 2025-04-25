import React from 'react';

export const HeroSection = () => {
  return (
    <section 
      className="bg-no-repeat flex items-center justify-center relative h-[400px] md:h-[80vh]"
      style={{ 
        backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.3) 100%),
          url(${require('../../assets/yellow_logo.png')})
        `,
        backgroundSize: 'contain',
        backgroundPosition: 'center 30%'
      }}
    >
      <div className="text-center z-10">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">Welcome to Happy's Hockey Club</h1>
        <p className="mt-2 text-lg text-amber-200 font-medium">EST. 2025</p>
        <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white transition-all duration-300 transform hover:scale-105">
          See Our Schedule
        </button>
      </div>
    </section>
  );
}
