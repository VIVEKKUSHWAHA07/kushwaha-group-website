import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Box } from 'lucide-react'
import { supabase } from '../lib/supabase'
import ProductCard from '../components/ProductCard'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const heroRef       = useRef(null)
  const statsRef      = useRef(null)
  const productsRef   = useRef(null)
  const ctaRef        = useRef(null)
  const marqueeRef    = useRef(null)

  useEffect(() => {
    async function fetchFeatured() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false })
        .limit(3)
      if (data) setFeaturedProducts(data)
      setLoading(false)
    }
    fetchFeatured()
  }, [])

  /* ── Hero entrance timeline ───────────────────────────────────────── */
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from('.hero-badge',    { opacity: 0, y: -20, duration: 0.6 })
      .from('.hero-h1 span',  { opacity: 0, y: 60, stagger: 0.12, duration: 0.7 }, '-=0.3')
      .from('.hero-body',     { opacity: 0, y: 30, duration: 0.6 }, '-=0.4')
      .from('.hero-ctas > *', { opacity: 0, y: 20, stagger: 0.12, duration: 0.5 }, '-=0.3')
      .from('.hero-ring',     { opacity: 0, scale: 0.7, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.5')
      .from('.hero-counter',  { opacity: 0, duration: 0.4 }, '-=0.3')
  }, { scope: heroRef })

  /* ── Stats counter animation ──────────────────────────────────────── */
  useGSAP(() => {
    const counters = statsRef.current?.querySelectorAll('.stat-num')
    if (!counters) return

    counters.forEach((el) => {
      const raw   = el.dataset.target   // e.g. "15", "2500", "50", "100"
      const suffix = el.dataset.suffix || ''
      const target = parseFloat(raw)

      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          onUpdate() {
            el.textContent = Math.round(this.targets()[0].innerText) + suffix
          },
        }
      )
    })
  }, { scope: statsRef })

  /* ── Products batch reveal (waits for loading) ────────────────────── */
  useGSAP(() => {
    if (loading) return
    gsap.set('.product-card', { opacity: 0, y: 50 })
    ScrollTrigger.batch('.product-card', {
      start: 'top 88%',
      once: true,
      onEnter: (els) =>
        gsap.to(els, { opacity: 1, y: 0, stagger: 0.14, duration: 0.7, ease: 'power3.out' }),
    })
  }, { scope: productsRef, dependencies: [loading] })

  /* ── CTA section reveal ───────────────────────────────────────────── */
  useGSAP(() => {
    gsap.from('.cta-h2', {
      opacity: 0, y: 60, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.cta-h2', start: 'top 80%', once: true },
    })
    gsap.from('.cta-body', {
      opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.cta-body', start: 'top 85%', once: true },
    })
    gsap.from('.cta-btn', {
      opacity: 0, scale: 0.85, duration: 0.6, ease: 'back.out(1.7)',
      scrollTrigger: { trigger: '.cta-btn', start: 'top 90%', once: true },
    })
  }, { scope: ctaRef })

  /* ── Infinite marquee (GSAP loop) ────────────────────────────────── */
  useGSAP(() => {
    const track = marqueeRef.current?.querySelector('.marquee-track')
    if (!track) return

    // Clone once for seamless loop
    const clone = track.cloneNode(true)
    marqueeRef.current.appendChild(clone)

    const totalWidth = track.offsetWidth
    gsap.set([track, clone], { x: (i) => i === 0 ? 0 : totalWidth })

    gsap.to([track, clone], {
      x: `-=${totalWidth}`,
      duration: 28,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    })
  }, { scope: marqueeRef })

  const tags = ['Injection Moulding', 'Extrusion', 'Blow Moulding', 'Custom CNC Machining', 'Bimetallic Coating', 'Nitriding', 'Twin Screw', 'OEM Solutions']

  return (
    <div className="font-body overflow-hidden transition-colors">

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center bg-white dark:bg-brand-dark overflow-hidden transition-colors"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(232,197,71,0.05) 10px, rgba(232,197,71,0.05) 20px)' }}
        />

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col md:flex-row items-center gap-12 py-20">

          {/* Left */}
          <div className="flex-1 w-full flex flex-col items-start gap-6">
            <div className="hero-badge">
              <span className="font-mono text-xs text-brand-accent border border-brand-accent/30 px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm bg-white/50 dark:bg-brand-dark/50">
                ISO Certified Manufacturer
              </span>
            </div>

            <h1 className="hero-h1 font-display text-6xl md:text-8xl lg:text-9xl text-gray-900 dark:text-white leading-[0.95] md:leading-[0.85] text-left">
              <span className="block">PRECISION</span>
              <span className="block text-brand-accent">SCREWS</span>
              <span className="block">&amp; BARRELS</span>
            </h1>

            <p className="hero-body text-gray-600 dark:text-brand-muted text-lg md:text-xl max-w-xl leading-relaxed font-light">
              Manufacturers of high-performance components engineered for durability and maximum output. We build for Injection, Extrusion, and Blow Moulding machines.
            </p>

            <div className="hero-ctas flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 mt-4 w-full sm:w-auto">
              <Link to="/products" className="bg-brand-accent text-brand-dark font-display tracking-wide text-lg md:text-xl px-6 py-4 rounded hover:bg-brand-gold active:scale-95 transition-all duration-200 text-center">
                View Catalogue
              </Link>
              <Link to="/contact" className="border border-gray-300 dark:border-brand-border text-gray-900 dark:text-brand-light font-display tracking-wide text-lg md:text-xl px-6 py-4 rounded hover:border-brand-accent hover:text-brand-accent active:scale-95 transition-all duration-200 text-center">
                Request Quote
              </Link>
            </div>
          </div>

          {/* Right — rotating rings + counter */}
          <div className="hidden md:flex flex-col items-center justify-center w-5/12">
            <div className="relative">
              <div className="hero-ring w-80 h-80 border border-brand-border/30 rounded-full animate-spin-slow flex items-center justify-center relative shadow-2xl shadow-brand-accent/5">
                <div className="w-64 h-64 border border-brand-border/50 rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 border border-brand-border/80 rounded-full" />
                </div>
              </div>
              <div className="hero-counter absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm">
                <span className="font-display text-8xl text-gray-900 dark:text-brand-light drop-shadow-2xl">2500+</span>
                <span className="font-mono text-brand-accent uppercase tracking-widest text-sm mt-2 font-semibold">Products Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────────── */}
      <section ref={statsRef} className="bg-gray-50 dark:bg-brand-steel border-y border-gray-200 dark:border-brand-border py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 md:gap-8 md:divide-x divide-gray-200 dark:divide-brand-border/20">
            {[
              { target: '15', suffix: '+', label: 'Years Experience' },
              { target: '2500', suffix: '+', label: 'Products' },
              { target: '50', suffix: '+', label: 'Industries' },
              { target: '100', suffix: '%', label: 'Pan India' },
            ].map(({ target, suffix, label }) => (
              <div key={label} className="flex flex-col flex-1 items-center justify-center text-center px-2 md:px-4">
                <div
                  className="stat-num font-display text-5xl md:text-6xl text-brand-accent mb-2"
                  data-target={target}
                  data-suffix={suffix}
                >
                  0{suffix}
                </div>
                <div className="font-mono text-xs text-gray-800 dark:text-brand-light uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────── */}
      <section ref={productsRef} className="py-24 px-6 md:px-12 lg:px-20 bg-white dark:bg-brand-dark transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 border-b border-gray-200 dark:border-brand-border pb-6 gap-4">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-gray-900 dark:text-white leading-tight">Featured Products</h2>
            <Link to="/products" className="text-brand-accent hover:text-brand-gold font-mono uppercase tracking-widest text-sm mb-0 md:mb-2 flex items-center gap-2 group transition-colors">
              View All Catalogue <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(n => (
                <div key={n} className="bg-gray-50 dark:bg-brand-card rounded-xl h-[400px] animate-pulse border border-gray-200 dark:border-brand-border" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.length > 0 ? (
                featuredProducts.map(p => (
                  <div key={p.id} className="product-card">
                    <ProductCard product={p} />
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center border border-dashed border-gray-300 dark:border-brand-border rounded-xl">
                  <Box size={48} className="mx-auto text-gray-400 dark:text-brand-muted mb-4 opacity-50" />
                  <p className="font-mono text-gray-500 dark:text-brand-muted">No featured products yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── CAPABILITIES MARQUEE (GSAP loop) ────────────────────────── */}
      <section className="py-12 bg-white dark:bg-brand-dark border-y border-gray-200 dark:border-brand-border overflow-hidden relative transition-colors">
        <div ref={marqueeRef} className="flex overflow-hidden whitespace-nowrap relative">
          <div className="marquee-track flex gap-4 px-4 items-center shrink-0">
            {tags.map(tag => (
              <div key={tag} className="border border-gray-200 dark:border-brand-border bg-gray-50 dark:bg-brand-card/50 text-gray-800 dark:text-brand-light rounded-full px-6 py-3 text-sm font-mono hover:border-brand-accent hover:text-brand-accent transition-colors cursor-default whitespace-nowrap">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="bg-gray-50 dark:bg-brand-card py-24 border-y border-gray-200 dark:border-brand-border relative overflow-hidden transition-colors">
        <div className="absolute inset-0 opacity-5" style={{ background: 'radial-gradient(circle at center, #E8C547 0%, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="cta-h2 font-display text-4xl sm:text-5xl md:text-7xl text-gray-900 dark:text-white mb-6 md:mb-8 uppercase leading-[1.1] md:leading-none">
            Built To Your Exact<br className="hidden sm:block" /> Specifications
          </h2>
          <p className="cta-body font-body text-gray-600 dark:text-brand-muted mb-8 md:mb-10 max-w-2xl mx-auto text-base md:text-lg">
            Whether you need a standard replacement or a highly customized screw profile for specialized polymers, our engineering team is ready to deliver.
          </p>
          <Link
            to="/contact"
            className="cta-btn inline-block bg-brand-accent text-brand-dark font-display tracking-widest uppercase text-2xl px-12 py-5 rounded-lg hover:bg-brand-gold active:scale-95 transition-all shadow-xl shadow-brand-accent/20"
          >
            Send an RFQ
          </Link>
        </div>
      </section>

    </div>
  )
}
