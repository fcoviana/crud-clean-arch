module.exports = class BaseRepository {
  /*
   * @param {Entity} entity
   * @returns {Entity} entity
   */
  create(data) {
    throw new Error('Method not implement');
  }

  /*
   * @param {Object} object
   * @returns {Entity} entity
   */
  fetchOne(where) {
    throw new Error('Method not implement');
  }

  /*
   * @returns {Array} entities
   */
  fetchAll() {
    throw new Error('Method not implement');
  }

  /*
   * @param {Entity} entity
   * @returns {Entity} entity
   */
  update(entity) {
    throw new Error('Method not implement');
  }

  /*
   * @param {Entity} entity
   * @returns void
   */
  destroy(entity) {
    throw new Error('Method not implement');
  }

  /*
   * @param {Sting} id
   * @returns void
   */
  delete(id) {
    throw new Error('Method not implement');
  }
};
