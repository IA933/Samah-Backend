module.exports = class ReqError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}