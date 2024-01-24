<script setup>
  import { routes } from "@/router/timetable";
  import BaseLayout from "@/layouts/BaseLayout.vue";
  import NavBar from "@/components/NavBar/NavBar.vue";
  import NavBarNav from "@/components/NavBar/NavBarNav.vue";
  import NavBarItem from "@/components/NavBar/NavBarItem.vue";

  import { useStore } from "vuex";
  import {onMounted} from "vue";

  const store = useStore();

  onMounted(async () => {
    await store.dispatch("fetchTimetableData");
  });

</script>

<template>
  <BaseLayout show-header page-title="Timetable">
    <NavBar class="mb-3">
      <NavBarNav>
        <NavBarItem
            v-for="route in routes"
            :key="route.path"
            :is-active="$route.path === route.path"
            :path="route.path"
            :title="route.name"
        />
      </NavBarNav>
    </NavBar>

    <router-view />
  </BaseLayout>
</template>