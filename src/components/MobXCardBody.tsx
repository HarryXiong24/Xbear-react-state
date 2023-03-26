import React from 'react';

import { observer } from '../proxy';
import store from './store';

class MobXCardBody extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            store.increment();
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            store.decrement();
          }}
        >
          Minus
        </button>
        <span>Count {store.value.count}</span>
      </div>
    );
  }
}

export default observer(MobXCardBody);
