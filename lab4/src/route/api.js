import express from "express";
import APIController from "../controller/APIController";

let router = express.Router();
const initAPIRoute = (app) => {
  router.get("/users", APIController.getAllUsers); // Method GET => Red data
  router.post("/create-user", APIController.createNewUser); // Method POST => Create data
  router.put("/update-user", APIController.updateUser); // Method PUT edit user
  router.delete("/delete-user/:id", APIController.deleteUser); // Method DELETE => Delete User

  return app.use("/api/v1/", router);
};
export default initAPIRoute;
