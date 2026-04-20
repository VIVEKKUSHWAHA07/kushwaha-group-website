import { useRef } from 'react'
import { CAPABILITY_STATS } from '../lib/constants'
import { Settings2, Layers, Ruler, Cpu } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Capabilities() {
  const headerRef = useRef(null)
  const statsRef  = useRef(null)
  const cardsRef  = useRef(null)
  const bannerRef = useRef(null)

  /* ── Header entrance ─────────────────────────────────────────────── */
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.cap-h1',  { opacity: 0, y: 60, duration: 0.8 })
      .from('.cap-sub', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
  }, { scope: headerRef })

  /* ── Stats counters ──────────────────────────────────────────────── */
  useGSAP(() => {
    statsRef.current?.querySelectorAll('.stat-num').forEach((el) => {
      const raw    = el.dataset.target
      const suffix = el.dataset.suffix || ''
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: parseFloat(raw),
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate() { el.textContent = Math.round(this.targets()[0].innerText) + suffix },
        }
      )
    })
  }, { scope: statsRef })

  /* ── Specs cards batch ───────────────────────────────────────────── */
  useGSAP(() => {
    gsap.set('.spec-card', { opacity: 0, y: 50 })
    ScrollTrigger.batch('.spec-card', {
      start: 'top 88%',
      once: true,
      onEnter: (els) =>
        gsap.to(els, { opacity: 1, y: 0, stagger: 0.14, duration: 0.7, ease: 'power3.out' }),
    })
  }, { scope: cardsRef })

  /* ── Banner reveal ───────────────────────────────────────────────── */
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: bannerRef.current, start: 'top 80%', once: true },
    })
    tl.from('.banner-text', { opacity: 0, x: -60, duration: 0.8, ease: 'power3.out' })
      .from('.banner-btn',  { opacity: 0, x: 40, duration: 0.7, ease: 'back.out(1.7)' }, '-=0.4')
  }, { scope: bannerRef })

  const specs = [
    {
      icon: <Settings2 size={40} className="text-gray-400 dark:text-brand-muted mb-6" />,
      title: 'Screw Profiles',
      items: ['General Purpose Screws', 'Barrier Screws', 'Mixing Elements (Maddock, Pineapple)', 'Vented & Degassing Screws', 'High-Compression Geometries', 'Varying Pitch Designs'],
    },
    {
      icon: <Layers size={40} className="text-gray-400 dark:text-brand-muted mb-6" />,
      title: 'Barrel Options',
      items: ['Standard Nitrided Barrels', 'Bimetallic (Tungsten Carbide) Barrels', 'Grooved Feed Barrels', 'Twin Screw Barrels (Parallel/Conical)', 'Vented Barrels', 'Water/Oil Cooled Barrels'],
    },
    {
      icon: <Ruler size={40} className="text-gray-400 dark:text-brand-muted mb-6" />,
      title: 'Materials',
      items: ['EN41B (Musco) Nitriding Steel', 'DIN 1.8550 High Alloy Steel', 'H13 Tool Steel', 'Stainless Steel (304, 316, 410)', 'Colmonoy & Stellite Hardfacing', 'Hastelloy / Inconel for Aggressive Resins'],
    },
  ]

  return (
    <div className="bg-white dark:bg-brand-dark transition-colors min-h-screen font-body pb-24">

      {/* Header */}
      <header ref={headerRef} className="bg-gray-50 dark:bg-brand-steel border-b border-gray-200 dark:border-brand-border py-24 text-center px-6 transition-colors">
        <h1 className="cap-h1 font-display text-6xl md:text-7xl text-gray-900 dark:text-white uppercase mb-6">Manufacturing Capabilities</h1>
        <p className="cap-sub text-gray-600 dark:text-brand-muted text-xl uppercase tracking-widest font-mono">Engineered to precise specifications</p>
      </header>

      {/* Stats */}
      <section ref={statsRef} className="bg-white dark:bg-brand-card py-16 border-b border-gray-200 dark:border-brand-border transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-200 dark:divide-brand-border/50">
            {CAPABILITY_STATS.map((stat, i) => {
              const raw    = stat.value.replace(/[^0-9.]/g, '')
              const suffix = stat.value.replace(/[0-9.]/g, '')
              return (
                <div key={i} className="flex flex-col items-center justify-center text-center px-4">
                  <div className="stat-num font-display text-4xl lg:text-5xl text-brand-accent mb-2" data-target={raw} data-suffix={suffix}>
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] sm:text-xs text-gray-600 dark:text-brand-light uppercase tracking-widest">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Specs Cards */}
      <section ref={cardsRef} className="max-w-7xl mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {specs.map(({ icon, title, items }) => (
            <div key={title} className="spec-card bg-gray-50 dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-xl p-8 hover:border-brand-accent dark:hover:border-brand-accent/50 transition-colors">
              {icon}
              <h2 className="font-display text-3xl text-gray-900 dark:text-white uppercase border-b border-gray-200 dark:border-brand-border pb-4 mb-6">{title}</h2>
              <ul className="space-y-4">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-brand-muted">
                    <span className="text-brand-accent mt-1">▹</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Custom Banner */}
        <div ref={bannerRef} className="bg-brand-accent rounded-xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 mt-8 shadow-2xl relative overflow-hidden">
          <Cpu className="absolute -right-10 -bottom-10 text-brand-gold opacity-30 w-64 h-64" />
          <div className="banner-text relative z-10 w-full md:w-2/3">
            <h2 className="font-display text-5xl text-brand-dark uppercase mb-4 leading-tight">Custom Machining &amp; Prototyping</h2>
            <p className="text-brand-dark/80 text-lg font-medium max-w-xl">
              Have a highly specialized drawing? We accept custom orders for non-standard OEMs. Our CNC facility can machine exact dimensional matches.
            </p>
          </div>
          <div className="banner-btn relative z-10 w-full md:w-auto mt-4 md:mt-0 whitespace-nowrap">
            <a
              href="mailto:kushwahavivek6265@gmail.com?subject=Custom%20OEM%20Drawing%20Submission"
              className="inline-block bg-brand-dark text-white font-display text-xl uppercase tracking-wider px-10 py-5 rounded-lg hover:bg-brand-steel active:scale-95 transition-all shadow-xl"
            >
              Submit Drawing
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
