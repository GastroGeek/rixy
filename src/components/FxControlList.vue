<template>
  <div
    v-if="controls[powerControl]"
    class="overflow-y-scroll border-8 border-secondary bg-primary fx-control-list"
  >
    <!-- always show power first -->
    <h1 class="pt-2 pb-1 pl-2 text-xs select-none text-accent">
      {{ controls[powerControl].group }}
    </h1>

    <FxControlListItem
      :control="controls[powerControl]"
      :fx="fx"
      :name="powerControl"
      @change="$emit('change', $event)"
    />

    <div
      v-for="(group, groupIndex) in Object.keys(groupedControls)"
      :key="groupIndex"
    >
      <!-- group label -->
      <h1
        v-if="group !== controls[powerControl].group"
        class="pt-2 pb-1 pl-2 text-xs select-none text-accent"
      >
        {{ group }}
      </h1>

      <FxControlListItem
        v-for="control in Object.keys(groupedControls[group]).sort(powerFirstSort)"
        :key="groupedControls[group][control].id"
        :control="groupedControls[group][control]"
        :fx="fx"
        :name="groupedControls[group][control].name"
        @change="$emit('change', $event)"
      />
    </div>
  </div>
</template>

<script>
/**
 * this file is a bit messy. could probably
 * extract the various variables from the template
 * and move them into computed/methods etc.
 */
import upperFirst from 'lodash/upperFirst'
import uniq from 'lodash/uniq'

import FxControlListItem from '@components/FxControlListItem'

export default {
  name: 'FxControlList',
  components: {
    FxControlListItem
  },
  props: {
    fx: {
      type: Object,
      default: () => ({})
    },
    controls: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    powerControl () {
      return `${this.fx.id}.on_off`
    },
    groups () {
      return uniq(
        Object.keys(this.controls).map(control => this.controls[control].group)
      )
        .sort()
    },
    groupedControls () {
      var groupedControls = {}

      this.groups.forEach(group => {
        if (!groupedControls[group]) {
          groupedControls[group] = {}
        }

        var groupControls = {}

        this.nonPowerControlsSorted.forEach(control => {
          if (this.controls[control].group === group) {
            groupControls[control] = this.controls[control]
          }
        })

        groupedControls[group] = groupControls
      })

      var nonEmptyGroupedControls = {}

      Object.keys(groupedControls).forEach(groupedControl => {
        if (Object.keys(groupedControls[groupedControl]).length) {
          nonEmptyGroupedControls[groupedControl] = groupedControls[groupedControl]
        }
      })

      return nonEmptyGroupedControls
    },
    nonPowerControlsSorted () {
      return Object.keys(this.controls).filter(c => {
        return (!c.split('.').some(a => {
          return ['pp', 'position', 's_h'].includes(a)
        }) && c !== this.powerControl)
      }).sort(this.propNameSort)
    }
  },
  methods: {
    powerFirstSort (a, b) {
      if (a.includes('on_off')) {
        return -1
      } else {
        return [a, b].sort()
      }
    },
    propName (control) {
      var parts = control.name.split('.')
      var propName = parts.pop()
        .split('_')
        .map(upperFirst)
        .join('/')
        .split('/')
        .map(upperFirst)
        .join('/')

      // TODO
      return `${propName}`
    },
    propNameSort (a, b) {
      if (this.propName(this.controls[a]).toLowerCase().replace('/', '') < this.propName(this.controls[b]).replace('/', '').toLowerCase()) {
        return -1
      }

      if (this.propName(this.controls[a]).replace('/', '').toLowerCase() > this.propName(this.controls[b]).replace('/', '').toLowerCase()) {
        return 1
      }

      return 0
    }
  }
}
</script>

<style>
.fx-control-list {
  height: calc(100vh - 100px);
}

.fx-control-list-item:last-child {
  @apply border-b-2 border-primary;
}
</style>
