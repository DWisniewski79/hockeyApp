import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Sample player data - you would replace this with your actual data
const samplePlayers = [
  { id: 1, name: 'John Smith', number: 21, position: 'Center', image: '/player1.jpg', stats: { goals: 12, assists: 24 } },
  { id: 2, name: 'Mike Johnson', number: 32, position: 'Goalie', image: '/player2.jpg', stats: { saves: 342, savePercentage: 0.923 } },
  { id: 3, name: 'David Lee', number: 8, position: 'Defenseman', image: '/player3.jpg', stats: { goals: 4, assists: 18 } },
  { id: 4, name: 'David Lee', number: 8, position: 'Defenseman', image: '/player3.jpg', stats: { goals: 4, assists: 18 } },
  { id: 5, name: 'David Lee', number: 8, position: 'Defenseman', image: '/player3.jpg', stats: { goals: 4, assists: 18 } },
  { id: 6, name: 'David Lee', number: 8, position: 'Defenseman', image: '/player3.jpg', stats: { goals: 4, assists: 18 } },
  { id: 7, name: 'David Lee', number: 8, position: 'Defenseman', image: '/player3.jpg', stats: { goals: 4, assists: 18 } },
  { id: 8, name: 'David Lee', number: 8, position: 'Defenseman', image: '/player3.jpg', stats: { goals: 4, assists: 18 } },
  { id: 9, name: 'David Lee', number: 8, position: 'Defenseman', image: '/player3.jpg', stats: { goals: 4, assists: 18 } },
  { id: 10, name: 'David Lee', number: 8, position: 'Defenseman', image: '/player3.jpg', stats: { goals: 4, assists: 18 } },
  { id: 11, name: 'David Lee', number: 8, position: 'Defenseman', image: '// player3.jpg', stats: { goals: 4, assists: 18 } },
  { id: 12, name: 'David Lee', number: 8, position: 'Defenseman', image: '/player3.jpg', stats: { goals: 4, assists: 18 } },
  { id: 13, name: 'David Lee', number: 8, position: 'Defenseman', image: '/player3.jpg', stats: { goals: 4, assists: 18 } },
  { id: 14, name: 'David Lee', number: 8, position: 'Defenseman', image: '/player3.jpg', stats: { goals: 4, assists: 18 } },

  // Add more players as needed
];

const TeamCarousel = () => {
  const [players, setPlayers] = useState(samplePlayers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState(players);
  
  useEffect(() => {
    // Filter players based on search term
    const results = players.filter(player =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.number.toString().includes(searchTerm)
    );
    setFilteredPlayers(results);
  }, [searchTerm, players]);
  
  // In a real app, you might fetch players from an API
  // useEffect(() => {
  //   const fetchPlayers = async () => {
  //     try {
  //       const response = await fetch('/api/players');
  //       const data = await response.json();
  //       setPlayers(data);
  //     } catch (error) {
  //       console.error('Error fetching players:', error);
  //     }
  //   };
  //   fetchPlayers();
  // }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (//The whole page
    <div class="min-h-screen bg-neutral-50 text-neutral-900 ">
      <div className= "section py-6 max-w-screen-xl px-6 m-auto bg-green-500 grid grid-cols-3 gap-6">
       
        <div className="team-carousel-container bg-blue-400 rounded-xl border border-neutral-300  col-span-2 p-4">
          <div className="team-carousel-content mt-4 bg-red-200 p-4 ">
            <div className="search-container mb-4 w-full flex justify-center items-center row-span-1 row-start-1 col-span-3">
              <input
                type="text"
                placeholder="Search players by name, position, or number..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          
          
            {players.length === 0 ? (
              <div className="no-results p-4 text-center">
                <p>No players found matching "{searchTerm}"</p>
              </div>
            ) : (
              <Swiper 
                modules={[Navigation, Pagination, A11y, EffectCards]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                effect="cards"
                cardsEffect={{ grabCursor: true, slideShadows: false }}
                //Below className is the styling for the swiper container
                className="team-carousel-meow"> 
                {players.map((player) => (
                  <SwiperSlide key={player.id}>
                    {<PlayerCard player={player} />}
                  </SwiperSlide>
                ))}
                {/* <SwiperSlide classname="Slide1">Howdy Slide 1</SwiperSlide>
                <SwiperSlide>Gday Slide 2</SwiperSlide>
                <SwiperSlide>Bonjour Slide 3</SwiperSlide> */}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayerCard = ({ player }) => {
  return (
    <div className="player-card bg-white rounded-lg shadow-md overflow-hidden mx auto max-w-xs">
      <div className="relative pb-3/4">
        <img 
          src={player.image} 
          alt={`${player.name}`}
          className="absolute h-full w-full object-cover"
          onError={(e) => {
            e.target.src = '/player-placeholder.jpg'; // Fallback image
          }}
        />
        <div className="absolute top-0 right-0 bg-amber-500 text-white font-bold px-3 py-1 rounded-bl-lg">
          #{player.number}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold">{player.name}</h3>
        <p className="text-gray-600">{player.position}</p>
        
        <div className="stats-container mt-2">
          <h4 className="text-sm font-semibold text-gray-700">Stats</h4>
          <div className="grid grid-cols-2 gap-1 mt-1">
            {player.position === 'Goalie' ? (
              <>
                <div className="stat-item">
                  <span className="text-xs text-gray-500">Saves</span>
                  <span className="text-sm font-medium">{player.stats.saves}</span>
                </div>
                <div className="stat-item">
                  <span className="text-xs text-gray-500">Save %</span>
                  <span className="text-sm font-medium">{player.stats.savePercentage.toFixed(3)}</span>
                </div>
              </>
            ) : (
              <>
                <div className="stat-item">
                  <span className="text-xs text-gray-500">Goals</span>
                  <span className="text-sm font-medium">{player.stats.goals}</span>
                </div>
                <div className="stat-item">
                  <span className="text-xs text-gray-500">Assists</span>
                  <span className="text-sm font-medium">{player.stats.assists}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <button className="w-full py-2 bg-gray-100 hover:bg-amber-500 hover:text-white transition-colors duration-300">
        View Profile
      </button>
    </div>
  );
};

export default TeamCarousel;