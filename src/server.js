import "dotenv/config";
import app from "./app/app.js";

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
