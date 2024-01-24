<script setup>
import { defineProps } from "vue";

import HeaderComponent from "@/components/HeaderComponent.vue";

const props = defineProps({
  showHeader: {
    type: Boolean,
    default: true
  },
  pageTitle: {
    type: String,
    required: false
  }
})

</script>
<template>
  <div class="base-layout">
    <HeaderComponent v-if="showHeader" :title="props.pageTitle" />
    <main :class="{'mt-4': showHeader}">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
  body {
    background-color: #E5E5E5;
  }

  .base-layout {
    padding: 40px 20px;
  }
</style>
