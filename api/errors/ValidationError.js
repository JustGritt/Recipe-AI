class ValidationError extends Error {
    constructor(errors) {
      super("Validation error");
      this.name = "ValidationError";
      this.errors = errors;
    }
  }
  
  ValidationError.createFromSequelizeValidationError = function (e) {
    return new ValidationError(
      e.errors.reduce((acc, error) => {
        if (!acc[error.path]) {
          acc[error.path] = [];
        }
        acc[error.path].push(error.message);
        return acc;
      }, {})
    );
  };
  
module.exports = ValidationError;