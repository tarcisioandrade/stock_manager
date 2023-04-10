import express from "express";
import path from "path";
import cors from "cors";

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const erro = new Error("Not Found");
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    error: error.message,
  });
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
