<template>
  <div id="app">
    <router-view v-if="online" />

    <div
      v-else
      class="flex h-screen text-white"
    >
      <div class="m-auto">
        <button>Ensure Guitarix is running...</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      online: 'guitarix/online'
    })
  },
  watch: {
    online (isOnline) {
      if (isOnline) {
        this.getFxs()
      }
    }
  },
  beforeMount () {
    this.getFxs()
  },
  methods: {
    ...mapActions({
      getFxs: 'guitarix/getFxs'
    })
  }
}
</script>

<style>
html, body {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  @apply bg-secondary;
}
</style>
