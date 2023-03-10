import { useState } from 'react';

import { createContainer } from './createContainer';

// 描述 Context 的类型
interface IStore {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  increment: () => void;
  decrement: () => void;
}

const createStore = (initValue?: any) => {
  // 定义状态
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return {
    count,
    setCount,
    increment,
    decrement,
  };
};

const GlobalStore = createContainer<IStore>(createStore);

export default GlobalStore;
