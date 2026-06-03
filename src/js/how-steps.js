import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initHowSteps() {
  const steps = document.querySelectorAll('.how-step')
  if (!steps.length) return

  steps.forEach(step => {
    const circle  = step.querySelector('.how-step-circle')
    const ring    = step.querySelector('.how-step-ring')
    const bignum  = step.querySelector('.how-step-bignum')
    const content = step.querySelector('.how-step-content')

    // ── Circle: grows via scrub as step scrolls into view ──────
    gsap.fromTo(circle,
      { scale: 0, transformOrigin: 'center center' },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: step,
          start: 'top 90%',
          end: 'top 10%',
          scrub: 1.2,
        }
      }
    )

    // ── Ring: trails the circle with a slight lag ───────────────
    gsap.fromTo(ring,
      { scale: 0 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          end: 'top 5%',
          scrub: 1.8,
        }
      }
    )

    // ── Big number: slides in from left + fades ─────────────────
    gsap.fromTo(bignum,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 75%',
          once: true,
        }
      }
    )

    // ── Content: clip-path wipe from bottom + slide up ──────────
    gsap.fromTo(content,
      {
        clipPath: 'inset(0 0 100% 0)',
        y: 30,
        opacity: 0,
      },
      {
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: step,
          start: 'top 68%',
          once: true,
        }
      }
    )
  })
}
