const getters = {
  items: state => state.items,
};

const mutations = {
  ADD(state, { item }) {
    state.items.push(item);
  },
};

const state = {
  items: [],
};

export default {
  namespaced: true,
  getters,
  mutations,
  state,
}
