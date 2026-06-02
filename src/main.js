import './styles/main.css'

import { initSplash }       from './js/splash'
import { initNav }          from './js/nav'
import { initHero }         from './js/hero'
import { initUseCases }     from './js/usecases'
import { initHowCarousel }  from './js/how-carousel'
import { initAnimations }   from './js/animations'

document.addEventListener('DOMContentLoaded', () => {
  // Make site visible immediately — splash overlay covers it
  document.body.classList.remove('is-loading')

  initNav()
  initHero()
  initUseCases()
  initHowCarousel()
  initAnimations()

  initSplash()
})
