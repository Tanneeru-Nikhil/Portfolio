import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar } from 'lucide-react';

const Timeline = () => {
  const items = [
    {
      title: "Fellowship in Gen-AI Powered Full-Stack Development",
      institution: "Crio.do",
      period: "June 2025 - Present",
      type: "fellowship",
      details: "Intensive training building real-world scalable applications.",
    },
    {
      title: "Bachelor of Technology in Computer Science & Engineering",
      institution: "Sri Indu College of Engineering, Hyderabad",
      period: "2022 - 2025",
      type: "education",
      details: "CGPA: 7.4 (Passout in 2025)",
    },
    {
      title: "Diploma in Computer Engineering",
      institution: "Government Polytechnic, Nizamabad",
      period: "2019 - 2022",
      type: "education",
      details: "CGPA: 8.2",
    },
    {
      title: "High School (Class 10th)",
      institution: "Gowtham Model School, Nirmal",
      period: "Completed 2019",
      type: "education",
      details: "CGPA: 8.8 | Secondary School Certificate (SSC).",
    },
    {
      title: "Certifications",
      institution: "NPTEL & Scaler",
      period: "Completed",
      type: "certification",
      details: "Data Structures and Algorithms Using Java (NPTEL), Core Java (Scaler).",
    }
  ];

  return (
    <section className="py-24 relative z-10" id="experience">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Education & <span className="text-accent">Experience</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-accent mx-auto rounded-full"
          />
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Central Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 transform md:-translate-x-1/2" />

          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center mb-12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-[20px] md:left-1/2 w-10 h-10 bg-primary border-2 border-accent rounded-full transform -translate-x-1/2 flex items-center justify-center z-10 box-glow">
                {item.type === 'fellowship' ? <Award size={18} className="text-accent" /> :
                 item.type === 'certification' ? <Award size={18} className="text-accent" /> :
                 <GraduationCap size={18} className="text-accent" />}
              </div>

              {/* Content Box */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <div className="glassmorphism p-6 rounded-2xl border border-white/5 hover:border-accent/30 transition-colors box-glow-hover relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-accent transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                  
                  <div className="flex items-center gap-2 text-accent mb-2 text-sm font-medium">
                    <Calendar size={14} />
                    {item.period}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                  <h4 className="text-textMuted font-medium mb-3">{item.institution}</h4>
                  <p className="text-sm text-textMuted/80">{item.details}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
