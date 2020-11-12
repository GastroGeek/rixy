import upperFirst from 'lodash/upperFirst'
import chunk from 'lodash/chunk'

const controlsMixin = {
  props: {
    fx: {
      type: Object,
      default: () => ({})
    },
    control: {
      type: Object,
      default: () => ({})
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    min () {
      return this.control.lower_bound
    },
    max () {
      return this.control.upper_bound
    },
    step () {
      return this.control.step
    },
    prop () {
      return Object.keys(this.control.value)[0]
    },
    category () {
      return this.fx.category
    },
    // should likely never be needed/called?
    // might be called on compressor
    propNameFallback () {
      var propName = Object.keys(this.control.value)[0]
        .split('.')
        .pop()
        .split('_')
        .map(val => upperFirst(val))
        .join(' ')

      return `${propName}`
    },
    propName () {
      if (!this.name) {
        return this.propNameFallback
      }

      var propName = this.name

      var chunks = chunk(
        propName
          .replace('/', '_')
          .split('_')
          .reverse(),
        2
      )

      if (chunks.length <= 1) {
        propName = chunks
          .pop()
          .map(upperFirst)
          .reverse()
          .join('/')
      } else {
        var secondaryChunk = [...chunks.pop()]

        propName = `${
          chunks
            .join('')
            .replace(',', '/')
            .split('/')
            .map(upperFirst)
            .reverse()
            .join('/')
          } (${upperFirst(secondaryChunk)})`
      }

      return propName.replace(/Of\s/, 'Off ') // misnaming on guitarix side
    }
  }
}

export {
  controlsMixin
}

export default controlsMixin
