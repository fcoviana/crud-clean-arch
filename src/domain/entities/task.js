const uuid = require('uuid').v4;

module.exports = class Task {
  constructor(data) {
    this.id = data.id ?? uuid();
    this.title = data.title;
    this.description = data.description;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = new Date();
    this.deletedAt = data.deletedAt;
  }
};
