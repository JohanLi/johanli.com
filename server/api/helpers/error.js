const throwError = (code, message) => {
  const error = Error(message);
  error.code = code;
  throw error;
};

const handleError = (res, { code, message }) => {
  if (code === 'bad-request') {
    res.status(400);
    res.json({ code, message });
  } else if (code === 'not-found') {
    res.status(404);
    res.json({ code, message });
  } else {
    res.status(500);
    res.json({
      code: 'internal-server-error',
      message: 'An internal server error occurred!',
    });
  }
};

export { throwError, handleError };
