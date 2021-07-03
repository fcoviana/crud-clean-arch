const ExportRegistrationJsonExporter = require('../../app/contracts/export-registration-json-exporter');

module.exports = class JsJsonAdapter extends ExportRegistrationJsonExporter {
  generate(registration) {
    return JSON.stringify(registration);
  }
};
