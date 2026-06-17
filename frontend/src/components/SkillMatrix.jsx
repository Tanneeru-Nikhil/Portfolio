import React from 'react';
import { motion } from 'framer-motion';

const SkillMatrix = () => {
  const skillCategories = [
    {
      title: "Languages",
      skills: ["Java (Core & OOP)", "JavaScript (ES6+)", "HTML5", "CSS3"]
    },
    {
      title: "Frameworks & Libraries",
      skills: ["Spring Boot", "Spring Framework", "React.js", "Node.js", "Express.js", "Vite", "Bootstrap"]
    },
    {
      title: "Databases & Tools",
      skills: ["MySQL", "REST API Design", "Swagger (OpenAPI)", "Postman", "Maven", "Git/GitHub"]
    },
    {
      title: "Core Concepts",
      skills: ["Data Structures & Algorithms", "OOPS", "Layered Architecture", "Prompt Engineering"]
    }
  ];

  return (
    <section className="py-24 relative z-10" id="skills">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Technical <span className="text-accent">Skill Matrix</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-accent mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glassmorphism p-8 rounded-2xl border border-accent/20 hover:border-accent/60 transition-colors group relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
              
              <h3 className="text-xl font-semibold text-white mb-6 relative z-10">{category.title}</h3>
              <div className="flex flex-wrap gap-3 relative z-10">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="px-4 py-2 bg-primary/80 border border-white/10 rounded-lg text-sm text-textMuted group-hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillMatrix;
