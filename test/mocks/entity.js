module.exports = class EntitySpy {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = new Date();
    this.deletedAt = data.deletedAt;
  }
}