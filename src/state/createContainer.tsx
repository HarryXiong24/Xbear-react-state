import React, { createContext, ReactNode } from 'react';

/**
 * @param {function} useHook 将自定义 Hook 通过参数传入
 * @return {*}
 * @description: 定义泛型描述 Context 形状
 */
export function createContainer<State, InitParams = void>(
  useHook: (initialParams?: InitParams) => State,
) {
  const Context = createContext<State>(undefined as unknown as State);

  const Provider = (props: { initialParams?: InitParams; children: ReactNode }) => {
    const { initialParams, children } = props;
    // 使用传入的 Hook
    const store = useHook(initialParams);
    return <Context.Provider value={store}>{children}</Context.Provider>;
  };

  return { Provider, Context };
}
