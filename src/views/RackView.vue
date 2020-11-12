<template>
  <div class="h-screen rack-view">
    <FxList
      :fxs="inactiveFxs"
      :expanded="menuExpanded"
      @expanded="setMenuExpanded"
      @reset="removeAllActiveFxs"
    />

    <RackList
      :expanded="!menuExpanded"
      :fxs="activeFxs"
      @inserted="insertFx"
      @removed="removeFx"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import FxList from '@components/FxList'
import RackList from '@components/RackList'

export default {
  name: 'RackView',
  components: {
    FxList,
    RackList
  },
  computed: {
    ...mapGetters({
      menuExpanded: 'guitarix/menuExpanded',
      activeFxs: 'guitarix/activeFxs',
      inactiveFxs: 'guitarix/inactiveFxs'
    })
  },
  beforeMount () {
    this.setMenuExpanded(false)
  },
  methods: {
    ...mapActions({
      setMenuExpanded: 'guitarix/setMenuExpanded',
      insertFx: 'guitarix/insertFx',
      removeFx: 'guitarix/removeFx',
      removeAllActiveFxs: 'guitarix/removeAllActiveFxs'
    })
  }
}
</script>
