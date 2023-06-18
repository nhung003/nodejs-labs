const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
var app = express();
const port = 3000;

//khai bao sử dụng template ejs
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  password: "",
  database: "lab3_nodejs",
});

//router

app.get("/", (req, res) => {
  let sql = "SELECT nameCategory, idCategory FROM catalog";

  db.query(sql, (err, data) => {
    if (err) throw err;
    let sqlSach =
      "SELECT nameProduct, images, sortDescription, priceProduct FROM products";

    db.query(sqlSach, (err, data2) => {
      res.render("shop", { loai: data, list: data2 });
    });
  });
});

app.get("/shop/:cateId", (req, res) => {
  let sql = "SELECT * FROM catalog";

  db.query(sql, (err, data) => {
    if (err) throw err;
    let cateId = req.params.cateId;
    let sqlSach = `SELECT * FROM products where idCategory=${cateId}`;

    db.query(sqlSach, (err, data2) => {
      res.render("shop", { loai: data, list: data2 });
    });
  });
});

app.get("/book/:id", (req, res) => {
  let sql = "SELECT * FROM catalog";

  db.query(sql, (err, data) => {
    if (err) throw err;
    let id = req.params.id;
    let sqlSach = `SELECT * FROM products where idProduct=${id}`;

    db.query(sqlSach, (err, data2) => {
      res.render("shopDetail", { loai: data, list: data2[0] });
    });
  });
});


// var http = require('http') 
// var { parse } = require('querystring') //đây là cách khai báo khi mình muốn dùng 1 function nào của module thay vì lấy tất cả
// var body = ''
//  http.createServer(function (req, res) { 
//      req.on('data', (data) => {
//              body += data
//       })

//       req.on('end', () => {
//             body = parse(body)
//             console.log(body
//       })
//  }).listen(8000) 

app.get("/addnew",(req, res)=>{ 
  res.render("add-product");
});

app.post('/addnew',(req, res) => {
  //lấy dữ liệu từ form sau khi upload anh
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
      // let pathFile = files.hinhsp.filepath;
      let tenFile = files.hinhsp.originalFilename;
      let tensp = fields.tensp;
      let giasp = fields.giasp;
      let motasp = fields.motasp;

  let b = { nameProduct: tensp, sortDescription: motasp, images: tenFile, priceProduct: giasp};
      // let sql=`insert into products(nameProduct, priceProduct, images, sortDesription) values(${tensp}, ${giasp}, ${tenFile}, ${motasp})`;
      db.query("insert into products SET ?", b, function (err, data) {
        // db.query(sql, (err, data) => {
          if (err) throw err;
          // res.send(data); // data chứa thông tin: số dòng chèn ...
          console.log(data);
          res.redirect('/');
        });
 
      });
    });

app.get('/:id', (req, res) => {
  let id = req.params.id;
  let sql = `DELETE FROM products WHERE idProduct = ${id}`;
  
  db.query(sql, (err, data) => {
    if (err) throw err;
    let sqlSach =
      "SELECT nameProduct, images, sortDescription, priceProduct FROM products";

    db.query(sqlSach, (err, data2) => {
      res.render("shop", { loai: data, list: data2 });
    });
  });
});


app.listen(port, () => {
  console.log(`ứng dụng đang chạy với port: ${port}`);
});
