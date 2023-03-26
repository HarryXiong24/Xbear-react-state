// 全局变量
let nowFn: (() => void) | null = null;

// 每个属性对应一个实例，每个实例有自己的 id 区分
let counter = 0;

export default class Reaction {
  id: number;
  // 存储当前可观察对象对应的 nowFn {id: [nowFn, nowFn]}
  store: Record<number, (() => void)[]> = {} as Record<number, (() => void)[]>;

  // start 和 end 仅仅做了变量处理
  static start(handler: () => void) {
    nowFn = handler;
  }
  static end() {
    nowFn = null;
  }

  constructor() {
    this.id = counter++;
    // 存储当前可观察对象对应的 nowFn {id: [nowFn, nowFn]}
    this.store = {};
  }

  collect() {
    // 当前有需要绑定的函数在 autorun 里，如果在 autorun 外使用不做关联
    if (nowFn) {
      this.store[this.id] = this.store[this.id] || [];
      this.store[this.id].push(nowFn);
    }
  }

  run() {
    // 依次执行
    this.store[this.id]?.forEach((handler: () => void) => {
      handler();
    });
  }
}
