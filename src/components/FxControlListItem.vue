<template>
  <div class="fx-control-list-item">
    <div class="p-2 text-white border-2 border-b-0 bg-secondary border-primary">
      <component
        :is="lookupControlComponent(control)"
        class=""
        v-bind="{
          fx: fx,
          control: control,
          name: control.name,
        }"
        @change="$emit('change', $event)"
      />
    </div>
  </div>
</template>

<script>
import Bool from '@components/controls/Bool'
import Enum from '@components/controls/Enum'
import Float from '@components/controls/Float'
import Int from '@components/controls/Int'

export default {
  name: 'FxControl',
  components: {
    Bool,
    Enum,
    Float,
    Int
  },
  props: {
    fx: {
      type: Object,
      default: () => ({})
    },
    control: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    lookupControlComponent (control) {
      if (control.value_names && control.value_names.length) {
        return 'enum'
      } else if (control.lower_bound === 0 && control.upper_bound === 1 & control.step === 1) {
        return 'bool'
      }
      return control.type
    }
  }
}
</script>
