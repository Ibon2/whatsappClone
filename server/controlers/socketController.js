module.exports.authorizeUser = (socket, next) => {
    if(!socket.request.session || !socket.request.session.user){
        next(new Error("No authorized"));
    }else{
        next();
    }
};
