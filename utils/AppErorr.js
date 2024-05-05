class AppErorr extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.stataus = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperation = true;
  }
}

module.exports = AppErorr;
