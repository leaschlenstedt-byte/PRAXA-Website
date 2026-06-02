import gsap from 'gsap'

export function initSplash() {
  return new Promise(resolve => {
    const splash    = document.getElementById('splash')
    const mark      = splash.querySelector('.splash-mark svg')
    const rings     = splash.querySelector('.splash-rings')
    const wordmark  = splash.querySelector('.splash-wordmark')
    const tagline   = splash.querySelector('.splash-tagline')

    // Body visible immediately — splash covers it
    document.body.style.opacity = '1'

    // Elements already start at opacity:0 via inline HTML styles — just animate TO visible
    const tl = gsap.timeline({ onComplete: () => {
      splash.classList.add('is-done')
      resolve()
    }})

    tl
      // Entrance
      .to(mark,     { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.4)', transformOrigin: 'center' }, 0)
      .to(rings,    { opacity: 1, scale: 1, duration: 0.7,  ease: 'power2.out',    transformOrigin: 'center' }, 0.1)
      .to(wordmark, { opacity: 1, x: 0,     duration: 0.45, ease: 'power2.out' }, 0.2)
      .to(tagline,  { opacity: 1, x: 0,     duration: 0.4,  ease: 'power2.out' }, 0.3)

      // Hold
      .to({}, { duration: 0.9 })

      // Exit — whole splash scales up and fades
      .to(splash, { scale: 1.15, opacity: 0, duration: 0.65, ease: 'power2.in', transformOrigin: 'center' })
  })
}
