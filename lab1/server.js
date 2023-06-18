const express = require("express");
var bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded());

app.listen(port, () => {
    console.log(`ứng dụng đang chạy với port: ${port}`);
});
// router
app.get("/", (req, res) => {
    res.send("đây là trang chủ")
});
app.get('/product', (req, res) => {
    res.send('<p>đây là trang product</p>');
});
app.get('/add-product', (req, res) => {
    res.send(`
    <form action="/product" method="GET">
    <input type="text" name="nameProduct">
    <input type="submit" value="Add Product">
    </form>
    `);
});
// app. get('/product/:id', (req,res)=>{
//     res.send(`đây là trang product id:${req.params.id}`);
// });

const inventors = [
    { id: 1, first: 'albert', last: 'einstein', year: 1879, pass: 1995 },
    { id: 2, first: 'issac', last: 'newton', year: 1643, pass: 1727 },
    { id: 3, first: 'galieo', last: 'galie', year: 1564, pass: 1642 },
    { id: 4, first: 'marie', last: 'curie', year: 1867, pass: 1934 },
    { id: 5, first: 'johannes', last: 'kelper', year: 1571, pass: 1630 },
    { id: 6, first: 'nicolaus', last: 'compernicus', year: 1473, pass: 1543 },
];
// Route và xử lý dữ liệu trả về cho trang danh sách nhà khoa hoc
app.get('/inventors', (req, res) => {
    let list = '<h2>Danh sách nhà khoa học<ul>';
    inventors.forEach(e => {
        list += `<li><a style="text-decoration:none;color:blue;" href="/inventor/${e.id}">${e.first} ${e.last}</a></li>
        `;
    });
    list += '<br><button><a href="/add-inventor" style="text-decoration: none; color: black;">Them</a></button></ul></h2>';
    res.send(list);
});
// Route và xử lý dữ liệu request (req.params) cho trang chi tiết nhà khoa học
app.get('/inventor/:id', (req, res) => {
    let id = req.params.id;
    inventor = inventors.find(e => e.id == id);
    info = `<h2>Thông tin chi tiết nhà khoa học:Full name: ${inventor.first} ${inventor.last}, Year: ${inventor.year},
    Passed: ${inventor.pass}</h2>`;
    res.send(info);
});

// thêm nhà khoa học
app.get('/add-inventor', (req, res) => {
    res.send(`
    <h1>Thêm Nhà Khoa Học</h1>
    <form action="/inventor" method="POST">
    <input type="text" name = "first" placeholder = "input first name"> <br><br>
    <input type="text" name="last" placeholder="input last name"><br><br>
    <input type="number" name="year" placeholder="Year"><br><br>
    <input type="number" name="passed" placeholder="passed"><br><br>
    <button type="submit">Add Product</button></form>`);
   });
   app.post('/inventor', (req, res) => {
    let newInventor=req.body;
    newInventor.id=inventors.length+1;
    inventors.push(newInventor);
    res.redirect('/inventors');
   });