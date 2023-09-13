const logger = (req: Request) => {
  const { method, url } = req;

  console.log(`${method}: ${url} test`);
};

export default logger;
