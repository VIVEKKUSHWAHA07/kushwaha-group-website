import { Link } from 'react-router-dom'
import { CheckCircle2, ShieldCheck, Zap, Factory } from 'lucide-react'

export default function Quality() {
  const processSteps = [
    { title: 'Material Incoming', desc: 'Raw steel undergoes strict metallurgical and ultrasonic testing to identify internal flaws before entering the shop floor.', icon: <CheckCircle2 size={32}/> },
    { title: 'CNC Turning & Milling', desc: 'Screws are precision turned, and flights are milled to exact geometries using heavy-duty CNC machinery ensuring consistent L/D ratios.', icon: <Factory size={32}/> },
    { title: 'Heat Treatment', desc: 'Gas nitriding in vertical pits ensures a minimum 65-70 HRC surface hardness with a deep case depth for wear resistance.', icon: <Zap size={32}/> },
    { title: 'Surface Finishing', desc: 'Final cylindrical grinding, hard chrome plating, and high-gloss buffing for low coefficient of friction against plastic resins.', icon: <ShieldCheck size={32}/> },
  ]

  return (
    <div className="bg-white dark:bg-brand-dark transition-colors min-h-screen font-body pb-24">
      
      <header className="bg-gray-50 dark:bg-brand-steel border-b border-gray-200 dark:border-brand-border py-24 text-center px-6 transition-colors">
        <h1 className="font-display text-6xl md:text-7xl text-gray-900 dark:text-white uppercase mb-6">Quality Assurance</h1>
        <p className="text-gray-600 dark:text-brand-muted text-xl uppercase tracking-widest font-mono">Uncompromising standards at zero tolerance</p>
      </header>

      {/* Timeline Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
           <h2 className="font-display text-4xl text-gray-900 dark:text-brand-light uppercase mb-4">Our Manufacturing Protocol</h2>
           <div className="w-20 h-1 bg-brand-accent mx-auto"></div>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden lg:block absolute left-1/2 -ml-px top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-brand-border"></div>
          
          {processSteps.map((step, index) => (
             <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 mb-16 relative ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                {/* Content Box */}
                <div className={`w-full lg:w-1/2 flex ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                  <div className={`bg-gray-50 dark:bg-brand-card border ${index % 2 === 0 ? 'border-gray-200 dark:border-brand-border hover:border-brand-accent dark:hover:border-brand-accent/50 border-r-brand-accent dark:border-r-brand-accent' : 'border-gray-200 dark:border-brand-border hover:border-brand-accent dark:hover:border-brand-accent/50 border-l-brand-accent dark:border-l-brand-accent'} border-4 rounded-xl p-8 max-w-md shadow-xl transition-all`}>
                    <div className="text-brand-accent mb-4">{step.icon}</div>
                    <div className="font-mono text-brand-accent text-xs tracking-widest uppercase mb-2">Phase 0{index + 1}</div>
                    <h3 className="font-display text-3xl text-gray-900 dark:text-white uppercase mb-3">{step.title}</h3>
                    <p className="text-gray-600 dark:text-brand-muted leading-relaxed font-light">{step.desc}</p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="hidden lg:flex absolute left-1/2 -ml-6 w-12 h-12 rounded-full bg-white dark:bg-brand-dark border-4 border-brand-accent items-center justify-center z-10 shadow-lg shadow-brand-accent/20">
                  <span className="font-display text-brand-accent pt-1">{index + 1}</span>
                </div>
                
                {/* Empty Space filler */}
                <div className="hidden lg:block w-full lg:w-1/2"></div>
             </div>
          ))}
        </div>
      </section>

      {/* Inspection Checklists */}
      <section className="bg-gray-50 dark:bg-brand-steel border-y border-gray-200 dark:border-brand-border py-20 px-6 transition-colors">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left items-center">
          
          <div>
            <h2 className="font-display text-5xl text-gray-900 dark:text-white uppercase mb-6">Rigorous Inspection</h2>
            <p className="text-gray-600 dark:text-brand-muted text-lg mb-8 leading-relaxed font-light max-w-xl">
              We employ a multi-tier stage inspection process. Components do not advance to the next machine line without clearance from the QA department.
            </p>
            <ul className="space-y-4">
              {['Dimensional Tolerance Verification (Micrometer & Dial Gauges)', 'Straightness & Concentricity checks using Lathe Centers', 'Hardness Depth Verification (Vickers & Rockwell)', 'Crack Detection (Ultrasonic / Magnetic Particle)'].map((i, idx)=> (
                <li key={idx} className="flex items-start gap-4 text-gray-800 dark:text-brand-light font-medium bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border py-3 px-4 rounded-lg text-sm sm:text-base">
                  <CheckCircle2 size={24} className="text-brand-accent shrink-0" />
                  <span className="text-left">{i}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center h-full min-h-[400px] rounded-2xl relative overflow-hidden border border-gray-200 dark:border-brand-border group shadow-2xl">
            <div className="absolute inset-0 bg-brand-dark/60 mix-blend-multiply group-hover:bg-brand-dark/40 transition-colors duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="font-display text-3xl text-brand-accent uppercase mb-2">Export Packaging</h3>
              <p className="text-white/90 dark:text-brand-light font-light text-sm">All components are coated in anti-rust compound, plastic wrapped, and secured in custom fumigated wooden crates for transit safety.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
