import React from 'react';
import { motion } from 'framer-motion';
import { Code, Award, Layers } from 'lucide-react';

const ProfileStats = () => {
  const stats = [
    {
      icon: <Code size={24} className="text-accent mb-4" />,
      title: "70+ LeetCode Problems Solved",
      desc: "Consistent problem solver with a strong grasp on DSA.",
      link: "https://leetcode.com/u/TanneeruNikhil/"
    },
    {
      icon: <Award size={24} className="text-accent mb-4" />,
      title: "Full-Stack Fellowship",
      desc: "Rigorous training at Crio.do focused on real-world building.",
      link: null
    },
    {
      icon: <Layers size={24} className="text-accent mb-4" />,
      title: "3+ Core Frameworks Mastered",
      desc: "Deep expertise in Spring Boot, React.js, and Node.js.",
      link: null
    }
  ];

  return (
    <section className="py-24 bg-secondary/30 border-y border-white/5 relative z-10" id="about">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Engineering <span className="text-accent">Excellence</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-textMuted text-lg leading-relaxed"
          >
            I am a results-driven Java Full-Stack Developer with a passion for writing clean, maintainable code. 
            I thrive in cross-functional environments, bridging the gap between robust backend systems and intuitive frontend experiences. 
            My approach is highly influenced by Gen-AI advancements, optimizing development workflows to deliver premium solutions faster.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {stat.link ? (
                <a href={stat.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <StatCard stat={stat} />
                </a>
              ) : (
                <div className="h-full">
                  <StatCard stat={stat} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ stat }) => (
  <div className="h-full p-8 glassmorphism rounded-2xl border border-white/5 hover:border-accent/30 transition-all duration-300 hover:-translate-y-2 box-glow-hover flex flex-col items-center text-center group cursor-pointer">
    <div className="p-4 bg-primary rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
      {stat.icon}
    </div>
    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-accent transition-colors">{stat.title}</h3>
    <p className="text-textMuted text-sm leading-relaxed">{stat.desc}</p>
  </div>
);

export default ProfileStats;
