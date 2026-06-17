import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProfileStats from './components/ProfileStats';
import SkillMatrix from './components/SkillMatrix';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import ContactFooter from './components/ContactFooter';

function App() {
  return (
    <div className="bg-primary min-h-screen selection:bg-accent selection:text-primary">
      <Header />
      <Hero />
      <ProfileStats />
      <SkillMatrix />
      <Projects />
      <Timeline />
      <ContactFooter />
    </div>
  );
}

export default App;
