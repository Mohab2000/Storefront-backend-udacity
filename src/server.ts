import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import productRoutes from "./handlers/product";
import userRoutes from "./handlers/user";
import orderRoutes from "./handlers/order";
import orderedProductRoutes from "./handlers/orderedproduct";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Home Page.");
});
productRoutes(app);
userRoutes(app);
orderRoutes(app);
orderedProductRoutes(app);
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
