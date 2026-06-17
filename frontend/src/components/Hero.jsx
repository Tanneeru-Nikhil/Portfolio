import React from 'react';
import { motion } from 'framer-motion';
import { Code2, GraduationCap, ArrowRight } from 'lucide-react';
import { Github, Linkedin, Instagram } from './BrandIcons';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const socialLinks = [
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/nikhil-tanneeru-25a79327b/" },
    { icon: <Github size={20} />, href: "https://github.com/Tanneeru-Nikhil" },
    { icon: <Instagram size={20} />, href: "https://www.instagram.com/__mr_ni_kill__/" },
    { icon: <Code2 size={20} />, href: "https://leetcode.com/u/TanneeruNikhil/" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1.5 rounded-full glassmorphism text-accent text-sm font-medium tracking-wider">
            PORTFOLIO
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            Nikhil <span className="text-accent text-glow">Tanneeru</span>
          </motion.h1>
          
          <motion.h2 
            variants={itemVariants}
            className="text-xl md:text-3xl text-textMuted font-light mb-10"
          >
            Java, MERN Full-Stack & Gen-AI Powered Developer
          </motion.h2>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <a href="#projects" className="group relative px-8 py-4 bg-accent text-primary font-semibold rounded-full overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105 flex items-center gap-2">
              <span className="relative z-10">View My Work</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a href="#experience" className="group px-8 py-4 glassmorphism text-textMain font-semibold rounded-full border border-accent/20 hover:border-accent/50 transition-all hover:bg-accent/10 flex items-center gap-2">
              <GraduationCap size={18} className="group-hover:scale-110 transition-transform" />
              Education & Experience
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-center gap-6">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glassmorphism rounded-full text-textMuted hover:text-accent hover:border-accent/50 transition-all hover:-translate-y-1 box-glow-hover"
              >
                {link.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements (Anti-gravity feel) */}
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-32 h-32 border border-accent/10 rounded-full pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-white/5 rounded-full pointer-events-none"
      />
    </section>
  );
};

export default Hero;
