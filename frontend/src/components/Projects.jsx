import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Server, Layout, Music, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { Github } from './BrandIcons';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [expandedProject, setExpandedProject] = useState(null);

  const projects = [
    {
      title: "Employee Management System",
      type: "Full-Stack Application",
      category: "fullstack",
      icon: <Server size={20} />,
      description: "Architected a Java full-stack application using Spring Boot REST APIs with a layered Controller-Service-Repository design adhering to SOLID principles. Built a React.js / Vite frontend supporting full CRUD operations and integrated database systems via MySQL.",
      tags: ["Java", "Spring Boot", "React.js", "MySQL", "REST API"],
      github: "https://github.com/Tanneeru-Nikhil",
      live: null
    },
    {
      title: "QTrip - Dynamic Travel Browsing",
      type: "Frontend Application",
      category: "frontend",
      icon: <Layout size={20} />,
      description: "Developed a dynamic multiplatform travel browsing application using React.js and Bootstrap. Consumed third-party REST APIs using async/await patterns to optimize response times and deployed live via Vercel.",
      tags: ["React.js", "Bootstrap", "REST API", "Vercel"],
      github: "https://github.com/Tanneeru-Nikhil",
      live: "https://qtripdynamic-sepia.vercel.app/"
    },
    {
      title: "User Management System",
      type: "Full-Stack Application",
      category: "fullstack",
      icon: <Server size={20} />,
      description: "User Management System (CRUD) with Node.js, Express, and MySQL (mysql2). Uses EJS for views. Features include full CRUD (Create, Read, Update, Delete) with basic password confirmation for updates/deletes, and method-override for PATCH requests.",
      tags: ["Node.js", "Express", "MySQL", "EJS", "CRUD"],
      github: "https://github.com/Tanneeru-Nikhil",
      live: "https://rest-class.vercel.app/"
    },
    {
      title: "Qtify — Music Streaming Platform",
      type: "Frontend Application",
      category: "frontend",
      icon: <Music size={20} />,
      description: "Qtify is a sleek, modern music streaming web application built to deliver an immersive audio browsing experience. Inspired by top-tier streaming services, it focuses on a highly visual, seamless, and responsive user interface that organizes music libraries into easily navigable sections.",
      tags: ["React.js", "Material-UI (MUI)", "Swiper.js", "JavaScript"],
      github: "https://github.com/Tanneeru-Nikhil",
      live: "https://qtify1-weld.vercel.app/",
      features: [
        "Dynamic Album Carousels: Seamlessly browse collections of albums using smooth Swiper.js.",
        "Grid Toggle View: Effortlessly toggle between compact carousel and expanded grid views.",
        "Genre-Based Filtering: Interactive tab system allows users to filter songs by specific genres.",
        "Expandable FAQ Section: Elegant, custom-styled accordion component for smooth user info."
      ]
    },
    {
      title: "UserAuthenticationSystem — Full-Stack Authentication",
      type: "Full-Stack Application",
      category: "fullstack",
      icon: <Lock size={20} />,
      description: "UserAuthenticationSystem is a secure, production-ready web application designed to handle complete user onboarding, security, and profile management. Built using a classic full-stack architecture, it ensures robust protection of user data.",
      tags: ["Node.js", "Express", "MySQL", "JWT", "BCrypt", "React.js"],
      github: "https://github.com/Tanneeru-Nikhil",
      live: null,
      features: [
        "JWT-Based Authorization: Securely manage user sessions and protect API endpoints.",
        "Secure Password Management: Utilizes strong BCrypt password hashing for encrypted storage.",
        "OTP Verification Module: Forgot/reset password system backed by One-Time Password verification."
      ]
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const toggleExpand = (title) => {
    if (expandedProject === title) {
      setExpandedProject(null);
    } else {
      setExpandedProject(title);
    }
  };

  return (
    <section className="py-24 bg-secondary/50 border-y border-white/5 relative z-10" id="projects">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Projects <span className="text-accent text-glow">Hub</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-accent mx-auto rounded-full mb-8"
          />

          {/* Category Filters */}
          <div className="flex justify-center gap-4 flex-wrap">
            {['all', 'fullstack', 'frontend'].map((cat) => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setExpandedProject(null); }}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  filter === cat 
                    ? 'bg-accent text-primary border-accent shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                    : 'bg-primary/50 text-textMuted border-white/5 hover:border-accent/30 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Projects' : cat === 'fullstack' ? 'Full-Stack' : 'Frontend'}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="glassmorphism p-6 rounded-3xl border border-white/5 hover:border-accent/30 transition-all duration-300 box-glow-hover flex flex-col h-full justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2 text-accent bg-accent/10 px-3 py-1.5 rounded-full text-xs font-medium">
                      {project.icon}
                      {project.type}
                    </div>
                    <div className="flex gap-2.5">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-primary rounded-full hover:text-accent hover:bg-white/5 transition-colors" title="GitHub Repository">
                          <Github size={18} />
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-2 bg-primary rounded-full hover:text-accent hover:bg-white/5 transition-colors" title="Live Demo">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-textMuted text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Expandable Key Features */}
                  {project.features && (
                    <div className="mb-6">
                      <button 
                        onClick={() => toggleExpand(project.title)}
                        className="flex items-center gap-1 text-xs text-accent hover:text-white font-semibold transition-colors focus:outline-none"
                      >
                        {expandedProject === project.title ? (
                          <>Hide Key Features <ChevronUp size={14} /></>
                        ) : (
                          <>Show Key Features <ChevronDown size={14} /></>
                        )}
                      </button>

                      <AnimatePresence>
                        {expandedProject === project.title && (
                          <motion.ul 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-3 space-y-2 text-xs text-textMuted/90 border-l border-accent/20 pl-3 overflow-hidden"
                          >
                            {project.features.map((feat, fIdx) => (
                              <li key={fIdx} className="list-disc list-inside leading-relaxed">
                                {feat}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-semibold px-2.5 py-0.5 bg-primary border border-accent/10 text-accent/90 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
