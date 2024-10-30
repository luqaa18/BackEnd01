import { Router } from "express";
import { userValidator } from "../middlewares/user.validator.js";
import UserManager from "../managers/user-manager.js";
const userManager = new UserManager("../user.json");

const router = Router();

//getUsers
router.get("/", async (req, res) => {
  try {
    const users = await userManager.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//getUserById
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userManager.getUsersById(id);
    res.status(200).json({ id: user.id, email: user.email });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//createUser
router.post("/", [userValidator], async (req, res) => { //middleware a nivel de endpoint
  try {
    const user = await userManager.createUser(req.body);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//deleteUser
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userDel = await userManager.deleteUser(id);
    res
      .status(200)
      .json({ message: `User id: ${userDel.id} ha sido eliminado` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//deleteUsers (todos)
router.delete("/", async (req, res) => {
  try {
    await userManager.deleteUsers();
    res.json({ message: "users deleted ok" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//updateUser
router.put("/", async (req, res) => {
  try {
    const { id } = req.params;
    const userUpdated = await userManager.updateUser(req.body, id);
    res.status(200).json(userUpdated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
