const router = require("express").Router();
const fg = require("fast-glob");

module.exports = (app) => {
  app.use("/api", router);

  fg.sync("**/src/infra/web-server/routes/**routes.js").forEach((file) =>
    require(`../../../../${file}`)(router)
  );
};
