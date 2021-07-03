const fs = require('fs');
const Storage = require('../../app/contracts/storage');

module.exports = class LocalStorageAdapter extends Storage {
  async store(fileName, content) {
    const filePath = `${process.cwd()}/${fileName}.json`;
    await fs.writeFileSync(filePath, content);

    return filePath;
  }
};
