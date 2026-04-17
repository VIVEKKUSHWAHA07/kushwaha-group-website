import { Link } from 'react-router-dom'
import { ArrowRight, Target, Shield, Zap, Award } from 'lucide-react'
import { CAPABILITY_STATS } from '../lib/constants'

export default function About() {
  return (
    <div className="bg-brand-dark min-h-screen font-body text-brand-light pb-20">
      
      {/* Hero Section */}
      <section className="bg-brand-steel border-b border-brand-border py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h1 className="font-display text-7xl md:text-8xl text-white uppercase mb-6 flex flex-wrap justify-center gap-x-4">
            <span className="animate-fade-up opacity-0 delay-[100ms]" style={{ animationFillMode: 'forwards' }}>BUILT</span>
            <span className="animate-fade-up opacity-0 delay-[200ms]" style={{ animationFillMode: 'forwards' }}>ON</span>
            <span className="text-brand-accent animate-fade-up opacity-0 delay-[300ms]" style={{ animationFillMode: 'forwards' }}>PRECISION</span>
          </h1>
          <p className="text-brand-muted text-xl animate-fade-up opacity-0 delay-[400ms]" style={{ animationFillMode: 'forwards' }}>
            Delivering high-performance engineered solutions since inception.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-brand-card border-y border-brand-border -mt-1 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-border/50 py-8">
            {CAPABILITY_STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center px-4">
                <div className="font-display text-4xl lg:text-5xl text-brand-accent mb-2">{stat.value}</div>
                <div className="font-mono text-[10px] sm:text-xs text-brand-muted uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section / Timeline */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl text-white uppercase">Our Story</h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto mt-6"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-1/2 -ml-px top-0 bottom-0 w-0.5 bg-brand-border hidden md:block"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16 relative">
            <div className="w-full md:w-1/2 md:text-right md:pr-12">
              <div className="font-display text-4xl text-brand-accent mb-2">Foundation</div>
              <p className="text-brand-muted leading-relaxed">
                Kushwaha Group was founded with a singular mission — to deliver precision-engineered screw and barrel solutions to India's plastics processing industry.
              </p>
            </div>
            <div className="hidden md:flex absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-brand-dark border-4 border-brand-accent"></div>
            <div className="w-full md:w-1/2 md:pl-12"></div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16 relative">
            <div className="w-full md:w-1/2 md:pl-12">
              <div className="font-display text-4xl text-brand-accent mb-2">Expansion</div>
              <p className="text-brand-muted leading-relaxed">
                We combine traditional metallurgical expertise with modern CNC manufacturing to produce components that outlast and outperform competitor equivalents.
              </p>
            </div>
            <div className="hidden md:flex absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-brand-dark border-4 border-brand-accent"></div>
            <div className="w-full md:w-1/2 md:pr-12 md:text-right"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 relative">
            <div className="w-full md:w-1/2 md:text-right md:pr-12">
              <div className="font-display text-4xl text-brand-accent mb-2">Future Vision</div>
              <p className="text-brand-muted leading-relaxed">
                To remain India's most trusted manufacturer, continuously innovating our bimetallic coatings and screw geometries for optimal resin melting.
              </p>
            </div>
            <div className="hidden md:flex absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-brand-dark border-4 border-brand-accent"></div>
            <div className="w-full md:w-1/2 md:pl-12"></div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t border-brand-border">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl text-white uppercase">Core Values</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-brand-card border border-brand-border rounded-xl p-8 hover:border-brand-accent transition-colors group">
            <Target size={40} className="text-brand-accent mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-2xl text-white uppercase mb-4">Precision</h3>
            <p className="text-brand-muted text-sm leading-relaxed">Tolerances held to exact micrometers. Zero-defect philosophy across all lines.</p>
          </div>
          <div className="bg-brand-card border border-brand-border rounded-xl p-8 hover:border-brand-accent transition-colors group">
            <Shield size={40} className="text-brand-accent mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-2xl text-white uppercase mb-4">Integrity</h3>
            <p className="text-brand-muted text-sm leading-relaxed">Transparent quoting, certified raw materials, and accurate lead times.</p>
          </div>
          <div className="bg-brand-card border border-brand-border rounded-xl p-8 hover:border-brand-accent transition-colors group">
            <Zap size={40} className="text-brand-accent mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-2xl text-white uppercase mb-4">Output</h3>
            <p className="text-brand-muted text-sm leading-relaxed">Our designs maximize your machine's hourly output while reducing motor load.</p>
          </div>
          <div className="bg-brand-card border border-brand-border rounded-xl p-8 hover:border-brand-accent transition-colors group">
            <Award size={40} className="text-brand-accent mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-2xl text-white uppercase mb-4">Quality</h3>
            <p className="text-brand-muted text-sm leading-relaxed">Rigorous multi-stage inspections before a single screw leaves our facility.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-card py-20 border-y border-brand-border text-center overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-3xl"></div>
        <div className="relative z-10 px-6">
          <h2 className="font-display text-5xl md:text-6xl text-white uppercase mb-8">Let's Build Together</h2>
          <Link to="/contact" className="bg-brand-accent text-brand-dark font-display text-xl uppercase tracking-widest px-10 py-5 rounded-lg hover:bg-brand-gold active:scale-95 transition-all inline-flex items-center gap-3">
            Request a Quote <ArrowRight size={20} />
          </Link>
        </div>
      </section>

    </div>
  )
}
