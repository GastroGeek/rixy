<template>
  <div
    class="fx-list"
    :class="{
      expanded: expanded
    }"
  >
    <sidebar-menu
      :menu="menu"
      :show-one-child="true"
      :collapsed="!expanded"
      width="250px"
      disable-hover
      @toggle-collapse="$emit('expanded', !$event)"
    >
      <span slot="toggle-icon">
        <font-awesome-icon icon="bars" />
      </span>

      <span slot="dropdown-icon">
        <font-awesome-icon icon="angle-right" />
      </span>

      <span
        slot="footer"
        title="Reset All FXs"
        class="text-center cursor-pointer"
        @click="$emit('reset', $event)"
      >
        <font-awesome-icon
          class="my-2 text-accent"
          icon="undo"
        />

      </span>
    </sidebar-menu>
  </div>
</template>

<script>
import groupBy from 'lodash/groupBy'
import upperFirst from 'lodash/upperFirst'

import FxListItem from '@components/FxListItem'

export default {
  name: 'FxList',
  props: {
    expanded: {
      type: Boolean,
      default: false
    },
    fxs: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      mono: [],
      stereo: []
    }
  },
  computed: {
    menu () {
      var menu = [{
        header: true,
        title: 'FXS',
        hiddenOnCollapse: true
      }]

      var groups = ['mono', 'stereo']

      groups.forEach((group, groupIndex) => {
        var groupMenu = {
          title: upperFirst(group),
          child: []
        }

        var categories = groupBy(this[group], (fx) => {
          return fx.category
        })

        Object.keys(categories).filter(category => category).sort().forEach(category => {
          if (!this[group]) {
            return {}
          }

          groupMenu.child.push({
            title: category,
            child: this[group].filter(fx => fx.category === category).sort(this.fxNameSort).map(fx => {
              return {
                component: {
                  components: {
                    FxListItem
                  },
                  data () {
                    return {
                      [group]: [fx],
                      isLastItem: false
                    }
                  },
                  methods: {
                    canMove (evt) {
                      // prevent dragging within
                      // the fx list
                      return !!evt.relatedContext.list
                    }
                  },
                  template: `
                    <draggable
                      group="${group}"
                      :list="${group}"
                      :move="canMove"
                      drag-class="dragging"
                    >
                      <FxListItem
                        v-for="mfx in ${group}" :key="mfx.id"
                        :fx="mfx"
                      />
                    </draggable>
                  `
                }
              }
            })
          })
        })

        menu.push(groupMenu)
      })

      return menu
    }
  },
  watch: {
    fxs: {
      handler (fxs) {
        this.mono = fxs.filter(fx => !fx.stereo)
        this.stereo = fxs.filter(fx => fx.stereo)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    fxNameSort (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1
      }

      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1
      }

      return 0
    }
  }
}
</script>
