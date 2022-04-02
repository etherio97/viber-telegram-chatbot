export default function errorHandler(err, req, res, next) {
  let status = 500,
    message = 'Unexcepted error';
  if (typeof err === 'object') {
    if (err instanceof Error) {
      console.error(err);
    }
    status = err.status || 500;
    message = err.message || 'Internel server error';
  }
  res.status(status).json({
    status,
    error: true,
    message,
    requestedAt: new Date(),
  });
}
