var express = require('express'),
    fs = require('fs'),
    qs = require('querystring');

var li = express();

li.get('/',function(req,res){
  var realPath = fs.realpathSync('./html/index.html');
  res.sendFile(realPath);
});

li.get('/index.html',function(req,res){
  var realPath = fs.realpathSync('./html'+req.path);
  res.sendFile(realPath);
});

li.get('/login.html',function(req,res){
  var realPath = fs.realpathSync('./html'+req.path);
  res.sendFile(realPath);
})

li.get('/register.html',function(req,res){
  var realPath = fs.realpathSync('./html'+req.path);
  res.sendFile(realPath);
})

li.get('/login',function(req,res){
  var userStr = req.query.user;
  var passStr = req.query.pass;
  var rs = fs.createReadStream('./user.json');
  rs.on('data',function(chunk){
    var user = JSON.parse(chunk.toString());
    var data = user.data;
    if (!data.length) {
      return res.send('{"code":0,"des":"账号不存在"}');
    }
    for (var prop of data) {
      console.log(prop.user == userStr);
        if (prop.user == userStr) {
          if (prop.pass == passStr) {
            return res.send('{"code":1,"des":"登录成功"}');
          }else {
            return res.send('{"code":0,"des":"密码不存在"}');
          }
        }else {
          return res.send('{"code":0,"des":"账号不存在"}');
        }
      }
  })
})

li.post('/register',function(req,res){
  var data = '';
  req.on('data',function(chunk){
    data += chunk;
  });
  req.on('end',function(){
    var obj = qs.parse(data.toString());
    var userStr = obj.user;
    var passStr = obj.pass;
    var rs = fs.createReadStream('./user.json');
    rs.on('data',function(chunk){
      var user = JSON.parse(chunk.toString());
      var data = user.data;
      for (var prop of data) {
          console.log(prop.user);
          if (prop.user == userStr) {
            return res.send('{"code":0,"des":"用户已经存在"}');
          }
        }
        data.push({'user':userStr,'pass':passStr});
        user = JSON.stringify(user);
        fs.writeFile('./user.json',user,{
          flwg:'w'
        })
        return res.send('{"code":1,"des":"注册成功"}');
      })
  })
})
li.get('*',function(req,res){
  var bol = fs.existsSync('.'+req.path);
  if (bol) {
    var realPath = fs.realpathSync('.'+req.path);
    res.sendFile(realPath);
  }else {
    var realPath = fs.realpathSync('./html/404.html');
    res.status(404);
    res.sendFile(realPath);
  }

})

li.listen(8888,function () {
  console.log('服务器开启');
})
