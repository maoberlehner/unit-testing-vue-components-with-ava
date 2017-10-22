<template>
  <div class="to-do">
    <ul class="to-do__list qa-to-do-list" v-if="items.length">
      <li class="to-do__item qa-to-do-item" v-for="item in items" :key="item">
        {{ item }}
      </li>
    </ul>
    <input class="to-do__input qa-to-do-input" v-model="newItem">
    <button class="to-do__add qa-to-do-add" @click="add({ item: newItem})">Add</button>
    <router-link
      class="to-do__stats-link qa-to-do-stats-link"
      to="/stats"
      @click.native="$emit('clickStatsLink')">
      Go to the stats
    </router-link>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapMutations } = createNamespacedHelpers('todo');

export default {
  name: 'ToDo',
  data() {
    return {
      newItem: '',
    };
  },
  computed: {
    ...mapGetters(['items']),
  },
  methods: {
    ...mapMutations({
      add: 'ADD',
    }),
  },
};
</script>
