const express = require("express");
const formidable = require('formidable');
const fs = require('fs');
var app = express();
const port = 3000;

//khai bao sử dụng template ejs
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));


//router
app.get("/", (req, res) => {
    var today = new Date();
    currentDay = today.getDay();
    var day = "";
    switch (currentDay) {
      case 0:
        day = "Chủ nhật";
        break;
      case 1:
        day = "Thứ hai";
        break;
      case 2:
        day = "Thứ ba";
        break;
      case 3:
        day = "Thứ tư";
        break;
      case 4:
        day = "Thứ năm";
        break;
      case 5:
        day = "Thứ sáu";
        break;
      case 6:
        day = "Thứ bảy";
        break;
      default:
        console.log(`Error: ${currentDay}`);
    }
    res.render("home", { kindOfDay: day });
  });

  //data
var listProduct = [
    {
      id: 0101,
      title: "Apple Book",
      price: 3000,
      description:
        "A very interesting book about so many even more interesting things!",
      imageURL: "book.jpg",
    },
    {
      id: 0102,
      title: "Microsoft Book",
      price: 2000,
      description:
        "A very interesting book about so many even more interesting things!",
      imageURL: "book.jpg",
    },
    {
      id: 0103,
      title: "VFast Book",
      price: 3000,
      description:
        "A very interesting book about so many even more interesting things!",
      imageURL: "book.jpg",
    },
  ];

  // route de huong den trang san pham
app.get("/shop", (req, res) => {
    res.render("shop", { products: listProduct });
  });

app.get("/addnew",(req, res)=>{ 
    res.render("add-product");
});

app.post('/addnew',(req, res) => {
    //lấy dữ liệu từ form sau khi upload anh
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        let pathFile = files.hinhsp.filepath;
        let tenFile = files.hinhsp.originalFilename;
        let tensp = fields.tensp;
        let giasp = fields.giasp;
        let motasp = fields.motasp;
        let destPath = __dirname + '\\public\\images\\' +tenFile;
        fs.copyFile(pathFile, destPath, (err) => {
            if(err) throw err;
            fs.unlink(pathFile, () => {console.log('Da xoa file tam');});
            console.log('Da upload xong fie ' + tenFile);
    });
  
    //Thêm vào mảng json 1 cuối sách mới
     listProduct.push({
     id:0110,
     title:tensp,
     price:giasp,
     description:motasp,
     imageURL:tenFile,
     });
    //chuyển về trang sản phẩm
     res.redirect('/shop'); 
    });
});

app.listen(port, () => {
console.log(`ứng dụng đang chạy với port: ${port}`);
});
