import gsap from 'gsap'

export function initSplash() {
  return new Promise(resolve => {
    const splash   = document.getElementById('splash')
    const logo     = splash.querySelector('.splash-logo')
    const rings    = splash.querySelector('.splash-rings')
    const mark     = splash.querySelector('.splash-mark svg')
    const wordmark = splash.querySelector('.splash-wordmark')
    const tagline  = splash.querySelector('.splash-tagline')

    const tl = gsap.timeline({ onComplete: () => {
      splash.classList.add('is-done')
      resolve()
    }})

    // Start state
    gsap.set([wordmark, tagline], { opacity: 0, x: 18 })
    gsap.set(mark, { opacity: 0, scale: 0.7, transformOrigin: 'center center' })
    gsap.set(rings, { opacity: 0, scale: 0.6, transformOrigin: 'center center' })
    gsap.set(logo, { opacity: 1 })

    // Entrance
    tl
      .to(mark, { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.4)' })
      .to(rings, { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' }, '<0.1')
      .to(wordmark, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' }, '<0.15')
      .to(tagline,  { opacity: 1, x: 0, duration: 0.4,  ease: 'power2.out' }, '<0.1')

      // Hold
      .to({}, { duration: 0.9 })

      // Exit: logo scales up and fades, overlay fades out
      .to(logo, {
        scale: 2.4,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.in',
        transformOrigin: 'center center',
      })
      .to(rings, {
        scale: 3,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.in',
        transformOrigin: 'center center',
      }, '<')
      .to(splash, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      }, '<0.35')
  })
}
