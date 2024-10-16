import express from "express";
import {
  createBook,
  updateBook,
  deleteBook,
  getBooks,
  getBookDetails,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.get("/", getBooks);
router.get("/:id", getBookDetails);

export default router;
