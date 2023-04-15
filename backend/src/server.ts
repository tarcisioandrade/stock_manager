import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors";
import routes from "@/routes";

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/", routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error("Not Found");
  next(err);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  return res.send({
    error: error.message,
  });
});

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
