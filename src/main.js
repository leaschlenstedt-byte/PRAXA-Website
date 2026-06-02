import './styles/main.css'

import { initSplash }       from './js/splash'
import { initNav }          from './js/nav'
import { initHero }         from './js/hero'
import { initUseCases }     from './js/usecases'
import { initHowCarousel }  from './js/how-carousel'
import { initAnimations }   from './js/animations'

document.addEventListener('DOMContentLoaded', () => {
  initNav()
  initHero()
  initUseCases()
  initHowCarousel()
  initAnimations()

  initSplash()
})
