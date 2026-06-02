import gsap from 'gsap'

const INTERVAL  = 4500   // ms between auto-advances
const ANIM_DUR  = 0.72   // seconds per transition

// 3D position config for each "offset" from the active card
// offset 0  = front/active
// offset 1  = right neighbour
// offset -1 = left neighbour (= total - 1 in modular arithmetic)
// anything else = hidden behind
const POS = {
  front: { x: 0,    z: 200,  rotateY: 0,   scale: 1,    opacity: 1,    zIndex: 10 },
  right: { x: 370,  z: -50,  rotateY: -26, scale: 0.84, opacity: 0.58, zIndex:  5 },
  left:  { x: -370, z: -50,  rotateY:  26, scale: 0.84, opacity: 0.58, zIndex:  5 },
  back:  { x: 0,    z: -500, rotateY: 0,   scale: 0.7,  opacity: 0,    zIndex:  0 },
}

export function initHowCarousel() {
  const slides    = [...document.querySelectorAll('.carousel-slide')]
  const dots      = [...document.querySelectorAll('.carousel-dot')]
  const prevBtn   = document.getElementById('how-prev')
  const nextBtn   = document.getElementById('how-next')
  const progress  = document.getElementById('how-progress')
  if (!slides.length) return

  const total = slides.length
  let current = 0
  let timer   = null
  let busy    = false

  // Set all cards to their initial 3D positions immediately (no animation)
  layout(0, false)

  // ── Controls ────────────────────────────────────────────
  prevBtn?.addEventListener('click', () => goTo(current - 1))
  nextBtn?.addEventListener('click', () => goTo(current + 1))
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)))

  // Click on a side card advances to it
  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => {
      if (i !== current) goTo(i)
    })
  })

  // Touch swipe
  let tx = 0
  const scene = document.querySelector('.carousel-scene')
  scene?.addEventListener('touchstart', e => { tx = e.touches[0].clientX }, { passive: true })
  scene?.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx
    if (Math.abs(dx) > 44) goTo(dx < 0 ? current + 1 : current - 1)
  }, { passive: true })

  // Keyboard (only when section is in view)
  document.addEventListener('keydown', e => {
    const section = document.getElementById('how')
    if (!section) return
    const r = section.getBoundingClientRect()
    if (r.top > window.innerHeight || r.bottom < 0) return
    if (e.key === 'ArrowLeft')  goTo(current - 1)
    if (e.key === 'ArrowRight') goTo(current + 1)
  })

  // Pause auto-advance on hover
  const wrap = document.querySelector('.how-carousel')
  wrap?.addEventListener('mouseenter', () => { clearTimeout(timer); stopProgress() })
  wrap?.addEventListener('mouseleave', resetTimer)

  document.addEventListener('visibilitychange', () => {
    document.hidden ? clearTimeout(timer) : resetTimer()
  })

  resetTimer()

  // ── Core functions ───────────────────────────────────────
  function goTo(index) {
    if (busy) return
    busy = true
    current = ((index % total) + total) % total
    layout(current, true)
    updateDots()
    resetTimer()
    setTimeout(() => { busy = false }, ANIM_DUR * 1000 + 60)
  }

  function layout(active, animate) {
    slides.forEach((slide, i) => {
      const offset = ((i - active) % total + total) % total
      const pos    = offset === 0            ? POS.front
                   : offset === 1            ? POS.right
                   : offset === total - 1    ? POS.left
                   :                           POS.back

      const method = animate ? 'to' : 'set'
      gsap[method](slide, {
        x:       pos.x,
        z:       pos.z,
        rotateY: pos.rotateY,
        scale:   pos.scale,
        opacity: pos.opacity,
        zIndex:  pos.zIndex,
        ...(animate ? { duration: ANIM_DUR, ease: 'power3.out' } : {})
      })

      slide.classList.toggle('is-side', offset === 1 || offset === total - 1)
    })
  }

  function updateDots() {
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current))
  }

  function startProgress() {
    if (!progress) return
    progress.style.transition = 'none'
    progress.style.width = '0%'
    void progress.offsetWidth
    progress.style.transition = `width ${INTERVAL}ms linear`
    progress.style.width = '100%'
  }

  function stopProgress() {
    if (!progress) return
    progress.style.transition = 'none'
    progress.style.width = '0%'
  }

  function resetTimer() {
    clearTimeout(timer)
    startProgress()
    timer = setTimeout(() => goTo(current + 1), INTERVAL)
  }
}
