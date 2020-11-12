const {
  NODE_ENV: env,
  VUE_APP_DISABLE_LOGGER: DISABLE_LOGGER
} = process.env

const isDisabled = ['prod', 'production'].includes(env.toLowerCase()) || ['1', 'true', true].includes(DISABLE_LOGGER)

const logger = (msg, payload = false) => {
  if (isDisabled) {
    return
  }

  if (!payload) {
    console.log('[RIXY]:', msg)
  } else {
    console.log(`[RIXY]: ${msg}`, payload)
  }
}

const utils = {
  logger
}

export {
  logger
}

export default utils
