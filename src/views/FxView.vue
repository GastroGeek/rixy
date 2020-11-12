<template>
  <div class="h-screen fx-view">
    <FxControlHeader
      v-if="fx"
      :name="fx.name"
    />

    <FxControlList
      :fx="fx"
      :controls="allControls"
      @change="updateFxControl"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'

import FxControlHeader from '@components/FxControlHeader'
import FxControlList from '@components/FxControlList'

export default {
  name: 'FxView',
  components: {
    FxControlHeader,
    FxControlList
  },
  data () {
    return {
      controls: {},
      augmentedControls: {}
    }
  },
  computed: {
    fx () {
      return this.fxById(this.$route.params.id)
    },
    ...mapGetters({
      fxById: 'guitarix/fxById'
    }),
    allControls () {
      return {
        ...this.controls,
        ...this.augmentedControls
      }
    }
  },
  beforeMount () {
    this.getFxControl()
  },
  methods: {
    getFxControl: throttle(function () {
      const isViewingAmpFx = this.$route.params.id === 'ampstack'

      // here we want a straight callback from guitarix
      // to augment local state (mostly on/off status)
      this.$guitarix.sendMessage({
        method: 'queryunit',
        params: [this.$route.params.id]
      }, (controls) => {
        this.controls = controls
      })

      // augment with amplifier controls if applicable
      if (isViewingAmpFx) {
        this.$guitarix.sendMessage({
          method: 'get_parameter',
          params: [
            // main
            'amp.out_master',

            // noise gate
            'noise_gate.on_off',
            'noise_gate.threshold',

            // compressor
            'shaper.on_off',
            'shaper.sharper',

            // mono level
            'amp.on_off',
            'amp.out_amp',

            // clip
            'amp.clip.on_off',
            'amp.fuzz',

            // bass boots
            'amp.bass_boost.on_off',
            'bassbooster.Level',

            // presence
            'con.on_off',
            'con.Level',

            // reverb
            'amp.feed_on_off',
            'amp.wet_dry'
          ]
        }, (controls) => {
          this.augmentedControls = controls
        })
      }
    }, 350),
    updateFxControl (fx, control, value) {
      this.$guitarix.sendMessage({
        method: 'set',
        params: [
          fx.prop,
          fx.value
        ]
      })

      this.$nextTick(() => {
        this.getFxControl()
      })
    }
  }
}
</script>
