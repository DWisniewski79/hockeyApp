import React from 'react';


    const HeroSection = () => {
        return(
            <section className="bg-cover bg-center h-[400px] flex items-center justify-center text-white" style={{ backgroundImage: "url('/ice-hockey-hero.jpg')" }}>
            <div className="text-center">
              <h1 className="text-4xl font-bold">Welcome to Happy's Hockey Club</h1>
              <p className="mt-2 text-lg">Amateur hockey with pro-level passion</p>
              <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl">See Our Schedule</button>
            </div>
            </section>);    
    }

