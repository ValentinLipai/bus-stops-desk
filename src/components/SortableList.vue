<script setup lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import {computed, defineEmits, defineProps, onMounted, ref, watch} from 'vue';
  import IconComponent from "@/components/Icon/IconComponent.vue";

  enum SortStateEnum {
    UNSORTED = 'sort',
    ASC = 'sort-up',
    DESC = 'sort-down',
  }

  const props = defineProps({
    items: Array,
    title: String,
    selectedItem: [String, Number],
    isSortable: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['itemSelect']);
  const sortIconName = ref<SortStateEnum>(SortStateEnum.UNSORTED);
  const list = computed<string[]>(() => props.items as string[]);

  const handleItemClick = (item: string | number) => {
    emit('itemSelect', item);
  }

  const handleSortClick = () => {
    if (sortIconName.value === SortStateEnum.DESC) {
      sortIconName.value = SortStateEnum.ASC;
      list.value.sort((a, b) => a.localeCompare(b));
    } else {
      sortIconName.value = SortStateEnum.DESC;
      list.value.sort((a, b) => b.localeCompare(a));
    }
  }
</script>
<template>
  <div class="title p-4 bg-white">
    {{ title }}
    <button
        v-if="isSortable"
        @click="handleSortClick"
        class="sort"
        :class="{'sort--enabled': sortIconName !== SortStateEnum.UNSORTED}">
      <icon-component :name="sortIconName" :size="8" :color="sortIconName === SortStateEnum.UNSORTED ? '#9A9DA4' : '#1952E1'" />
    </button>
  </div>
  <ul class="list-group rounded-0">
    <li v-for="item in list"
        :key="item "
        class="list-group-item list-item px-4 border-start-0 border-end-0"
        :class="{'list-item--active': item === selectedItem}"
        @click="() => handleItemClick(item)">
      {{item}}
    </li>
  </ul>
</template>

<style scoped lang="scss">
  @use "../assets/scss/variables";

  .title {
    position: sticky;
    top: 0;
    z-index: 1;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0.012px;
  }

  .sort {
    display: inline-flex;
    background-color: transparent;
    border: none;
    padding: 4px;
    line-height: 1;
  }

  .list-item {
    cursor: pointer;
    font-size: 12px;
    line-height: 16px;
    padding: 20px 24px;

    &:hover {
      background-color: variables.$gray-light-2;
    }

    &.list-item--active {
      color: variables.$blue;
    }
  }
</style>