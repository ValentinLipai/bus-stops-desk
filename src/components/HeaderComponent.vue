<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    title: {
      type: String,
      default: ''
    }
  })
</script>

<template>
  <header>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <h1>{{ props.title }}</h1>
        </div>
      </div>
    </div>
  </header>
</template>