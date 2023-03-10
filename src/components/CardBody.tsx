import React, { useContext } from 'react';

import GlobalStore from '../state/store';

const CardBody = () => {
  // 获取外层容器中的状态
  const store = useContext(GlobalStore.Context);

  return (
    <div>
      <button onClick={store.increment}>Add</button>
      <button onClick={store.decrement}>Minus</button>
      <span>Count {store.count}</span>
    </div>
  );
};

export default CardBody;
