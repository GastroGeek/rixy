<template>
  <div class="relative">
    <input
      v-model="value"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      class="block w-full bg-black border rounded-none border-accent float-slider"
      @input="
        $emit('change', {
          prop: prop,
          value: parseFloat(value),
          category: category,
        })
      "
    >

    <span
      class="absolute top-0 left-0 z-10 p-1 m-3 text-sm text-white pointer-events-none"
    >
      {{ propName }}
    </span>

    <span
      class="absolute top-0 right-0 z-10 p-1 m-3 text-sm text-white pointer-events-none"
    >
      {{ percent }}%
    </span>
  </div>
</template>

<script>
import { controlsMixin } from './mixin'

export default {
  name: 'Float',
  mixins: [controlsMixin],
  data () {
    return {
      value: 0
    }
  },
  computed: {
    percent () {
      return (
        (parseFloat(this.value) - parseFloat(this.min)) /
        Math.abs(parseFloat(this.max) - parseFloat(this.min)) * 100
      ).toFixed(0)
    }
  },
  watch: {
    control: {
      handler (control) {
        this.value = control.value[this.prop]
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style>
.float-slider {
  @apply border-none rounded-none outline-none;
  overflow: hidden;
  -webkit-appearance: none;
  @apply bg-primary;
}

.float-slider::-webkit-slider-runnable-track {
  height: 51px;
  -webkit-appearance: none;
  margin-top: -1px;
  pointer-events: none;
}

.float-slider::-webkit-slider-thumb {
  width: 0px;
  -webkit-appearance: none;
  height: 51px;
  cursor: ew-resize;
  @apply bg-secondary;
  border: none;
  box-shadow: -100vw 0 0 100vw #77994F
}

.float-slider {
  height: 50px;
  @apply border-none rounded-none outline-none;
  overflow: hidden;
  -webkit-appearance: none;
  @apply bg-primary;
}

.float-slider::-moz-range-thumb {
  width: 0px;
  -webkit-appearance: none;
  height: 51px;
  border: none;
  cursor: ew-resize;
  @apply bg-secondary;
  box-shadow: -100vw 0 0 100vw #77994F
}

.float-slider::-moz-range-track {
  -webkit-appearance: none;
  margin-top: -1px;
  pointer-events: none;
}

@supports (-webkit-touch-callout: none) {
  .float-slider::-webkit-slider-thumb {
    width: 20px;
  }
}

</style>
