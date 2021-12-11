<template>
  <div class="rack-list-amp">
    <div
      class="text-center border-8 border-b-0 border-secondary bg-primary "
    >
      <div
        class="flex justify-center items-center text-center border-2 border-b-0 cursor-pointer bg-secondary border-primary rack-list-item"
        @dblclick="showFx"
      >
        <span class="text-white select-none">Amp</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Amp',

  methods: {
    showFx () {
      this.$router.push({
        name: 'FxView',
        params: {
          id: 'ampstack'
        }
      })
    }
  }
}
</script>

<style>
.rack-list-amp .rack-list-item {
  height: 92px;
}

.rack-list-amp .rack-list-item:active {
  @apply border-4 border-b-4 !important;
}

.rack-list-amp > div:last-child .rack-list-item {
  @apply border-b-2 !important;
}

.rack-list-amp > div:last-child .rack-list-item:active {
  @apply border-b-4 !important;
}
</style>
