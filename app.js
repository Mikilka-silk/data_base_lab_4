const express = require("express");
// Змінено шлях на правильну назву файлу
const teamRoutes = require("./src/routes/team.routes");

const app = express();

app.use(express.json());

app.use("/api/teams", teamRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/teams`);
});
