import pool from "../configs/connectDB";
const formidable = require("formidable");
const fs = require("fs");

let getAllUsers = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM products");
  return res.status(200).json({
    message: "Chao ban nhung",
    data: rows,
  });
};
let getHomepage = async (req, res) => {
  // Viet Logic o day
  try {
    const [data] = await pool.execute(
      "SELECT nameCategory, idCategory FROM catalog"
    );
    const [data2] = await pool.execute(
      "SELECT nameProduct, images, sortDescription, priceProduct FROM products"
    );

    // console.log("Checking selected:",rows);
    return res.render("shop.ejs", { loai: data, list: data2 });
  } catch (err) {
    if (err) throw err;
  }
};

let getDetailPage = async (rep, res) => {
  try {
    let shopid = rep.params.cateId;
    // let shopid = rep.cateId;

    let [shop] = await pool.execute(
      `SELECT * FROM products where idCategory =?`,
      [shopid]
    );
    let [data2] = await pool.execute(`SELECT * FROM catalog`);

    // console.log("Checking selected:",rows);
    return res.render("shop.ejs", { loai: data2, list: shop });
  } catch (error) {
    if (error) throw error;
    // console.log(error);
  }
};

let getDetailBook = async (rep, res) => {
  try {
    let bookid = rep.params.id;
    // let shopid = rep.cateId;

    let [data2] = await pool.execute(`SELECT * FROM catalog`);
    let [book] = await pool.execute(
      `SELECT * FROM products where idProduct =?`,
      [bookid]
    );

    // console.log("Checking selected:",rows);
    return res.render("shopDetail.ejs", { loai: data2, list: book[0] });
  } catch (error) {
    if (error) throw error;
    // console.log(error);
  }
};

let createNewUser1 = async (req, res) => {
  try {
    return res.render("add-product.ejs");
  } catch (error) {
    if (error) throw error;
  }
};
let createNewUser = async (req, res) => {
  try {
    console.log("check request: ", req.body);
    // return res.render('add-product.ejs');
    var form = new formidable.IncomingForm();
    await form.parse(req, function (err, fields, files) {
      let pathFile = files.hinhsp.filepath;
      let tenFile = files.hinhsp.originalFilename;
      let idsp = fields.idsp;
      let tensp = fields.tensp;
      let giasp = fields.giasp;
      let motasp = fields.motasp;
      let idcate = fields.idcate;

      let destPath = __dirname + "\\..\\public\\image\\" + tenFile;
      console.log(destPath);
      fs.copyFile(pathFile, destPath, (err) => {
        if (err) throw err;
        fs.unlink(pathFile, () => {
          console.log("Da xoa file tam");
        });
        console.log("Da upload xong fie " + tenFile);
      });

      // let { firstName, lastName, address, email } = req.body;
      pool.execute(
        "insert into products(idProduct, nameProduct,sortDescription, images, priceProduct, idCategory) values(?,?,?,?,?,?)",
        [idsp, tensp, motasp, tenFile, giasp, idcate]
      );
      return res.redirect("/");
    });
  } catch (error) {
    if (error) throw error;
    // console.log(error);
  }
};

let listBooks = async (req, res) => {
  try {
    const [data] = await pool.execute(
      "SELECT nameCategory, idCategory FROM catalog"
    );
    const [data2] = await pool.execute("SELECT * FROM products");

    // console.log("Checking selected:",rows);
    return res.render("lists.ejs", { loai: data, list: data2 });
  } catch (err) {
    if (err) throw err;
  }
};

let deleteUser = async (req, res) => {
  try {
    // let id = req.body.id;
    let id = req.params.id;

    await pool.execute("DELETE FROM products WHERE idProduct=?", [id]);
    return res.redirect("/lists");
  } catch (error) {
    if (error) throw error;
  }
};

let getEditPage = async (req, res) => {
  try {
    if (!req.params.id || isNaN(req.params.id)) {
      return res.status(200).json({});
    }
    let idpro = req.params.id;
    let [user] = await pool.execute(
      "select * from products where idProduct=?",
      [idpro]
    );
    //console.log("log user,", user);
    return res.render("update.ejs", { dataUser: user[0] });
  } catch (error) {
    if (error) throw error;
  }
};

let postUpdateUser = async (req, res) => {
  try {
    //console.log('check request: ', req.body)
    // return res.render('add-product.ejs');
    let proid = req.params.id;
    var form = new formidable.IncomingForm();
    await form.parse(req, async (err, fields, files) => {
      console.log(fields);
      console.log(files);
      let pathFile = files.hinhsp.filepath;
      let tenFile = files.hinhsp.originalFilename;
      let tensp = fields.tensp;
      let giasp = fields.giasp;
      let motasp = fields.motasp;
      let idcate = fields.idCategory;
      console.log("proid", proid);
      let destPath = __dirname + "\\..\\public\\image\\" + tenFile;
      console.log(destPath);
      fs.copyFile(pathFile, destPath, (err) => {
        if (err) throw err;
        fs.unlink(pathFile, () => {
          console.log("Da xoa file tam");
        });
        console.log("Da upload xong fie " + tenFile);
      });
      await pool.execute(
        "update products set nameProduct=?, sortDescription=?, images=?, priceProduct=?, idCategory=? where idProduct=?",
        [tensp, motasp, tenFile, giasp, idcate, proid]
      );
      return res.redirect("/lists");

      // let {firstName,lastName,address,email,id} = req.body;

      // await pool.execute('update users set firstName=?, lastName=?, email=?, address=? where id=?',
      // [firstName,lastName,email,address,id])

      // return res.redirect('/');
    });
  } catch (error) {
    //if (error) throw error;
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  getHomepage,
  getDetailPage,
  getDetailBook,
  createNewUser,
  createNewUser1,
  deleteUser,
  getEditPage,
  postUpdateUser,
  listBooks,
};
