const redisClient = require("../redis");

module.exports.authorizeUser = (socket, next) => {
  if (!socket.request.session || !socket.request.session.user) {
    next(new Error("No authorized"));
  } else {
    socket.user = { ...socket.request.session.user };
    redisClient.hset(`userid:${socket.user.username}`, 
    "userid", 
    socket.user.userid);
    next();
  }
};
