import { Link } from 'react-router-dom'
import { ArrowRight, Package, Car, Layers, Sprout, Heart, Cpu } from 'lucide-react'
import { INDUSTRIES_SERVED } from '../lib/constants'

const iconMap = {
  'Package': <Package size={40} />,
  'Car': <Car size={40} />,
  'Layers': <Layers size={40} />,
  'Sprout': <Sprout size={40} />,
  'Heart': <Heart size={40} />,
  'Cpu': <Cpu size={40} />
}

export default function Industries() {
  return (
    <div className="bg-brand-dark min-h-screen font-body pb-24">
      
      {/* Header */}
      <header className="bg-brand-steel border-b border-brand-border py-24 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="font-display text-6xl md:text-7xl text-white uppercase mb-6 drop-shadow-lg">Industries We Serve</h1>
          <p className="text-brand-muted text-xl font-light">Robust, application-specific screw and barrel solutions for every sector of plastics manufacturing.</p>
        </div>
      </header>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDUSTRIES_SERVED.map((ind, i) => (
            <div key={i} className="bg-brand-card border border-brand-border rounded-xl p-8 flex flex-col group hover:border-brand-accent transition-colors">
              <div className="text-brand-accent mb-8 bg-brand-steel inline-flex p-4 rounded-xl border border-brand-border/50 group-hover:bg-brand-accent group-hover:text-brand-dark transition-colors duration-300 w-fit">
                {iconMap[ind.icon]}
              </div>
              <h2 className="font-display text-3xl text-white uppercase mb-4">{ind.name}</h2>
              <p className="text-brand-muted leading-relaxed mb-10 flex-grow font-light">{ind.desc}</p>
              
              <Link to="/contact" className="text-brand-accent font-display text-lg uppercase flex items-center gap-2 group-hover:text-brand-gold transition-colors mt-auto w-fit">
                Discuss Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-24 bg-gradient-to-r from-brand-steel to-brand-card border border-brand-border rounded-2xl p-12 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
             <h3 className="font-display text-4xl sm:text-5xl text-white uppercase mb-4">Specialized Requirements?</h3>
             <p className="text-brand-muted mb-8 max-w-2xl mx-auto text-lg">We serve multiple sub-sectors of plastic processing. If your industry isn't listed above, contact our engineers for specialized metallurgical combinations.</p>
             <Link to="/contact" className="inline-block bg-brand-accent text-brand-dark font-display text-xl uppercase tracking-wider px-10 py-4 rounded-lg hover:bg-brand-gold active:scale-95 transition-all shadow-lg shadow-brand-accent/20">
               Contact Engineering Team
             </Link>
          </div>
        </div>
      </div>
      
    </div>
  )
}
