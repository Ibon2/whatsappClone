const express = require("express");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const {
  sessionMiddleware,
  wrap,
  corsConfig,
} = require("./controlers/serverController");
const { authorizeUser } = require("./controlers/socketController");

require("dotenv").config();

const server = require("http").createServer(app);

const io = new Server(server, {
  cors: corsConfig,
});

app.use(helmet());
app.use(cors(corsConfig));

app.use(express.json());
app.use(sessionMiddleware);
app.use("/auth", authRouter);

io.use(wrap(sessionMiddleware));
io.use(authorizeUser)
io.on("connect", (socket) => {
  console.log("USERID:",socket.user.userid)
  console.log(socket.request.session.user.username);
});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});
