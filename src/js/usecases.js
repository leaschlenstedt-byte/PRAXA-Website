import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import gsap from 'gsap'

export function initUseCases() {
  new Swiper('.uc-swiper', {
    modules: [Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: { 961: { slidesPerView: 3, spaceBetween: 24, allowTouchMove: false } }
  })

  // Create modal overlay
  const overlay = document.createElement('div')
  overlay.className = 'uc-modal-overlay'
  overlay.setAttribute('aria-hidden', 'true')
  document.body.appendChild(overlay)

  let openId = null

  function openModal(id) {
    const panel = document.getElementById(id)
    if (!panel) return
    openId = id
    panel.classList.add('is-open')
    overlay.classList.add('is-visible')
    document.body.style.overflow = 'hidden'
    document.querySelector(`[data-target="${id}"]`)?.setAttribute('aria-expanded', 'true')
    gsap.fromTo(panel, { opacity: 0, y: 32, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' })
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
  }

  function closeModal() {
    if (!openId) return
    const panel = document.getElementById(openId)
    document.querySelector(`[data-target="${openId}"]`)?.setAttribute('aria-expanded', 'false')
    openId = null
    gsap.to(overlay, { opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: () => overlay.classList.remove('is-visible') })
    if (panel) gsap.to(panel, {
      opacity: 0, y: 16, scale: 0.97, duration: 0.3, ease: 'power2.in',
      onComplete: () => { panel.classList.remove('is-open'); gsap.set(panel, { clearProps: 'all' }); document.body.style.overflow = '' }
    })
  }

  document.querySelectorAll('.uc-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.target))
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click() } })
  })

  document.querySelectorAll('.uc-close-btn').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); closeModal() })
  })

  overlay.addEventListener('click', closeModal)

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal() })
}
