import utils from '@utils'

/**
 * TX: Transmitted
 * RX: Received
 * EX: Error
 * CB: Callback
 * QU: Queue
 */
const { logger } = utils

const GUITARIX_NAMESPACE = 'guitarix'

const { VUE_APP_GUITARIX_IGNORE_FX: FX_IGNORE_LIST } = process.env

// clean up fx ids
const fxIgnoreList = FX_IGNORE_LIST.split(',').map(fx => fx.trim())

const methodsRequiringIds = [
  'banks',
  'get',
  'get_parameter',
  'getstate',
  'queryunit'
]

class GuitarixSocket {
  /**
   * private methods
   */
  constructor (opts) {
    this._init(opts)
  }

  _init (opts) {
    // store opts
    this._opts = opts
    this._store = opts.store

    // create socket
    this._socket = new WebSocket(`ws://${opts.host}:${opts.port}`)

    this._socket.onopen = this._onOpen.bind(this)
    this._socket.onclose = this._onClose.bind(this)
    this._socket.onmessage = this._onMessage.bind(this)
    this._socket.onerror = this._onError.bind(this)

    // utils
    this._msgId = 1
    // create stores
    this._queue = []
    this._callbacks = []

    this._connected = false

    // debug
    window.guitarix = this
  }

  _onOpen () {
    this._connected = true
    this._store.dispatch(`${GUITARIX_NAMESPACE}/setOnlineStatus`, true)

    this.sendMessage({
      method: 'listen',
      params: [
        'state',
        'freq',
        'display',
        'tuner',
        'presetlist_changed',
        'param',
        'units_changed'
      ]
    })

    if (this._queue.length) {
      logger('QU: ', this._queue)

      this._queue.forEach(msg => {
        this.sendMessage(msg)
      })

      this._queue = []
    }
  }

  _onClose () {
    this._connected = false
    this._store.dispatch(`${GUITARIX_NAMESPACE}/setOnlineStatus`, false)

    this._attemptReconnect()
  }

  _onMessage (response) {
    try {
      var msg = JSON.parse(response.data)
      logger('RX: ', msg)
    } catch (e) {
      logger('EX: ', e)
    }

    // something we requested
    if (msg.id) {
      const callbackable = this._callbacks.find(callback => callback.msg.id === parseInt(msg.id))

      if (callbackable) {
        this._callbacks = this._callbacks.filter(callback => callback.msg.id !== parseInt(msg.id))
        callbackable.callback(msg.result)
      }

      return
    }

    // something changed guitarix-side
    switch (msg.method) {
      case 'set':
        logger('RX [set]: ', msg)
        break
      default:
        logger('RX [default]: ', msg)
        break
    }
  }

  _onError (e) {
    this._store.dispatch(`${GUITARIX_NAMESPACE}/setOnlineStatus`, false)

    logger('EX: ', e)

    this._socket.close()
  }

  _attemptReconnect () {
    setTimeout(() => {
      this._init(this._opts)

      logger('Reconnecting...')
    }, 2000)
  }

  /**
   * helpers (internal)
   */
  _needsId (method) {
    return methodsRequiringIds.includes(method)
  }

  /**
   * public methods
   */
  sendMessage (msg, callback = false) {
    // only add id to non-queued msgs
    if (!msg.id && this._needsId(msg.method)) {
      msg.id = this._msgId++
    }

    if (callback) {
      logger('CB:', msg, callback)

      this._callbacks.push({
        msg,
        callback
      })
    }

    if (this._connected) {
      logger('TX: ', msg)

      this._socket.send(JSON.stringify(msg))
    } else {
      this._queue.unshift(msg)
    }
  }
}

const GuitarixPlugin = {
  install (Vue, opts = {}) {
    var guitarixSocket = new GuitarixSocket(opts)

    // register vuex module
    opts.store.registerModule(GUITARIX_NAMESPACE, {
      namespaced: true,
      state: {
        online: true,
        fxs: [],
        menuExpanded: false
      },
      getters: {
        online (state) {
          return state.online
        },
        menuExpanded (state) {
          return state.menuExpanded
        },
        activeFxs (state) {
          return state
            .fxs
            .filter(fx => fx.box_visible)
        },
        inactiveFxs (state) {
          return state
            .fxs
            .filter(fx => !fx.box_visible)
        },
        fxById: (state) => (id) => {
          return state.fxs.find(fx => fx.id === id)
        }
      },
      actions: {
        setOnlineStatus ({ commit }, online) {
          commit('setOnlineStatus', online)
        },
        setMenuExpanded ({ commit }, menuExpanded) {
          commit('setMenuExpanded', menuExpanded)
        },
        getFxs ({ commit }) {
          guitarixSocket.sendMessage({
            method: 'get',
            params: [
              'sys.visible_mono_plugins',
              'sys.visible_stereo_plugins'
            ]
          }, (plugins) => {
            commit('setFxs', [
              ...plugins['sys.visible_mono_plugins'],
              ...plugins['sys.visible_stereo_plugins']
            ].filter(fx => {
              if (fxIgnoreList.includes(fx.id)) {
                logger('IFX: ', fx.id)
              }

              return !fxIgnoreList.includes(fx.id)
            }))
          })
        },
        insertFx ({ dispatch }, { fx, before, stereo }) {
          guitarixSocket.sendMessage({
            method: 'insert_rack_unit',
            params: [
              fx,
              before,
              stereo
            ]
          })

          dispatch('getFxs')
        },
        removeFx ({ dispatch }, fx) {
          guitarixSocket.sendMessage({
            method: 'remove_rack_unit',
            params: [
              fx.id,
              fx.stereo
            ]
          })

          dispatch('getFxs')
        },
        removeAllActiveFxs ({ dispatch, getters }) {
          getters.activeFxs.forEach(fx => {
            dispatch('removeFx', fx)
          })
        }
      },
      mutations: {
        setOnlineStatus (state, online) {
          state.online = online
        },
        setMenuExpanded (state, menuExpanded) {
          state.menuExpanded = menuExpanded
        },
        setFxs (state, fxs) {
          state.fxs = fxs
        }
      }
    }, {})

    // expose utils
    Vue.prototype.$guitarix = {
      sendMessage: guitarixSocket.sendMessage.bind(guitarixSocket),
      log: utils.logger
    }
  }
}

export default GuitarixPlugin
