// src/index.js
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./config/database";

import initializeAssociations from "./config/associate";
import categoryRouter from "./routes/category";
import productRouter from "./routes/product";
import authRoutes from "./routes/authenticate";
import orderRouter from "./routes/order";
import cartRouter from "./routes/cart";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use('/api/v1/', authRoutes);
app.use("/api/v1/", productRouter)
app.use("/api/v1/", categoryRouter)
app.use("/api/v1/", orderRouter)
app.use("/api/v1/", cartRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

initializeAssociations()

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}).catch(err => console.error(err))

