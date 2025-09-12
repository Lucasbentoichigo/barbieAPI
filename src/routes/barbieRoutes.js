import express from "express";
import { getAllBarbies, getBarbiesById, createBarbie, deleteBarbie} from "./../controllers/barbieController.js";

const router = express.Router();

router.get("/", getAllBarbies);
router.get("/:id", getBarbiesById);
router.post("/", createBarbie );
router.delete("/:id", deleteBarbie)

export default router;