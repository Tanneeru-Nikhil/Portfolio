import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-primary/80 backdrop-blur-md border-b border-white/5 py-4 box-glow' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo NT */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg border-2 border-accent flex items-center justify-center font-bold text-accent text-lg tracking-wider transition-all duration-300 group-hover:bg-accent group-hover:text-primary group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            NT
          </div>
          <span className="text-white font-medium tracking-wide text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-0 group-hover:max-w-xs overflow-hidden whitespace-nowrap">
            Nikhil Tanneeru
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-textMuted hover:text-accent font-medium text-sm transition-colors relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-5 py-2 bg-accent/10 border border-accent/30 text-accent font-semibold rounded-full text-xs hover:bg-accent hover:text-primary hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300"
          >
            Contact Me
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-textMuted hover:text-white transition-colors focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-secondary border-b border-white/5 overflow-hidden absolute w-full left-0"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-textMuted hover:text-accent font-medium text-base py-1 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 bg-accent text-primary font-bold rounded-xl text-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
