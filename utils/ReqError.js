module.exports = class ReqError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    // console.log(this);
  }
}