import React from 'react';
import {HeroSection} from '../components/Home/HeroSection.js'
import Example from '../components/Home/TestHero.js'
import GetNavBar from '../components/Navbar.js'
import {Layout} from '../components/Layout.js'
import ContentLayout from '../components/Home/MainContent.js';

const Home = () => {
  return (
    <>
      <HeroSection />
      <ContentLayout />
    </>
  );
};

export default Home;