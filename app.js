const express = require("express");
const teamRoutes = require("./src/routes/team.routes");
const dynamicRoutes = require("./src/routes/dynamic.routes");

const app = express();

app.use(express.json());

app.use("/api/teams", teamRoutes);
app.use("/api/db", dynamicRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/teams`);
});
