<template>
  <div class="search position-relative d-inline-block">
    <input type="text"
           class="form-control w-100 input"
           placeholder="Search..."
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)">

    <IconComponent name="search" size="16" class="icon" />
  </div>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue';
  import IconComponent from "@/components/Icon/IconComponent.vue";
  defineProps(['modelValue']);
  defineEmits(['update:modelValue']);
</script>

<style scoped lang="scss">
  @use '@/assets/scss/variables';

  .search {
    width: 288px;
    max-width: 100%;
  }

  .input {
    border-color: variables.$gray-light;
    border-width: 1px;
    color: variables.$black;

    &::placeholder {
      color: variables.$gray-light-3;
    }

    &:focus {
      outline: none;
      box-shadow: none;
      border-color: variables.$blue;

      ~ .icon {
        color: variables.$blue;
      }
    }
  }

  .icon {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);

    color: variables.$gray-light-3;
  }
</style>