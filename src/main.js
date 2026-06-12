import './styles/main.css'

import { initI18n }         from './js/i18n'
import { initSplash }       from './js/splash'
import { initNav }          from './js/nav'
import { initHero }         from './js/hero'
import { initUseCases }     from './js/usecases'
import { initHowCarousel }  from './js/how-carousel'
import { initAnimations }   from './js/animations'

document.addEventListener('DOMContentLoaded', () => {
  initI18n()
  initNav()
  initHero()
  initUseCases()
  initHowCarousel()
  initAnimations()

  initSplash()
})
