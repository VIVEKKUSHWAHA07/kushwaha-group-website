import { Link } from 'react-router-dom'
import { CAPABILITY_STATS } from '../lib/constants'
import { Settings2, Layers, Ruler, Cpu } from 'lucide-react'

export default function Capabilities() {
  return (
    <div className="bg-brand-dark min-h-screen font-body pb-24">
      
      {/* Header */}
      <header className="bg-brand-steel border-b border-brand-border py-24 text-center px-6">
        <h1 className="font-display text-6xl md:text-7xl text-white uppercase mb-6">Manufacturing Capabilities</h1>
        <p className="text-brand-muted text-xl uppercase tracking-widest font-mono">Engineered to precise specifications</p>
      </header>

      {/* Stats Strip */}
      <section className="bg-brand-card py-16 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-brand-border/50">
            {CAPABILITY_STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center px-4">
                <div className="font-display text-4xl lg:text-5xl text-brand-accent mb-2">{stat.value}</div>
                <div className="font-mono text-[10px] sm:text-xs text-brand-light uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          
          <div className="bg-brand-card border border-brand-border rounded-xl p-8 hover:border-brand-accent/50 transition-colors">
            <Settings2 size={40} className="text-brand-muted mb-6" />
            <h2 className="font-display text-3xl text-white uppercase border-b border-brand-border pb-4 mb-6">Screw Profiles</h2>
            <ul className="space-y-4">
              {['General Purpose Screws', 'Barrier Screws', 'Mixing Elements (Maddock, Pineapple)', 'Vented & Degassing Screws', 'High-Compression Geometries', 'Varying Pitch Designs'].map((i, idx) => (
                <li key={idx} className="flex items-start gap-3 text-brand-muted">
                  <span className="text-brand-accent mt-1">▹</span> {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-brand-card border border-brand-border rounded-xl p-8 hover:border-brand-accent/50 transition-colors">
             <Layers size={40} className="text-brand-muted mb-6" />
             <h2 className="font-display text-3xl text-white uppercase border-b border-brand-border pb-4 mb-6">Barrel Options</h2>
             <ul className="space-y-4">
               {['Standard Nitrided Barrels', 'Bimetallic (Tungsten Carbide) Barrels', 'Grooved Feed Barrels', 'Twin Screw Barrels (Parallel/Conical)', 'Vented Barrels', 'Water/Oil Cooled Barrels'].map((i, idx) => (
                 <li key={idx} className="flex items-start gap-3 text-brand-muted">
                   <span className="text-brand-accent mt-1">▹</span> {i}
                 </li>
               ))}
             </ul>
          </div>

          <div className="bg-brand-card border border-brand-border rounded-xl p-8 hover:border-brand-accent/50 transition-colors">
            <Ruler size={40} className="text-brand-muted mb-6" />
            <h2 className="font-display text-3xl text-white uppercase border-b border-brand-border pb-4 mb-6">Materials</h2>
            <ul className="space-y-4">
              {['EN41B (Musco) Nitriding Steel', 'DIN 1.8550 High Alloy Steel', 'H13 Tool Steel', 'Stainless Steel (304, 316, 410)', 'Colmonoy & Stellite Hardfacing', 'Hastelloy / Inconel for Aggressive Resins'].map((i, idx) => (
                <li key={idx} className="flex items-start gap-3 text-brand-muted">
                  <span className="text-brand-accent mt-1">▹</span> {i}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Custom Eng Banner */}
        <div className="bg-brand-accent rounded-xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 mt-8 shadow-2xl relative overflow-hidden">
          <Cpu className="absolute -right-10 -bottom-10 text-brand-gold opacity-30 w-64 h-64" />
          <div className="relative z-10 w-full md:w-2/3">
            <h2 className="font-display text-5xl text-brand-dark uppercase mb-4 leading-tight">Custom Machining & Prototyping</h2>
            <p className="text-brand-dark/80 text-lg font-medium max-w-xl">
              Have a highly specialized drawing? We accept custom orders for non-standard OEMs. Our CNC facility can machine exact dimensional matches.
            </p>
          </div>
          <div className="relative z-10 w-full md:w-auto mt-4 md:mt-0 whitespace-nowrap">
            <a href="mailto:kushwahavivek6265@gmail.com?subject=Custom%20OEM%20Drawing%20Submission" className="inline-block bg-brand-dark text-white font-display text-xl uppercase tracking-wider px-10 py-5 rounded-lg hover:bg-brand-steel active:scale-95 transition-all shadow-xl">
              Submit Drawing
            </a>
          </div>
        </div>

      </section>
    </div>
  )
}
