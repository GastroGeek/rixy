<template>
  <div
    class="h-screen rack-list"
    :class="{
      expanded: expanded
    }"
  >
    <Amp />

    <draggable
      v-model="mono"
      class="overflow-y-scroll border-8 border-secondary bg-primary rack-list-mono"
      group="mono"
      handle=".handle"
      drag-class="dragging"
      :move="canMove"
      @change="changeFx"
    >
      <RackListItem
        v-for="fx in mono"
        :key="fx.id"
        :fx="fx"
        @remove="$emit('removed', $event)"
      />
    </draggable>

    <draggable
      v-model="stereo"
      class="overflow-y-scroll border-8 border-t-0 border-secondary bg-primary rack-list-stereo"
      group="stereo"
      handle=".handle"
      drag-class="dragging"
      :move="canMove"
      @change="changeFx"
    >
      <RackListItem
        v-for="fx in stereo"
        :key="fx.id"
        :fx="fx"
        @remove="$emit('removed', $event)"
      />
    </draggable>
  </div>
</template>

<script>
import Amp from '@components/Amp'
import RackListItem from '@components/RackListItem'

export default {
  name: 'RackList',
  components: {
    Amp,
    RackListItem
  },
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
    canMove (evt) {
      // prevent dragging to
      // the fx list
      return !!evt.relatedContext.list
    },
    changeFx ({ moved, added }) {
      const changed = moved || added

      // we only care if either moved, or added
      if (!changed) return

      var fxIsStereo = changed.element.stereo
      var fxId = changed.element.id

      var fxBeforeId = ''
      if (fxIsStereo && changed.newIndex < this.stereo.length - 1) {
        fxBeforeId = this.stereo[changed.newIndex + 1].id
      } else if (!fxIsStereo && changed.newIndex < this.mono.length - 1) {
        fxBeforeId = this.mono[changed.newIndex + 1].id
      }

      this.$emit('inserted', {
        fx: fxId,
        before: fxBeforeId,
        stereo: fxIsStereo
      })
    }
  }
}
</script>

<style>
.rack-list {
  margin-left: 250px;
  transition: 0.3s ease;
}

.rack-list.expanded {
  margin-left: 50px;
}

.rack-list-mono,
.rack-list-stereo {
  height: calc(50vh - 50px);
}

/* pressed */
.rack-list-mono .rack-list-item.pressed,
.rack-list-stereo .rack-list-item.pressed {
  @apply border-4 border-b-2;
}

/* dragging */
.rack-list-mono .dragging,
.rack-list-stereo .dragging {
  @apply border-0 !important;
}

.rack-list-mono .dragging .rack-list-item,
.rack-list-stereo .dragging .rack-list-item {
  @apply border-2 border-accent;
}

/* normal */
.rack-list-mono > div:last-child .rack-list-item,
.rack-list-mono > div:last-child .rack-list-swipe-item,
.rack-list-stereo > div:last-child .rack-list-item,
.rack-list-stereo > div:last-child .rack-list-swipe-item {
  @apply border-b-2;
  height: 52px; /* lazy hack */
}

/* pressed */
.rack-list-mono > div:last-child .rack-list-item.pressed,
.rack-list-stereo > div:last-child .rack-list-item.pressed {
  @apply border-b-4;
}

/* dragging */
.rack-list-mono .dragging > div:last-child .rack-list-item,
.rack-list-stereo .dragging > div:last-child .rack-list-item {
  @apply border-b-2;
}

/* when dragging an fx-list-item in */
.rack-list-mono .sortable-ghost .rack-list-item,
.rack-list-stereo .sortable-ghost .rack-list-item {
  @apply border-b-0 !important;
}

.rack-list-mono > div:last-child.sortable-ghost .rack-list-item,
.rack-list-stereo > div:last-child.sortable-ghost .rack-list-item {
  @apply border-b-2 !important;
}

.rack-list-mono > div:last-child.sortable-ghost.fx-list-item,
.rack-list-stereo > div:last-child.sortable-ghost.fx-list-item {
  @apply border-b-2;
  height: 52px; /* lazy hack */
}
</style>
