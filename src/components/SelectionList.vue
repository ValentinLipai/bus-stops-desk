<script setup lang="ts">
  import { defineEmits, defineProps } from 'vue';

  const props = defineProps({
    items: Array
  })
  const emit = defineEmits(['itemSelect']);
</script>
<template>
  <div v-if="items" class="d-flex flex-wrap gap-2">
    <button
        v-for="item in items"
        :key="item"
        @click="() => emit('itemSelect', item)"
        class="btn btn-primary btn-sm">{{ item }}</button>
  </div>
</template>