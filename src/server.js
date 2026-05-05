import "dotenv/config";
import app from "./app/app.js";

const port = process.env.port || 3000;
const host = process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";

app.listen(port, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
