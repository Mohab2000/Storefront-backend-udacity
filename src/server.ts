import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import productRoutes from "./handlers/product";
import userRoutes from "./handlers/user";
import orderRoutes from "./handlers/order";
import orderedProductRoutes from "./handlers/orderedproduct";

require("appdynamics").profile({
  controllerHostName: "twin202407310012557.saas.appdynamics.com",
  controllerPort: 443,

  // If SSL, be sure to enable the next line
  controllerSslEnabled: true,
  accountName: "twin202407310012557",
  accountAccessKey: "c036v82ogabk",
  applicationName: "Store-Backend",
  tierName: "StoreTest",
  nodeName: "process", // The controller will automatically append the node name with a unique number
});
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
