const http = require("http");
const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const morgan = require("morgan");

dotenv.config();

const { AppDataSource } = require("./models/data-source");

const { routes } = require("./routes");

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(morgan("combined"));

app.use(routes);

app.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "Welcome" });
  } catch (err) {
    console.log(err);
  }
});

app.get("/ping", async (req, res) => {
  return res.status(200).json({ message: "pong" });
});

const server = http.createServer(app); // express app 으로 서버를 만듭니다.

const start = async () => {
  // 서버를 시작하는 함수입니다.
  try {
    await AppDataSource.initialize().then(() =>
      console.log("Datasource initialized.")
    );
    server.listen(8000, () => console.log(`Server is listening on 8000`));
  } catch (err) {
    console.error(err);
  }
};

start();
