<template>
  <icomoon :iconSet="iconSet" v-bind="$props" />
</template>

<script>
import { Icomoon, iconList } from "vue-icomoon";
import iconSet from "./selection.json";

export default {
  name: "IconComponent",
  components: { Icomoon },
  setup() {
    return {
      iconSet,
    };
  },
};
</script>