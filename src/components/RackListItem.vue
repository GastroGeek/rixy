<template>
  <swipe-list
    ref="swipe"
    :items="[fx]"
    item-key="id"
  >
    <template v-slot="{}">
      <div
        ref="content"
        v-long-press="500"
        v-click-helper:250="toggleOrShow"
        class="relative p-3 text-center border-2 border-b-0 cursor-pointer bg-secondary rack-list-item border-primary"
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
        <span
          class="inline-block text-white truncate select-none label"
        >
          {{ fx.name }}
        </span>

        <font-awesome-icon
          class="absolute top-0 right-0 animate__animated animate__bounceIn power-indicator"
          :class="{
            'text-accent': isOn
          }"
          icon="power-off"
        />
      </div>
    </template>

    <template v-slot:left="{}">
      <div
        class="relative p-3 text-center border-2 border-b-0 border-r-0 cursor-pointer bg-secondary border-primary rack-list-swipe-item handle"
        style="min-width: 200px"
        @mousedown="closeAllSwipeActions"
        @touchmove="closeAllSwipeActions"
      >
        <font-awesome-icon
          icon="arrows-alt"
          class="cursor-move text-accent animate__animated animate__bounceIn"
        />
      </div>
    </template>

    <template v-slot:right="{}">
      <div
        class="relative p-3 text-center border-2 border-b-0 border-l-0 cursor-pointer bg-secondary border-primary rack-list-swipe-item text-accent hover:text-red-800"
        style="min-width: 200px"
        @click.stop="$emit('remove', fx)"
      >
        <font-awesome-icon
          icon="trash-alt"
          class="cursor-pointer animate__animated animate__bounceIn"
        />
      </div>
    </template>
  </swipe-list>
</template>

<script>
import ClickHelper from 'vue-click-helper'
import LongPress from 'vue-directive-long-press'

export default {
  name: 'RackListItem',
  directives: {
    ClickHelper,
    LongPress
  },
  props: {
    fx: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      pressed: false,
      control: null
    }
  },
  computed: {
    isOn () {
      if (!this.control) {
        return false
      }

      return this.control[this.prop].value[this.prop]
    },
    isOff () {
      return !this.isOn
    },
    willBe () {
      return this.isOn ^ 1
    },
    prop () {
      if (!this.control) {
        return ''
      }

      // grab the value of the on_off control
      return Object.keys(this.control[`${this.fx.id}.on_off`].value)[0]
    }
  },
  beforeMount () {
    this.getFxControl()
  },
  methods: {
    getFxControl () {
      this.$guitarix.sendMessage({
        method: 'queryunit',
        params: [this.fx.id]
      }, (control) => {
        this.control = control
      })
    },
    toggleOrShow (e, isDoubleClick) {
      if (isDoubleClick) {
        this.showFx()
      } else {
        this.closeAllSwipeActions()
        this.toggleFxPower()
      }
    },
    toggleFxPower () {
      this.$guitarix.sendMessage({
        method: 'set',
        params: [
          this.prop,
          this.willBe
        ]
      })

      this.getFxControl()
    },
    showFx () {
      this.$router.push({
        name: 'FxView',
        params: { id: this.fx.id }
      })
    },
    closeAllSwipeActions () {
      this.$refs.swipe.closeActions()
    }
  }
}
</script>

<style>
.rack-list-item {
  height: 50px;
}

.rack-list-item .label {
  max-width: 50%;
}

.rack-list-item .power-indicator {
  top: 16px;
  right: 16px;
}
</style>
