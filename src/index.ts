import express from "express";
import todoRoutes from "./routes/todoRoutes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const app = express();
dotenv.config();

const PORT: string | undefined = process.env.PORT || "8080";
const CONNECTIONSTRING: string | undefined = process.env.MONGO_URL;

const server: string = `http://localhost:${PORT}`;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
    },
    servers: [
      {
        url: server,
      },
    ],
  },
  apis: ["./src/routes/todoRoutes.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const runApplication = (port: string | number) => {
  app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  
  app.use(express.json());

  app.use("/todos", todoRoutes);

  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
};

mongoose
  .connect(CONNECTIONSTRING)
  .then(() => {
    console.log("Database is connected successfully.");
    runApplication(PORT);
  })
  .catch((err: any) => console.log(err));
