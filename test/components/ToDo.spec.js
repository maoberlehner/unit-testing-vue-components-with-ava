import Vuex from 'vuex';
import Router from 'vue-router';
import sinon from 'sinon';
import { createLocalVue, shallow, mount } from 'vue-test-utils';
import test from 'ava';

import ToDo from '../../src/components/ToDo';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Router);

// Mock the `ADD` mutation to make it
// possible to check if it was called.
const mutations = {
  ADD: sinon.spy(),
};

// This function creates a new Vuex store
// instance for every new test case.
function createStore(items = []) {
  const modules = {
    todo: {
      namespaced: true,
      getters: {
        items: () => items,
      },
      mutations,
    },
  };

  return new Vuex.Store({
    modules,
  });
}

// Initialize a new router with
// the route data needed for the test.
const router = new Router({
  routes: [
    {
      path: '/stats',
    },
  ],
});

test('It should render an `<div>`.', (t) => {
  const wrapper = shallow(ToDo, { localVue, store: createStore() });

  t.true(wrapper.is('div'));
});

test('It should show a list of to-do items if there are any.', (t) => {
  const wrapper = shallow(ToDo, {
    localVue,
    store: createStore([
      'Hello World',
      'This is a test',
    ]),
  });

  t.true(wrapper.contains('.qa-to-do-item'));
});

test('It shouldn\'t render a list if there are no items.', (t) => {
  const wrapper = shallow(ToDo, { localVue, store: createStore() });

  t.false(wrapper.contains('.qa-to-do-list'));
});

test('It can add new to-do items.', (t) => {
  const wrapper = shallow(ToDo, { localVue, store: createStore() });
  const input = wrapper.find('.qa-to-do-input');
  const button = wrapper.find('.qa-to-do-add');

  // Set the value of the input element.
  input.element.value = 'New to-do item';
  // Trigger an input event so Vue.js picks
  // up on the new value of the field.
  input.trigger('input');
  // Trigger a click event on the button.
  button.trigger('click');

  t.true(mutations.ADD.calledWith({}, { item: 'New to-do item' }));
});

test('It should emit an event when clicking the stats link.', (t) => {
  const wrapper = mount(ToDo, { localVue, store: createStore(), router });

  wrapper.find('.qa-to-do-stats-link').trigger('click');

  t.truthy(wrapper.emitted().clickStatsLink);
});
