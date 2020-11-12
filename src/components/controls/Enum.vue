<template>
  <div class="relative">
    <vue-select
      v-model="selected"
      class="enum-select"
      :options="options"
      :clearable="false"
      @input="$emit('change', {
        prop: prop,
        value: selected.value,
        category: category,
      })"
    />

    <span class="text-xs text-white text-opacity-50 select-none">
      {{ propName }}
    </span>
  </div>
</template>

<script>
import upperFirst from 'lodash/upperFirst'
import { controlsMixin } from './mixin'

export default {
  name: 'Enum',
  mixins: [controlsMixin],
  data () {
    return {
      selected: ''
    }
  },
  computed: {
    options () {
      return this.control.value_names.map(vn => {
        return {
          label: upperFirst(vn[0]),
          value: vn[1]
        }
      })
    }
  },
  beforeMount () {
    this.selected = upperFirst(this.control.value[this.prop].trim())
  }
}

</script>

<style>
.enum-select .vs__search::placeholder,
.enum-select .vs__dropdown-toggle,
.enum-select .vs__dropdown-menu {
  @apply bg-accent;
  @apply px-1 border-2 border-accent rounded-none;
}

.enum-select .vs__selected {
  @apply text-sm;
}

.enum-select:focus {
  background-color: red !important;
}

.enum-select .vs__dropdown-toggle {
  height: 50px;
}

.enum-select .vs__clear,
.enum-select .vs__open-indicator {
  fill: white;
}

.enum-select .vs--single .vs__selected,
.enum-select .vs--single .vs--open .vs__selected {
  @apply p-2;
}

.enum-select .vs--single.vs--open .vs__selected {
  top: 1px;
}

.enum-select .vs__selected {
  @apply text-white;
}

.enum-select .vs__dropdown-option {
  @apply p-2;
}

.enum-select .vs__dropdown-option:hover {
  @apply bg-secondary !important;
}

.enum-select .vs__dropdown-option--highlight {
  @apply bg-secondary;
}

.enum-select {
  position: relative;
}
</style>
