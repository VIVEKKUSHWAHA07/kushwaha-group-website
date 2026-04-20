import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Target, Shield, Zap, Award } from 'lucide-react'
import { CAPABILITY_STATS } from '../lib/constants'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function About() {
  const heroRef   = useRef(null)
  const statsRef  = useRef(null)
  const storyRef  = useRef(null)
  const valuesRef = useRef(null)
  const ctaRef    = useRef(null)

  /* ── Hero word-stagger ───────────────────────────────────────────── */
  useGSAP(() => {
    gsap.from('.about-word', {
      opacity: 0, y: 80, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    })
    gsap.from('.about-sub', {
      opacity: 0, y: 20, duration: 0.7, delay: 0.6, ease: 'power2.out',
    })
  }, { scope: heroRef })

  /* ── Stats counter reveal ────────────────────────────────────────── */
  useGSAP(() => {
    const counters = statsRef.current?.querySelectorAll('.stat-num')
    counters?.forEach((el) => {
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

  /* ── Timeline items reveal with stagger ─────────────────────────── */
  useGSAP(() => {
    gsap.from('.story-node', {
      opacity: 0,
      x: (i) => (i % 2 === 0 ? -60 : 60),
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.story-node', start: 'top 80%', once: true },
    })
    // animate the center line drawing
    gsap.from('.story-line', {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 1.4,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: '.story-line', start: 'top 75%', once: true },
    })
  }, { scope: storyRef })

  /* ── Values cards ScrollTrigger.batch() ─────────────────────────── */
  useGSAP(() => {
    gsap.set('.value-card', { opacity: 0, y: 50 })
    ScrollTrigger.batch('.value-card', {
      start: 'top 88%',
      once: true,
      onEnter: (els) =>
        gsap.to(els, { opacity: 1, y: 0, stagger: 0.13, duration: 0.7, ease: 'power3.out' }),
    })
  }, { scope: valuesRef })

  /* ── CTA reveal ─────────────────────────────────────────────────── */
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ctaRef.current, start: 'top 75%', once: true },
    })
    tl.from('.cta-title', { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' })
      .from('.cta-link',  { opacity: 0, scale: 0.85, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3')
  }, { scope: ctaRef })

  return (
    <div className="bg-white dark:bg-brand-dark transition-colors min-h-screen font-body text-gray-900 dark:text-brand-light pb-20">

      {/* Hero */}
      <section ref={heroRef} className="bg-gray-50 dark:bg-brand-steel border-b border-gray-200 dark:border-brand-border py-32 text-center relative overflow-hidden transition-colors">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h1 className="font-display text-7xl md:text-8xl text-gray-900 dark:text-white uppercase mb-6 flex flex-wrap justify-center gap-x-4">
            <span className="about-word inline-block">BUILT</span>
            <span className="about-word inline-block">ON</span>
            <span className="about-word inline-block text-brand-accent">PRECISION</span>
          </h1>
          <p className="about-sub text-gray-600 dark:text-brand-muted text-xl">
            Delivering high-performance engineered solutions since inception.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="bg-white dark:bg-brand-card border-y border-gray-200 dark:border-brand-border -mt-1 relative z-20 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200 dark:divide-brand-border/50 py-8">
            {CAPABILITY_STATS.map((stat, i) => {
              const raw    = stat.value.replace(/[^0-9.]/g, '')
              const suffix = stat.value.replace(/[0-9.]/g, '')
              return (
                <div key={i} className="flex flex-col items-center justify-center text-center px-4">
                  <div
                    className="stat-num font-display text-4xl lg:text-5xl text-brand-accent mb-2"
                    data-target={raw}
                    data-suffix={suffix}
                  >
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] sm:text-xs text-gray-600 dark:text-brand-muted uppercase tracking-widest">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section ref={storyRef} className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl text-gray-900 dark:text-white uppercase">Our Story</h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto mt-6" />
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="story-line absolute left-1/2 -ml-px top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-brand-border hidden md:block" />

          {[
            {
              side: 'left',
              title: 'Foundation',
              body: "Maurvik Industries was founded with a singular mission — to deliver precision-engineered screw and barrel solutions to India's plastics processing industry.",
            },
            {
              side: 'right',
              title: 'Expansion',
              body: 'We combine traditional metallurgical expertise with modern CNC manufacturing to produce components that outlast and outperform competitor equivalents.',
            },
            {
              side: 'left',
              title: 'Future Vision',
              body: "To remain India's most trusted manufacturer, continuously innovating our bimetallic coatings and screw geometries for optimal resin melting.",
            },
          ].map(({ side, title, body }, i) => (
            <div
              key={title}
              className={`story-node flex flex-col ${side === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 mb-16 relative`}
            >
              <div className={`w-full md:w-1/2 ${side === 'left' ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                <div className="font-display text-4xl text-brand-accent mb-2">{title}</div>
                <p className="text-gray-600 dark:text-brand-muted leading-relaxed">{body}</p>
              </div>
              <div className="hidden md:flex absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-white dark:bg-brand-dark border-4 border-brand-accent" />
              <div className="w-full md:w-1/2" />
            </div>
          ))}
        </div>
      </section>

      {/* Values Grid */}
      <section ref={valuesRef} className="py-24 max-w-7xl mx-auto px-6 border-t border-gray-200 dark:border-brand-border">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl text-gray-900 dark:text-white uppercase">Core Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Target size={40} />, title: 'Precision', body: 'Tolerances held to exact micrometers. Zero-defect philosophy across all lines.' },
            { icon: <Shield size={40} />, title: 'Integrity', body: 'Transparent quoting, certified raw materials, and accurate lead times.' },
            { icon: <Zap size={40} />,   title: 'Output',    body: "Our designs maximize your machine's hourly output while reducing motor load." },
            { icon: <Award size={40} />, title: 'Quality',   body: 'Rigorous multi-stage inspections before a single screw leaves our facility.' },
          ].map(({ icon, title, body }) => (
            <div key={title} className="value-card bg-gray-50 dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-xl p-8 hover:border-brand-accent transition-colors group">
              <div className="text-brand-accent mb-6 group-hover:scale-110 transition-transform">{icon}</div>
              <h3 className="font-display text-2xl text-gray-900 dark:text-white uppercase mb-4">{title}</h3>
              <p className="text-gray-600 dark:text-brand-muted text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="bg-white dark:bg-brand-card py-20 border-y border-gray-200 dark:border-brand-border text-center overflow-hidden relative transition-colors">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-3xl" />
        <div className="relative z-10 px-6">
          <h2 className="cta-title font-display text-5xl md:text-6xl text-gray-900 dark:text-white uppercase mb-8">Let's Build Together</h2>
          <Link to="/contact" className="cta-link inline-flex items-center gap-3 bg-brand-accent text-brand-dark font-display text-xl uppercase tracking-widest px-10 py-5 rounded-lg hover:bg-brand-gold active:scale-95 transition-all">
            Request a Quote <ArrowRight size={20} />
          </Link>
        </div>
      </section>

    </div>
  )
}
