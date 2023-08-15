import { createStore } from "state-pool";

export default function createCustomStore() {
  const store = createStore();

  function debounce(func, timeout) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  store.persist({
    PERSIST_ENTIRE_STORE: true,
    saveState: function (key, value, isInitialSet) {
      const doStateSaving = () => {
        try {
          const serializedState = JSON.stringify(value);
          window.localStorage.setItem(key, serializedState);
        } catch (e) {
          console.error(e.toString());
        }
      };

      if (isInitialSet) {
        doStateSaving();
      } else {
        const processStateSaving = debounce(doStateSaving, 1000);
        processStateSaving(); // save State
      }
    },
    loadState: function (key, noState) {
      try {
        const serializedState = window.localStorage.getItem(key);
        if (serializedState === null) {
          return noState;
        }
        return JSON.parse(serializedState);
      } catch (err) {
        return noState;
      }
    },
    removeState: function (key) {
      window.localStorage.removeItem(key);
    },
    clear: function () {
      window.localStorage.clear();
    }
  });
  return store;
}
