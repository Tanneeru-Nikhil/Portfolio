import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';

const ContactFooter = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('nikhiltanneeeru15@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const BACKEND_URL = import.meta.env.PROD 
        ? 'https://portfolio-y6r8.onrender.com' 
        : 'http://localhost:5000';

      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to send message.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Is the backend running?' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-secondary pt-24 pb-8 border-t border-white/5" id="contact">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-50" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              Let's Build Something <span className="text-accent text-glow block sm:inline">Amazing</span>
            </h2>
            <p className="text-textMuted text-lg mb-10 max-w-md leading-relaxed">
              I'm always open to discussing product design work, new projects, or opportunities to be part of your vision.
            </p>

            <div className="space-y-8 mb-10">
              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl glassmorphism border border-white/5 group-hover:border-accent/30 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] flex items-center justify-center text-accent transition-all duration-300">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm tracking-wider uppercase opacity-60 mb-1">Email</h4>
                  <div className="flex items-center gap-3">
                    <a 
                      href="mailto:nikhiltanneeeru15@gmail.com" 
                      className="text-white text-lg font-semibold hover:text-accent transition-colors"
                    >
                      nikhiltanneeeru15@gmail.com
                    </a>
                    <button 
                      onClick={copyEmail}
                      className="px-2.5 py-1 text-[10px] uppercase font-bold rounded-md bg-accent/10 border border-accent/20 text-accent hover:bg-accent hover:text-primary transition-all duration-300 focus:outline-none"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl glassmorphism border border-white/5 group-hover:border-accent/30 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] flex items-center justify-center text-accent transition-all duration-300">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm tracking-wider uppercase opacity-60 mb-1">Location</h4>
                  <a 
                    href="https://maps.google.com/?q=Hyderabad,India" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white text-lg font-semibold hover:text-accent transition-colors"
                  >
                    Hyderabad, India
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glassmorphism p-8 md:p-10 rounded-3xl border border-white/5 box-glow"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-textMuted mb-2">Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-textMuted mb-2">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-textMuted mb-2">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {status.message && (
                <div className={`p-3 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {status.message}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-accent text-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-accentHover transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/5 pt-12 pb-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Col 1: Brand / Quick Intro */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg border-2 border-accent flex items-center justify-center text-accent text-sm font-bold">NT</span>
              Nikhil Tanneeru
            </h3>
            <p className="text-textMuted text-xs leading-relaxed max-w-xs">
              Java, MERN Full-Stack & Gen-AI Powered Developer building high-performance, responsive web applications.
            </p>
          </div>

          {/* Col 2: Contact Details */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase opacity-60 mb-4">Contact Info</h4>
            <ul className="space-y-2.5 text-sm text-textMuted">
              <li className="flex items-center gap-2">
                <span className="text-accent">Mobile:</span>
                <a href="tel:+916302505814" className="hover:text-white transition-colors">+91 6302505814</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">Email:</span>
                <a href="mailto:nikhiltanneeeru15@gmail.com" className="hover:text-white transition-colors text-xs">nikhiltanneeeru15@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <a href="https://github.com/Tanneeru-Nikhil" target="_blank" rel="noopener noreferrer" className="p-2 glassmorphism rounded-full hover:text-accent transition-colors" title="GitHub">
                  <Github size={16} />
                </a>
                <a href="https://www.linkedin.com/in/nikhil-tanneeru-25a79327b/" target="_blank" rel="noopener noreferrer" className="p-2 glassmorphism rounded-full hover:text-accent transition-colors" title="LinkedIn">
                  <Linkedin size={16} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-textMuted">
          <p>© 2026 Nikhil Tanneeru. All rights reserved.</p>
          <p>Designed & Built with React & Node.js</p>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
