<template>
  <div class="rack-list-amp">
    <div
      class="text-center border-8 border-b-0 border-secondary bg-primary "
    >
      <div
        v-long-press="500"
        v-click-helper:250="toggleOrShow"
        class="p-8 text-center border-2 border-b-0 cursor-pointer bg-secondary border-primary rack-list-item"
        :class="{
          pressed: pressed
        }"
        @long-press-start="toggleOrShow($event, true)"
        @mousedown="pressed = true"
        @mouseup="pressed = false"
        @mouseleave="pressed = false"
        @touchstart="pressed = true"
        @touchend="pressed = false"
      >
        <span class="text-white select-none">Amp</span>
      </div>
    </div>
  </div>
</template>

<script>
import ClickHelper from 'vue-click-helper'
import LongPress from 'vue-directive-long-press'

export default {
  name: 'Amp',
  directives: {
    ClickHelper,
    LongPress
  },
  data () {
    return {
      pressed: false
    }
  },
  methods: {
    showFx () {
      this.$router.push({
        name: 'FxView',
        params: {
          id: 'ampstack'
        }
      })
    },
    toggleOrShow (e, isDoubleClick) {
      if (isDoubleClick) {
        this.showFx()
      } else {
        // this.closeAllSwipeActions()
        // this.toggleFxPower()
      }
    }
  }
}
</script>

<style>
.rack-list-amp .rack-list-item {
  height: 92px;
}

.rack-list-amp .rack-list-item.pressed {
  @apply border-4 border-b-4 !important;
}

.rack-list-amp > div:last-child .rack-list-item {
  @apply border-b-2 !important;
}

.rack-list-amp > div:last-child .rack-list-item.pressed {
  @apply border-b-4 !important;
}
</style>
