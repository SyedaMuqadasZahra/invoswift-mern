const exampleMiddleware = (req, res, next) => {
  console.log(
    'This is the example middleware.',
    'The developers can use this file to create a new middleware',
    'Logging every request and response respectively',
    req,
    res
  );
  next();
};

module.exports = exampleMiddleware;
