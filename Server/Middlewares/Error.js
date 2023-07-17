const notfound = (req, resp, next) => {
  const error = new Error(`Not Found ${req.originalUrl}`);
  resp.status(400);
  next(error);
};

const errorHandler = (err, req, resp, next) => {
  const status = resp.status === 200 ? 500 : resp.status;
  resp.status(status);
  resp.json({
    message: err.message,
    stack: process.env.NODE_ENV == "production" ? null : err.stack,
  });
};
module.exports = { notfound, errorHandler };
