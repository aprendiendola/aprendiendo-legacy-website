
const defaultErrorMessage = 'Ocurrió un error inesperado';

// Return all error message from "error" response object
export default err => {
  const errorMessages = [];

  if (err.response.status !== 422) {
    this.errorMessages.push(defaultErrorMessage);
  } else if (err.response.data.errors) {
    const { response: { data: { errors } } } = err;

    Object.entries(errors).forEach(([key, error]) => {
      error.map(message => errorMessages.push(message));
    });
  } else if (err.response.data.message) {
    errorMessages.push(err.response.data.message);
  }

  return errorMessages;
};
