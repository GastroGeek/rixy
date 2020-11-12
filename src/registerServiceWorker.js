/* eslint-disable no-console */
import { logger } from '@utils'
import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      logger(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      logger('Service worker has been registered.')
    },
    cached () {
      logger('Content has been cached for offline use.')
    },
    updatefound () {
      logger('New content is downloading.')
    },
    updated () {
      logger('New content is available; please refresh.')
    },
    offline () {
      logger('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      logger('Error during service worker registration:', error)
    }
  })
}
