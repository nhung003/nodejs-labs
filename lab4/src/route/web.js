import express from "express";
import homeContronler from "../controller/homeController";
// module.exports = router;

let router = express.Router();
const initWebRoute = (app) => {
  router.get("/", homeContronler.getHomepage);
  router.get("/shop/:cateId", homeContronler.getDetailPage);
  router.get("/book/:id", homeContronler.getDetailBook);
  router.get("/pro", homeContronler.getAllUsers);

  router.get("/addnew", homeContronler.createNewUser1);
  router.post("/addnew", homeContronler.createNewUser);

  router.get("/lists", homeContronler.listBooks);

  router.get("/delete/:id", homeContronler.deleteUser);
  router.get("/update/:id", homeContronler.getEditPage);
  router.post("/update-user/:id", homeContronler.postUpdateUser);

  router.get("/about", (req, res) => {
    res.send("I am Hoang Van THo");
  });

  return app.use("/", router);
};
export default initWebRoute;
