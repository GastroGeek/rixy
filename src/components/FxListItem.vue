<template>
  <div class="p-3 text-center text-white truncate border-2 border-b-0 cursor-move bg-secondary border-primary fx-list-item">
    {{ fx.name }}
  </div>
</template>

<script>
export default {
  name: 'FxListItem',
  props: {
    fx: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style>
.fx-list-item {
  height: 50px;
}

.fx-list-item.dragging {
  @apply border-2 border-accent;
}
</style>
