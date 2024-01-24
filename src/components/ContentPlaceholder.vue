<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    placeholder: {
      type: String,
      default: ''
    }
  })
</script>

<template>
  <div class="content-placeholder d-flex align-items-center h-100 justify-content-center border border-2 rounded-1 bg-white">
    {{placeholder}}
  </div>
</template>

<style scoped lang="scss">
  @use '@/assets/scss/variables';

  .content-placeholder {
    color: variables.$gray;
    border-color: variables.$gray;
    --bs-border-style: dashed;
  }
</style>