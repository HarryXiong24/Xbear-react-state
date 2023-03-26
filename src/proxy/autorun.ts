import Reaction from './reaction';

export const autorun = (handler: () => void) => {
  Reaction.start(handler); // 全局赋值函数
  handler(); // 第一次自动执行，触发 get
  Reaction.end(); // 执行完清空全局变量
};
