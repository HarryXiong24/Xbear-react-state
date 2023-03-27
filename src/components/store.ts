import { autorun, observable } from '../proxy';

class Store {
  value: Record<string, any>;

  constructor() {
    this.value = observable({ count: 0 });
  }

  increment() {
    this.value.count = this.value.count + 1;
  }

  decrement() {
    this.value.count = this.value.count - 1;
  }
}

const store = new Store();

export default store;
