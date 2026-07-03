const app = require("./src/app");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.POST || 3000;

app.listen(PORT, () => {
  console.log("Server dang chay tai port ${PORT}");
});
