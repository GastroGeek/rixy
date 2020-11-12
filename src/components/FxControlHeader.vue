<template>
  <div class="fx-header">
    <div class="border-8 border-b-0 bg-primary border-secondary">
      <div class="p-8 text-center border-2 border-primary bg-secondary">
        <span class="text-white select-none">
          {{ name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FxControlHeader',
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.fx-header {
  height: 100px;
}
</style>
