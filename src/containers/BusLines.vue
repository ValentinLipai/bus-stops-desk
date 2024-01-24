<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";

import AppCard from "@/components/AppCard/AppCard.vue";
import AppCardTitle from "@/components/AppCard/AppCardTitle.vue";
import AppCardContent from "@/components/AppCard/AppCardContent.vue";
import SelectionList from "@/components/SelectionList.vue";
import SortableList from "@/components/SortableList.vue";
import {TStop} from "@/types/timetable";
import ContentPlaceholder from "@/components/ContentPlaceholder.vue";

const { getters } = useStore();

const lines = computed(() => getters.getLines()) as unknown as number[];
const selectedLine = ref<number>();
const selectedStop = ref<TStop>();
const lineStops = ref<TStop[]>([]);
const lineStopsNames = ref<string[]>([]);
const lineTimeList = ref<string[]>([]);


const handleSelectLine = (line: number) => {
  selectedLine.value = line;
  lineTimeList.value = [];

  if (line) {
    const stops: TStop[] = getters.getStopsByLine(selectedLine.value);
    lineStops.value = stops;
    lineStopsNames.value = Array.from(new Set(stops.map(item => item.stop)));
  }
}

const handleSelectStop = (stopTitle: string) => {
  selectedStop.value = lineStops.value.find(item => item.stop === stopTitle);

  const timeList = lineStops.value.reduce((acc, item) => {
    if (item.stop === stopTitle) {
      acc.push(item.time);
    }

    return acc;
  }, [] as string[])

  timeList.sort((a, b) => new Date(`2023-01-01 ${a}`).getTime() - new Date(`2023-01-01 ${b}`).getTime());

  lineTimeList.value = timeList;
}

</script>
<template>
  <AppCard>
    <AppCardTitle>
      <h6>Select Bus line</h6>
    </AppCardTitle>
    <AppCardContent>
      <SelectionList :items="lines" @item-select="handleSelectLine" />
    </AppCardContent>
  </AppCard>
  <div class="row mt-3">
    <div class="col col-6">
      <div class="bus-lines-info-col">
        <AppCard v-if="selectedLine && lineStops?.length"
                 class="d-flex flex-column">
          <AppCardTitle>
            <b>Bus Line: {{selectedLine}}</b>
          </AppCardTitle>
          <AppCardContent class="px-0 pt-0 flex-grow-1 overflow-auto">
            <SortableList
                :items="lineStopsNames"
                :selected-item="selectedStop?.stop"
                @item-select="handleSelectStop"
                title="Bus Stops"
                is-sortable />
          </AppCardContent>
        </AppCard>
        <ContentPlaceholder v-else placeholder="Please select the bus line first" />
      </div>
    </div>
    <div class="col col-6">
      <div class="bus-lines-info-col">
        <AppCard v-if="selectedStop && lineTimeList?.length"
          class="d-flex flex-column">
          <AppCardTitle>
            <b>Bus Line: {{selectedLine}}</b>
          </AppCardTitle>
          <AppCardContent class="px-0 pt-0 flex-grow-1 overflow-auto">
            <SortableList
                :items="lineTimeList"
                title="Time" />
          </AppCardContent>
        </AppCard>
        <ContentPlaceholder v-else
                            :placeholder="!!selectedLine ? 'Please select the bus line first' : 'Please select the bus stop first'" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bus-lines-info-col {
  position: relative;
  padding-bottom: calc(444 / 680 * 100%);

  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
