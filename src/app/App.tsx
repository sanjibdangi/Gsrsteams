import { useState, useEffect } from 'react';
import { Shield, Eye, Users, Clock, CheckCircle, Award, MapPin, Phone, Mail, ArrowRight, Menu, X, Lock, Zap, AlertTriangle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [stats, setStats] = useState({ clients: 0, officers: 0, response: 0, satisfaction: 0 });
  const [countersVisible, setCountersVisible] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setShowFloatingCTA(window.scrollY > 800);
      
      const sections = ['home', 'about', 'services', 'differentiators', 'performance', 'corporate', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);

      const statsElement = document.getElementById('stats-section');
      if (statsElement && !countersVisible) {
        const rect = statsElement.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setCountersVisible(true);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [countersVisible]);

  useEffect(() => {
    if (countersVisible) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      const targets = { clients: 500, officers: 100, response: 24, satisfaction: 98 };
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        setStats({
          clients: Math.floor(targets.clients * progress),
          officers: Math.floor(targets.officers * progress),
          response: Math.floor(targets.response * progress),
          satisfaction: Math.floor(targets.satisfaction * progress)
        });
        if (currentStep >= steps) {
          setStats(targets);
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [countersVisible]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const services = [
    {
      id: 0,
      label: 'Armed Security',
      icon: <Shield className="w-5 h-5" />,
      color: 'red',
      image: 'https://images.unsplash.com/photo-1652148555073-4b1d2ecd664c?w=800',
      title: 'Armed Security',
      subtitle: 'Elite Protection for High-Risk Operations',
      description: 'Our elite armed security officers provide military-grade protection for sensitive operations, high-value assets, and executive personnel.',
      features: [
        { title: 'Executive & VIP Protection', desc: 'Personal security details for high-profile individuals' },
        { title: 'High-Value Asset Security', desc: 'Comprehensive protection for critical infrastructure and assets' },
        { title: 'Threat Assessment & Mitigation', desc: 'Proactive risk analysis and security planning' },
        { title: 'Mobile Armed Patrols', desc: '24/7 roving security teams across your facilities' },
        { title: 'Emergency Response Teams', desc: 'Rapid deployment for critical security incidents' },
        { title: 'Event Security Management', desc: 'Comprehensive protection for large-scale events' }
      ]
    },
    {
      id: 1,
      label: 'Unarmed Security',
      icon: <Users className="w-5 h-5" />,
      color: 'slate',
      image: 'https://images.unsplash.com/photo-1724343025504-3afb6d67566b?w=800',
      title: 'Unarmed Security',
      subtitle: 'Professional Presence & Access Control',
      description: 'Trained security professionals providing visible deterrence and comprehensive facility protection without armed presence.',
      features: [
        { title: 'Corporate Facility Security', desc: 'Professional security presence for office buildings and campuses' },
        { title: 'Event & Concert Protection', desc: 'Crowd management and access control for large gatherings' },
        { title: 'Access Control Systems', desc: 'Entry point management and visitor screening' },
        { title: 'Visitor Management', desc: 'Professional reception and guest coordination' },
        { title: 'Loss Prevention Services', desc: 'Retail and commercial theft deterrence' },
        { title: 'Patrol & Monitoring', desc: 'Regular facility inspections and reporting' }
      ]
    },
    {
      id: 2,
      label: 'Surveillance',
      icon: <Eye className="w-5 h-5" />,
      color: 'blue',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800',
      title: 'Surveillance & Monitoring',
      subtitle: '24/7 Advanced Technology Systems',
      description: 'State-of-the-art surveillance technology with real-time monitoring, threat detection, and rapid alarm response capabilities.',
      features: [
        { title: 'CCTV & Camera Systems', desc: 'High-definition camera installation and management' },
        { title: 'Remote Monitoring Centers', desc: '24/7 surveillance from our command centers' },
        { title: 'Alarm Response Services', desc: 'Immediate response to security system alerts' },
        { title: 'Real-Time Analytics', desc: 'AI-powered threat detection and pattern recognition' },
        { title: 'Video Surveillance', desc: 'Comprehensive recording and footage management' },
        { title: 'Perimeter Security', desc: 'Advanced intrusion detection systems' }
      ]
    },
    {
      id: 3,
      label: 'Rapid Response',
      icon: <Zap className="w-5 h-5" />,
      color: 'orange',
      image: 'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?w=800',
      title: 'Rapid Response',
      subtitle: 'Emergency Deployment Teams',
      description: 'Our rapid response units deploy within 15-30 minutes for critical security emergencies with guaranteed availability 24/7/365.',
      features: [
        { title: '15-30 Minute Response Time', desc: 'Guaranteed rapid deployment across Nevada' },
        { title: 'Mobile Patrol Units', desc: 'Fully equipped roving security teams' },
        { title: '24/7 Emergency Availability', desc: 'Round-the-clock readiness for critical incidents' },
        { title: 'Crisis Management', desc: 'Expert coordination during security emergencies' },
        { title: 'Emergency Coordination', desc: 'Liaison with law enforcement and first responders' },
        { title: 'Incident Response Teams', desc: 'Specialized teams for various threat scenarios' }
      ]
    }
  ];

  const activeServiceData = services[activeService];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      
      {/* Desktop Header with Horizontal Navigation */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div onClick={() => scrollToSection('home')} className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div className="text-xl font-bold">GSRS</div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center gap-8">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'services', label: 'Services' },
              { id: 'differentiators', label: 'Differentiators' },
              { id: 'performance', label: 'Past Performance' },
              { id: 'corporate', label: 'Corporate Data' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-semibold transition-colors ${
                  activeSection === item.id ? 'text-red-500' : 'text-white hover:text-red-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div className="text-xl font-bold">GSRS</div>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="bg-black border-t border-white/10">
            <div className="px-6 py-4 space-y-4">
              {['home', 'about', 'services', 'differentiators', 'performance', 'corporate', 'contact'].map((section) => (
                <button key={section} onClick={() => scrollToSection(section)} className="block w-full text-left text-lg capitalize py-2 hover:text-red-500 transition-colors">
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* HERO - Split Screen with Diagonal Cut */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16 lg:pt-0">
        {/* Diagonal Background Split */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-slate-900" style={{ clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0 100%)' }}></div>
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1761064392859-2bfa734e9f3f?w=1080"
              alt="Security"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          
          {/* Animated Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-red-500/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 px-4 py-2 rounded-full mb-6">
              <Zap className="w-4 h-4 text-red-400" />
              <span className="text-red-300 text-sm font-bold tracking-wider">NEVADA'S ELITE SECURITY</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none max-w-3xl">
              <div className="flex justify-between text-white mb-2">
                {['S','E','C','U','R','E'].map((letter, idx) => <span key={idx}>{letter}</span>)}
              </div>
              <div className="flex justify-between text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-2">
                {['D','E','F','E','N','D'].map((letter, idx) => <span key={idx}>{letter}</span>)}
              </div>
              <div className="flex justify-between text-white">
                {['P','R','O','T','E','C','T'].map((letter, idx) => <span key={idx}>{letter}</span>)}
              </div>
            </h1>

            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-lg">
              Elite armed & unarmed security solutions. Government-grade protection for corporations and high-value assets.
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollToSection('contact')} className="group relative px-8 py-4 bg-red-600 text-white font-bold rounded-full overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  GET PROTECTED
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <button onClick={() => scrollToSection('services')} className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all">
                VIEW SERVICES
              </button>
            </div>
          </div>

          {/* Right Side - Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Shield />, label: '24/7', desc: 'Protection', color: 'from-red-600 to-red-800' },
              { icon: <Users />, label: '500+', desc: 'Clients', color: 'from-orange-600 to-red-600' },
              { icon: <CheckCircle />, label: '100%', desc: 'Licensed', color: 'from-red-800 to-slate-800' },
              { icon: <Zap />, label: '15min', desc: 'Response', color: 'from-slate-700 to-black' }
            ].map((stat, idx) => (
              <div key={idx} className={`relative group`}>
                <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity rounded-2xl blur-xl" style={{ background: stat.color }}></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-red-500/50 transition-all">
                  <div className="text-red-500 mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold mb-1">{stat.label}</div>
                  <div className="text-sm text-slate-400 uppercase tracking-wider">{stat.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT - Glassmorphism Cards with Overlap */}
      <section id="about" className="relative py-20 bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Floating Image Cards */}
            <div className="relative h-[600px] hidden lg:block">
              <div className="absolute top-0 left-0 w-72 h-96 rounded-3xl overflow-hidden border-4 border-red-500 shadow-2xl shadow-red-500/20 rotate-6 hover:rotate-0 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1652148555073-4b1d2ecd664c?w=400" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-72 h-80 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl -rotate-6 hover:rotate-0 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1724343025504-3afb6d67566b?w=400" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-red-600/20 blur-3xl"></div>
            </div>

            {/* Content */}
            <div>
              <div className="inline-block">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-transparent"></div>
                  <span className="text-red-500 font-bold tracking-[0.3em] text-sm">ABOUT GSRS</span>
                </div>
              </div>

              <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Nevada's Most <span className="text-red-500">Trusted</span> Security Force
              </h2>

              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                Founded in 2015, GSRS delivers military-grade security solutions across Nevada. We specialize in armed operations, advanced surveillance, and risk mitigation for government, corporate, and high-net-worth clients.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Shield />, title: 'Licensed & Bonded', desc: 'All officers are Nevada-certified professionals' },
                  { icon: <Eye />, title: 'AI-Powered Surveillance', desc: 'Next-gen monitoring with 24/7 threat detection' },
                  { icon: <AlertTriangle />, title: 'Rapid Response', desc: 'Mobile units deploy in 15-30 minutes' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-bold mb-1">{item.title}</div>
                      <div className="text-sm text-slate-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES - WOW FACTOR DESIGN */}
      <section id="services" className="relative min-h-screen py-20 bg-black overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-red-600/10 border border-red-500/30 px-6 py-2 rounded-full mb-6">
              <Lock className="w-4 h-4 text-red-500" />
              <span className="text-red-500 font-bold tracking-wider text-sm">OUR SECURITY ARSENAL</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              Elite <span className="text-red-500">Protection</span> Services
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Click each service to explore our comprehensive security solutions
            </p>
          </div>

          {/* Service Tabs */}
          <div className="flex justify-center gap-4 mb-16 flex-wrap">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`group relative px-8 py-4 rounded-full font-bold transition-all duration-300 ${
                  activeService === service.id
                    ? 'bg-red-600 text-white scale-110'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  {service.icon}
                  {service.label}
                </span>
                {activeService === service.id && (
                  <div className="absolute inset-0 bg-red-600 rounded-full blur-xl opacity-50 -z-10"></div>
                )}
              </button>
            ))}
          </div>

          {/* Service Content - Full Width Split Screen */}
          <div className="relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image Side */}
              <div className="relative h-[600px] rounded-3xl overflow-hidden group">
                <img 
                  src={activeServiceData.image}
                  alt={activeServiceData.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <div className={`w-24 h-24 ${
                    activeServiceData.color === 'red' ? 'bg-red-600' :
                    activeServiceData.color === 'slate' ? 'bg-slate-700' :
                    activeServiceData.color === 'blue' ? 'bg-blue-600' :
                    'bg-orange-600'
                  } rounded-2xl flex items-center justify-center mb-6 shadow-2xl`}>
                    <div className="text-white scale-[2.5]">{activeServiceData.icon}</div>
                  </div>
                  <h3 className="text-5xl font-black mb-3">{activeServiceData.title}</h3>
                  <p className="text-xl text-slate-300">{activeServiceData.subtitle}</p>
                </div>
              </div>

              {/* Content Side */}
              <div>
                <p className="text-2xl text-slate-300 mb-8 leading-relaxed">
                  {activeServiceData.description}
                </p>

                <div className="space-y-6 mb-10">
                  {activeServiceData.features.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 group/item">
                      <div className={`w-12 h-12 ${
                        activeServiceData.color === 'red' ? 'bg-red-600/20 group-hover/item:bg-red-600' :
                        activeServiceData.color === 'slate' ? 'bg-slate-600/20 group-hover/item:bg-slate-600' :
                        activeServiceData.color === 'blue' ? 'bg-blue-600/20 group-hover/item:bg-blue-600' :
                        'bg-orange-600/20 group-hover/item:bg-orange-600'
                      } rounded-xl flex items-center justify-center flex-shrink-0 transition-all`}>
                        <CheckCircle className={`w-6 h-6 ${
                          activeServiceData.color === 'red' ? 'text-red-500' :
                          activeServiceData.color === 'slate' ? 'text-slate-400' :
                          activeServiceData.color === 'blue' ? 'text-blue-400' :
                          'text-orange-500'
                        } group-hover/item:text-white`} />
                      </div>
                      <div>
                        <div className="text-lg font-bold mb-1">{item.title}</div>
                        <div className="text-sm text-slate-400">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => scrollToSection('contact')} 
                  className={`px-10 py-5 ${
                    activeServiceData.color === 'red' ? 'bg-red-600 hover:bg-red-700 shadow-red-600/50' :
                    activeServiceData.color === 'slate' ? 'bg-slate-700 hover:bg-slate-600 shadow-slate-600/50' :
                    activeServiceData.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/50' :
                    'bg-orange-600 hover:bg-orange-700 shadow-orange-600/50'
                  } text-white font-black text-lg rounded-full transition-all shadow-2xl`}
                >
                  REQUEST {activeServiceData.label.toUpperCase()}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS - Cards with 3D Tilt Effect */}
      <section id="differentiators" className="relative py-20 bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">
              Why Choose <span className="text-red-500">GSRS</span>
            </h2>
            <p className="text-slate-400 text-xl">Elite capabilities that set us apart</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Shield />, title: 'Licensed Professionals', desc: 'All officers are fully licensed, bonded, and insured' },
              { icon: <Award />, title: 'Certified Training', desc: 'Ongoing professional development and certification' },
              { icon: <Clock />, title: '24/7 Availability', desc: 'Round-the-clock protection and emergency response' },
              { icon: <Eye />, title: 'Advanced Technology', desc: 'State-of-the-art surveillance and monitoring systems' },
              { icon: <Users />, title: 'Experienced Team', desc: 'Veterans and law enforcement professionals' },
              { icon: <Lock />, title: 'Risk Management', desc: 'Comprehensive threat assessment and mitigation' }
            ].map((cap, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-red-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-red-500/50 transition-all hover:-translate-y-2 duration-300">
                  <div className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center text-red-500 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all">
                    {cap.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{cap.title}</h3>
                  <p className="text-slate-400">{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAST PERFORMANCE */}
      <section id="performance" className="relative py-20 bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Past <span className="text-red-500">Performance</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl">
              GSRS has led large-scale security operations including a $32M transit security contract for the Southern Nevada RTC, managing over 200 personnel, and residential security services for a Nevada HOA covering up to 1,000 homes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* RTC Project */}
            <div className="group relative">
              <div className="absolute inset-0 bg-red-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-red-500/50 transition-all h-full">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl font-black text-white">
                    RTC
                  </div>
                  <div>
                    <div className="text-sm text-red-400 uppercase tracking-wider mb-2">Agency</div>
                    <h3 className="text-2xl font-bold mb-1">Southern Nevada Regional Transportation Commission</h3>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-slate-400">Project:</span>
                    <span className="text-white ml-2 font-semibold">Security Guard Services</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Dates:</span>
                    <span className="text-white ml-2 font-semibold">2017-2021</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Value:</span>
                    <span className="text-white ml-2 font-semibold">$32 Million</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Details:</span>
                    <p className="text-slate-300 mt-1 leading-relaxed">
                      Subcontractor - Manage and Operate all DHS requirements for the contract. Oversee more than 200 armed and unarmed guards, Dispatch, Mobile and Management departments. Provided daily saturation of bus routes and transit operation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* HOA Project */}
            <div className="group relative">
              <div className="absolute inset-0 bg-blue-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-red-500/50 transition-all h-full">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-10 h-10" />
                  </div>
                  <div>
                    <div className="text-sm text-red-400 uppercase tracking-wider mb-2">Agency</div>
                    <h3 className="text-2xl font-bold mb-1">Homeowners Association (HOA) Nevada</h3>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-slate-400">Project:</span>
                    <span className="text-white ml-2 font-semibold">Security guard services for residential community</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Dates:</span>
                    <span className="text-white ml-2 font-semibold">2021-2023</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Value:</span>
                    <span className="text-white ml-2 font-semibold">$300,000</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Details:</span>
                    <p className="text-slate-300 mt-1 leading-relaxed">
                      Provide armed and unarmed security guard services for more than 700-1,000 homes and property.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORPORATE DATA */}
      <section id="corporate" className="relative py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Title & Image */}
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-8">
                Corporate <span className="text-red-500">Data</span>
              </h2>
              <div className="relative rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800" 
                  alt="Security Operations" 
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
            </div>

            {/* Right - Corporate Info */}
            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-10">
              <div className="space-y-6">
                <div>
                  <div className="text-red-200 text-sm uppercase tracking-wider mb-2">CAGE / UEI</div>
                  <div className="text-2xl font-bold">9KEW7 / X9HMZ5V4FXL1</div>
                </div>

                <div className="border-t border-white/20 pt-6">
                  <div className="text-red-200 text-sm uppercase tracking-wider mb-2">Socio-Economic Status</div>
                  <div className="text-lg font-semibold">WOSB, MBE, WBE, DBE, SBE, ESB</div>
                </div>

                <div className="border-t border-white/20 pt-6">
                  <div className="text-red-200 text-sm uppercase tracking-wider mb-2">Point of Contact</div>
                  <div className="text-lg font-semibold">Corinthia M Yancey</div>
                </div>

                <div className="border-t border-white/20 pt-6">
                  <div className="text-red-200 text-sm uppercase tracking-wider mb-2">NAICS Codes</div>
                  <div className="text-sm leading-relaxed">
                    <div className="mb-2"><span className="font-bold">561612</span> – Security Guards and Patrol Services (Primary)</div>
                    <div><span className="font-bold">611519</span> – Security Guard Training</div>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-6">
                  <div className="text-red-200 text-sm uppercase tracking-wider mb-2">PSC Codes</div>
                  <div className="text-sm leading-relaxed">
                    <div className="mb-1"><span className="font-bold">S206</span> - Housekeeping Guard</div>
                    <div className="mb-1"><span className="font-bold">R430</span> – Support—Professional: Physical Security and Badging</div>
                    <div><span className="font-bold">R799</span> - Support: Management: Other</div>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-6 space-y-3">
                  <a href="tel:+14142081997" className="flex items-center gap-3 hover:text-red-100 transition-colors">
                    <Phone className="w-5 h-5" />
                    <span className="font-semibold">(414) 208-1997</span>
                  </a>
                  <a href="mailto:cyancey@gsrsteams.com" className="flex items-center gap-3 hover:text-red-100 transition-colors">
                    <Mail className="w-5 h-5" />
                    <span className="font-semibold">cyancey@gsrsteams.com</span>
                  </a>
                  <a href="http://www.gsrsteams.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-red-100 transition-colors">
                    <Award className="w-5 h-5" />
                    <span className="font-semibold">www.gsrsteams.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT - Split Layout */}
      <section id="contact" className="relative py-20 bg-gradient-to-br from-red-900 via-slate-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black mb-4">Get <span className="text-red-500">Protected</span> Today</h2>
            <p className="text-slate-300 text-xl">Contact us for a free security assessment</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <div className="text-xs text-red-400 uppercase tracking-wider mb-3">Contact Information</div>
                <h3 className="text-3xl font-bold mb-2">General Security & Response Services</h3>
                <p className="text-slate-400">Nevada's Premier Security Provider</p>
              </div>

              <div className="space-y-6">
                <a href="tel:+17025551234" className="flex items-center gap-4 group">
                  <div className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-all">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Call Us</div>
                    <div className="text-xl font-bold">(702) 555-1234</div>
                  </div>
                </a>

                <a href="mailto:info@gsrs-security.com" className="flex items-center gap-4 group">
                  <div className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Email Us</div>
                    <div className="text-xl font-bold">info@gsrs-security.com</div>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Location</div>
                    <div className="text-xl font-bold">Las Vegas, Nevada</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-10">
              <h3 className="text-3xl font-bold mb-4">Ready for Elite Protection?</h3>
              <p className="text-red-100 mb-8 text-lg">Partner with Nevada's most trusted security force. Licensed, insured, and committed to your safety 24/7.</p>
              
              <div className="space-y-4 mb-8">
                {['Free Security Assessment', 'Custom Protection Plans', 'Licensed & Insured Officers'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-red-300" />
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-white text-red-900 px-10 py-5 rounded-full font-black text-lg hover:bg-red-50 transition-all shadow-2xl">
                REQUEST A QUOTE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center">
                  <Shield className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-2xl font-black">GSRS</div>
                  <div className="text-xs text-slate-400">Security & Response Services</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm">Professional security solutions. Licensed, insured, and trusted throughout Nevada since 2015.</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Our Services</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <div onClick={() => scrollToSection('services')} className="hover:text-white cursor-pointer transition-colors">Armed Security</div>
                <div onClick={() => scrollToSection('services')} className="hover:text-white cursor-pointer transition-colors">Unarmed Security</div>
                <div onClick={() => scrollToSection('services')} className="hover:text-white cursor-pointer transition-colors">Surveillance Systems</div>
                <div onClick={() => scrollToSection('services')} className="hover:text-white cursor-pointer transition-colors">Rapid Response</div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <div onClick={() => scrollToSection('about')} className="hover:text-white cursor-pointer transition-colors">About GSRS</div>
                <div onClick={() => scrollToSection('contact')} className="hover:text-white cursor-pointer transition-colors">Get a Quote</div>
                <a href="tel:+17025551234" className="block hover:text-white transition-colors">(702) 555-1234</a>
                <a href="mailto:info@gsrs-security.com" className="block hover:text-white transition-colors">info@gsrs-security.com</a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <div>© 2024 General Security & Response Services, LLC. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span>Nevada Licensed</span>
              <span>•</span>
              <span>Fully Insured</span>
              <span>•</span>
              <span>24/7 Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      {showFloatingCTA && (
        <button onClick={() => scrollToSection('contact')} className="fixed bottom-8 right-8 bg-red-600 text-white p-5 rounded-full shadow-2xl hover:bg-red-700 transition-all z-50 group">
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Get a Quote
          </span>
        </button>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}