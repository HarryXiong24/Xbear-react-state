import Reaction from './reaction';

// 定义 handler，可以进行数据操作，方便拓展
const handler = (): ProxyHandler<Record<string, any>> => {
  // 每个属性都对应一个新的 reaction 实例
  const reaction = new Reaction(); // 每个属性都有自己对应的那个reaction
  return {
    get(target: Record<string, any>, key: string) {
      // 获取对象属性时，进行依赖函数的收集，一个属性可以对多个函数
      reaction.collect();
      return Reflect.get(target, key);
    },
    set(target: Record<string, any>, key: string, value: any) {
      const newVal = Reflect.set(target, key, value);
      // 当属性值改变的时候，我们依次执行该属性依赖的函数。放在 set 改值之后执行，这样 autorun 函数中就能拿到最新的属性值
      reaction.run();
      return newVal;
    },
  };
};

// 递归，对对象里的每一个属性做代理
const deepProxy = (
  target: Record<string, any>,
  handler: ProxyHandler<Record<string, any>>,
) => {
  if (typeof target !== 'object') {
    // 如果是基本类型直接返回
    return target;
  }
  // 这里我们要对属性值为对象的属性进行递归处理
  for (const key in target) {
    target[key] = deepProxy(target[key], handler);
  }
  return new Proxy(target, handler);
};

// 创建可观察对象
const createObservable = (target: Record<string, any>) => {
  // 对属性递归判断，对象都进行代理
  return deepProxy(target, handler());
};

export const observable = (target: any, key?: string, descriptor?: any) => {
  // 如果不是装饰器，只有第一个参数就可以了，我们这里简单用第二个参数判断
  if (typeof key === 'string') {
    // 获取原始值
    let v = descriptor.initializer();
    // 是通过装饰器实现的，先把装饰的对象就行深度代理
    v = createObservable(v);
    const reaction = new Reaction();
    return {
      enumerable: true,
      configurable: true,
      // 处理同 Proxy
      get() {
        reaction.collect();
        return v;
      },
      set(value: any) {
        v = value;
        reaction.run();
        return v;
      },
    };
  } else {
    // 需要将 target 进行代理，创建可观察对象
    return createObservable(target);
  }
};
