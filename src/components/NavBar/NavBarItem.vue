<script setup lang="ts">
  import {computed, defineProps} from "vue";

  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: false
    },
    href: {
      type: String,
      required: false,
      default: '/'
    },
    isActive: {
      type: Boolean,
    }
  })

  const LINK_BASE_CLASSES = 'nav-link px-4';

  const linkClasses = computed(() => `${LINK_BASE_CLASSES} ${props.isActive ? 'active' : ''}`);
</script>

<template>
  <li class="nav-item" :class="{ 'nav-item--active': props.isActive }">
    <template v-if="props.path">
      <router-link
          :to="props.path"
          :class="linkClasses"
      >
        {{ props.title }}
      </router-link>
    </template>
    <template v-else-if="props.href">
      <a :href="props.href" :class="linkClasses">{{ props.title }}</a>
    </template>
    <template v-else>
      <span :class="linkClasses">{{ props.title }}</span>
    </template>
  </li>
</template>

<style lang="scss" scoped>
  @use '@/assets/scss/variables';

  .nav-item > * {
    padding-top: 20px;
    padding-bottom: 18px;
    color: variables.$gray-light-3;
    font-weight: 500;
  }

  .nav-item--active {
    border-bottom: 2px solid variables.$blue;
  }

</style>