<script setup lang="ts">
  import { useStore } from "vuex";
  import {computed, ref, watch} from "vue";
  import {TStop} from "@/types/timetable";

  import AppCard from "@/components/AppCard/AppCard.vue";
  import AppCardTitle from "@/components/AppCard/AppCardTitle.vue";
  import AppCardContent from "@/components/AppCard/AppCardContent.vue";
  import SortableList from "@/components/SortableList.vue";
  import SearchField from "@/components/SearchField.vue";


  const { getters } = useStore();
  const filteredStops = ref<string[]>([]);
  const filterValue = ref('');

  const stops = computed<string[]>(() => {
    const list: TStop[] = getters.getStops();
    const stopNames = Array.from(new Set(list.map(item => item.stop)));
    stopNames.sort((a, b) => a.localeCompare(b));

    return stopNames;
  });

  watch(filterValue, () => {
    if (filterValue.value) {
      const stopName = filterValue.value.toLowerCase().trim();
      filteredStops.value = stops.value.filter(item => item.toLowerCase().includes(stopName));
    } else {
      filteredStops.value = [];
    }
  })
</script>

<template>
  <AppCard v-if="stops?.length"
           class="d-flex flex-column">
    <AppCardTitle>
      <SearchField v-model="filterValue" />
    </AppCardTitle>
    <AppCardContent class="px-0 pt-0 flex-grow-1 overflow-auto">
      <SortableList
          :items="filterValue ? filteredStops : stops"
          title="Bus Stops"
          is-sortable />
    </AppCardContent>
  </AppCard>
</template>