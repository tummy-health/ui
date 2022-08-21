const wait = (): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, 0);
  });

export default wait;
