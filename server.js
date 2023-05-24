const express = require("express");
const app = require("./routes/apiRoutes");
const db = require("./models");
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await db.sequelize.sync();
    app.listen(PORT, () => {
      console.log(`listening on: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();