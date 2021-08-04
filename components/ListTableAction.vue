<template>
  <div class="tw-flex tw-flex-row">
    <div class="tw-mx-1">
      <button class="btn btn-secondary" @click="() => { props.filters.order = (props.filters.order == 'asc' ? 'desc' : 'asc'); props.refresh(); }">
        <span :class="{ 'tw-text-gray-400': (props.filters.order == 'desc') }">▼</span>
        <span :class="{ 'tw-text-gray-400': (props.filters.order != 'desc') }">▲</span>
      </button>
    </div>
    <div class="tw-mx-1 tw-flex-1">
      <select v-model="props.filters.perPage" class="form-control" @change="props.changePerPage(props.filters.perPage)">
        <option v-for="(item, i) in props.entries" :key="i" :value="item">
          Tampilkan {{ item }} item
        </option>
      </select>
    </div>
  </div>
</template>
