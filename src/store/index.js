import { createStore } from 'redux';
import allReducers from '../reducers';

const saveToLocalStorage = (state) => {

    try {
      const serialisedState = JSON.stringify(state);
      localStorage.setItem("user_info", serialisedState);
    } catch (e) {
      console.warn(e);
    }
}

const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem("user_info");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const store = createStore(allReducers, loadFromLocalStorage());
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;