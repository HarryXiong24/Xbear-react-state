import { autorun } from './autorun';

export const observer = (target: React.ComponentClass) => {
  const _componentWillMount = target.prototype.componentWillMount;

  // 我们在 componentWillMount 中实现收集和重绘
  target.prototype.componentWillMount = function () {
    _componentWillMount && _componentWillMount.call(this);
    autorun(() => {
      // 只要依赖的数据更新了就重新执行
      this.render(); //收集依赖
      this.forceUpdate(); // 强制刷新
    });
  };

  return target;
};
