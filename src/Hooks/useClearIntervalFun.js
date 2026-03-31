export const useClearIntervalFun = () => {

  const clearIntervalFun = () => {
    const interval_id = window.setInterval(function () {},
    Number.MAX_SAFE_INTEGER);

    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }
  };

  return [clearIntervalFun];
};
