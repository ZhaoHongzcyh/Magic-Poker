const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const router = express.Router();

//静态文件路径
app.use(express.static(__dirname));

router.route("/").get(function(req,res){
	res.sendfile("./pages/index.html")
})

router.route("/poker").get(function(req,res){
	res.sendfile("./pages/poker.html")
})

//socket通信
io.on("connection",function(socket){
	
	//监听主页面扑克推送通知
//	socket.on("sendPoker",res=>{
//		io.sockets.emit("getPoker",res);
//	})
	
	//将旋转角度推送给所有socket用户
	socket.on("transform",res=>{
		io.sockets.emit("rotate",res)
	})
})

app.use(router);

server.listen(8003,function(){
	console.log("服务启动成功");
})
