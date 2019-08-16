import Vue from "vue";
import Vuex from "vuex";
import { set } from "lodash";

// import example from './module-example'
Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,

    state: {
      isBusy: {
        app: false,
        posenet: false
      },

      // Firebase user data
      user: {},

      // The posenet pointer object
      posenetPointer: null
    },

    mutations: {
      /**
       * Quickly sets the state of a given payload[key] with payload[,value]
       * @param {Object} state The stores state
       * @param {Array} payload [key, value]
       */
      set(state, payload) {
        set(state, payload[0], payload[1]);
      }
    }
  });

  return Store;
}
