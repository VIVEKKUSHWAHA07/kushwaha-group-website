/**
 * useScrollReveal — Reusable GSAP ScrollTrigger.batch() hook
 * Follows official gsap-react + gsap-scrolltrigger skill patterns:
 *  - useGSAP() from @gsap/react for automatic cleanup
 *  - ScrollTrigger.batch() for performant staggered reveal
 */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * @param {React.RefObject} containerRef - scope ref
 * @param {string} selector - CSS selector scoped to container
 * @param {object} fromVars - gsap from vars
 * @param {object} batchOpts - ScrollTrigger.batch options
 */
export function useScrollReveal(containerRef, selector = '.reveal', fromVars = {}, batchOpts = {}) {
  useGSAP(() => {
    // Set initial hidden state
    gsap.set(selector, { opacity: 0, y: 40, ...fromVars })

    ScrollTrigger.batch(selector, {
      start: 'top 88%',
      once: true,
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform',
        })
      },
      ...batchOpts,
    })
  }, { scope: containerRef })
}
