/**
 * 执行策略模式
 * @param {[boolean, () => void][]} actions
 */
export function exeStrategyActions(actions) {
  actions.some(item => {
    const [flag, action] = item;
    if (flag) {
      action();
    }
    return flag;
  });
}
