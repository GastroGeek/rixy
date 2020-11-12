<template>
  <div class="relative">
    <button
      class="block w-full py-6 text-white border border-accent focus:outline-none"
      :class="{
        'bg-black': isOff,
        'bg-accent': isOn,
      }"
      @click="
        $emit('change', {
          prop: prop,
          value: willBe,
          category: category,
        })
      "
    />

    <span
      class="absolute top-0 left-0 p-1 m-3 text-sm text-white select-none"
    >
      {{ propName }}
    </span>

    <span
      class="absolute top-0 right-0 p-1 m-3 text-sm text-white"
    >
      <font-awesome-icon
        icon="power-off"
      />
    </span>
  </div>
</template>

<script>
import { controlsMixin } from './mixin'

export default {
  name: 'Bool',
  mixins: [controlsMixin],
  computed: {
    isOn () {
      return this.control.value[this.prop]
    },
    isOff () {
      return !this.isOn
    },
    willBe () {
      return this.isOn ^ 1
    }
  }
}
</script>
