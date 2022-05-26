var app = require("express")();
var cors = require("cors");

// Access-Control-Allow-Origin 적용방법1: 직접 헤더에 적용
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Access-Control-Allow-Origin 적용방법2: cors 미들웨어 사용
app.use(cors());

app.listen(80, function () {
  console.log("http server is listening on port 80");
});
