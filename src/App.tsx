import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Moon, 
  ArrowRight, 
  Layers, 
  Zap, 
  Monitor, 
  Compass,
  Github,
  Twitter,
  Instagram,
  Menu,
  X
} from 'lucide-react';
import { ThreePrism } from './components/ThreePrism';

// --- Components ---

const Navbar = ({ theme, toggleTheme }: { theme: 'light' | 'dark', toggleTheme: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 glass-morph' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src={theme === 'dark' ? `${import.meta.env.BASE_URL}prism-logo-dark.png` : `${import.meta.env.BASE_URL}prism-logo-light.png`}
            alt="PRISM" 
            className="h-24 md:h-28 w-auto object-contain drop-shadow-lg"
          />
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-tight uppercase">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all ${theme === 'dark' ? 'border-white/20 text-white hover:bg-white/10' : 'border-black/10 text-prism-black hover:bg-black/5'}`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className={theme === 'dark' ? 'text-white' : 'text-prism-black'} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className={`fixed inset-0 z-[100] p-8 flex flex-col ${theme === 'dark' ? 'bg-prism-black text-white' : 'bg-prism-white text-prism-black'}`}
          >
            <div className="flex justify-between items-center mb-12">
              <img 
                src={theme === 'dark' ? `${import.meta.env.BASE_URL}prism-logo-dark.png` : `${import.meta.env.BASE_URL}prism-logo-light.png`}
                alt="PRISM" 
                className="h-20 w-auto object-contain"
              />
              <button onClick={() => setMobileMenuOpen(false)}>
                <X />
              </button>
            </div>
            <div className="flex flex-col gap-8 text-4xl font-display font-bold">
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SpectralBackground = ({ theme }: { theme: 'light' | 'dark' }) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className={`absolute inset-0 transition-colors duration-1000 ${theme === 'dark' ? 'bg-prism-black' : 'bg-prism-white'}`} />
      
      {/* Animated Gradients */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: theme === 'dark' ? [0.1, 0.2, 0.1] : [0.05, 0.1, 0.05],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-[20%] -left-[10%] w-full h-full rounded-full spectral-gradient blur-[120px]"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: theme === 'dark' ? [0.05, 0.15, 0.05] : [0.03, 0.08, 0.03],
          rotate: [45, 0, 45]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-[20%] -right-[10%] w-full h-full rounded-full spectral-gradient blur-[120px]"
      />
    </div>
  );
};

const HeroSection = ({ theme }: { theme: 'light' | 'dark' }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-end pb-32 px-6 relative overflow-hidden">
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] max-w-[800px] aspect-square flex items-center justify-center pointer-events-none">
        {/* The Prism Visual */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="relative w-full h-full opacity-30 pointer-events-none"
        >
          <div className={`absolute inset-0 border-[0.5px] rounded-full ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`} />
          <div className={`absolute inset-[10%] border-[0.5px] rounded-full ${theme === 'dark' ? 'border-white/10' : 'border-black/5'}`} />
        </motion.div>

        {/* Central Triangle Prism (Replaced with WebGL) */}
        <div className="absolute inset-0 z-10">
          <ThreePrism theme={theme} />
        </div>
      </div>

      <div className="z-20 text-center max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
        >
          <span className={`inline-block mb-6 text-sm font-mono tracking-widest uppercase py-1 px-3 border rounded-full ${theme === 'dark' ? 'text-white/60 border-white/20' : 'text-black/60 border-black/10'}`}>
            Initiating Sequence
          </span>
          <h1 className={`text-[12vw] md:text-9xl font-display font-bold leading-none tracking-tighter mb-8 ${theme === 'dark' ? 'text-white' : 'text-prism-black'}`}>
            COMING SOON
          </h1>
          <p className={`text-xl md:text-2xl font-light leading-relaxed mb-12 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            We are crafting something extraordinary. The spectrum will reveal itself shortly.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-[1px] h-12 relative overflow-hidden ${theme === 'dark' ? 'bg-white/20' : 'bg-black/10'}`}
        >
           <motion.div 
             animate={{ top: ['-100%', '100%'] }}
             transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
             className="absolute top-0 left-0 w-full h-1/2 spectral-gradient"
           />
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, theme }: any) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`glass-card p-10 rounded-[32px] border transition-colors group ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-12 relative z-10 ${theme === 'dark' ? 'bg-white text-prism-black' : 'bg-prism-black text-white'}`}>
        <Icon size={28} />
      </div>
      <h3 className={`text-2xl font-display font-bold mb-4 relative z-10 ${theme === 'dark' ? 'text-white' : 'text-prism-black'}`}>{title}</h3>
      <p className={`leading-relaxed relative z-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
    </motion.div>
  );
};

const Features = ({ theme }: { theme: 'light' | 'dark' }) => {
  const features = [
    {
      icon: Layers,
      title: "Atmospheric Depth",
      description: "Interfaces that respond to light, shadow, and movement, creating an immersive sense of space."
    },
    {
      icon: Zap,
      title: "Spectral Rendering",
      description: "Our proprietary engine diffracts standard aesthetics into high-fidelity visual spectrums."
    },
    {
      icon: Monitor,
      title: "Quantum UX",
      description: "User experiences that exist in multiple states simultaneously, adapting perfectly to every intent."
    }
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} theme={theme} />
        ))}
      </div>
    </section>
  );
};

const PortfolioSection = ({ theme }: { theme: 'light' | 'dark' }) => {
  return (
    <section className="py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className={`text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8 ${theme === 'dark' ? 'text-white' : 'text-prism-black'}`}>
          SPECTRAL <span className="italic font-light">WORKS</span>
        </h2>
        <div className={`w-24 h-1 spectral-gradient mb-12`} />
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {[
          { title: "Lumina OS", category: "OS Design", size: "tall" },
          { title: "Fractal Reality", category: "VR / Spatial", size: "wide" },
          { title: "Chrome Heart", category: "Hardware UI", size: "wide" },
          { title: "Obsidian Core", category: "Dev Experience", size: "tall" }
        ].map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02 }}
            className={`relative group rounded-[40px] overflow-hidden aspect-[4/3] bg-gradient-to-br transition-all ${theme === 'dark' ? 'from-white/10 to-transparent' : 'from-black/5 to-transparent'}`}
          >
            <div className={`absolute inset-0 bg-cover bg-center grayscale transition-all group-hover:grayscale-0 group-hover:scale-110 flex items-center justify-center opacity-60`}>
                <Layers size={100} className={theme === 'dark' ? 'text-white' : 'text-black'} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-10 left-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
               <p className="text-white/60 font-mono text-sm uppercase mb-2 tracking-widest">{item.category}</p>
               <h3 className="text-white text-4xl font-display font-bold">{item.title}</h3>
            </div>
            
            <div className={`absolute inset-0 flex items-center justify-center opacity-20 font-display font-bold text-3xl pointer-events-none capitalize ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
               {item.title}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Footer = ({ theme }: { theme: 'light' | 'dark' }) => {
  return (
    <footer className={`py-24 px-6 border-t font-sans ${theme === 'dark' ? 'border-white/10 text-white bg-prism-black' : 'border-prism-black bg-prism-white'}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="max-w-md">
          <div className="flex items-center mb-8">
            <img 
              src={theme === 'dark' ? `${import.meta.env.BASE_URL}prism-logo-dark.png` : `${import.meta.env.BASE_URL}prism-logo-light.png`}
              alt="PRISM" 
              className="h-32 md:h-40 w-auto object-contain drop-shadow-xl"
            />
          </div>
          <p className={`text-lg mb-12 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
            Redefining the digital horizon through high-performance spectral aesthetics and intuitive interaction.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-50 transition-opacity"><Twitter size={24} /></a>
            <a href="#" className="hover:opacity-50 transition-opacity"><Instagram size={24} /></a>
            <a href="#" className="hover:opacity-50 transition-opacity"><Github size={24} /></a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 uppercase text-sm font-bold tracking-widest">
           <div className="flex flex-col gap-6">
              <span className="opacity-30">PAGES</span>
              <a href="#" className="hover:opacity-50 transition-opacity">Work</a>
              <a href="#" className="hover:opacity-50 transition-opacity">About</a>
              <a href="#" className="hover:opacity-50 transition-opacity">Lab</a>
           </div>
           <div className="flex flex-col gap-6">
              <span className="opacity-30">LEGAL</span>
              <a href="#" className="hover:opacity-50 transition-opacity">Privacy</a>
              <a href="#" className="hover:opacity-50 transition-opacity">Terms</a>
           </div>
           <div className="flex flex-col gap-6">
              <span className="opacity-30">CONTACT</span>
              <a href="#" className="hover:opacity-50 transition-opacity">hello@prism.ai</a>
           </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 opacity-30 text-xs tracking-widest uppercase">
         © 2026 PRISM SPECTRAL STUDIOS. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${theme === 'dark' ? 'bg-prism-black text-white' : 'bg-prism-white text-prism-black'}`}>
      <SpectralBackground theme={theme} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <HeroSection theme={theme} />
      </main>

      <Footer theme={theme} />
    </div>
  );
}

