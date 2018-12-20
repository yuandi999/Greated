const express =require('express');
const app=express();
const path=require("path");
const bodyParser=require("body-parser");
const user=require("./code/router/user.js");
const admin=require("./code/router/admin.js");
const member=require("./code/router/member.js");
const delmember=require("./code/router/delmember.js");
const houselist=require("./code/router/houselist.js");
const discusses=require("./code/router/discusses.js");
const opinion=require("./code/router/opinion.js");
const orderhouse=require("./code/router/orderhouse.js");
const cors = require('cors');
const db=require("./dbconnect.js");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/user',user);
app.use('/admin',admin);
app.use('/member',member);
app.use('/delmember',delmember);
app.use('/houselist',houselist);
app.use('/discusses',discusses);
app.use('/opinion',opinion);
app.use('/orderhouse',orderhouse);

app.use(express.static(path.join(__dirname,"./admin")));//开启静态文件，通过静态文件存放前端页面
app.use(express.static(path.join(__dirname,"./code")));
app.use(express.static(path.join(__dirname,"./img")));
app.use(express.static(path.join(__dirname,"./images")));
app.listen(8000,()=>{
  	console.log("服务器连接成功");
});