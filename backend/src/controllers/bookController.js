import mongoose from "mongoose"; 
import ComicBook from "../models/ComicBook.js"
import { validateComicBook } from "../utils/validation.js";

// Create
export const createBook = async (req, res, next) => {
  try {
    const { error } = validateComicBook(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const comicBook = new ComicBook(req.body);
    await comicBook.save();
    res.status(201).json(comicBook);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
//   console.log("ID: ", req.params.id);
//   console.log("Body: ", req.body);

  try {
    const { success, error } = validateComicBook(req.body);
    if (!success) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid comic book ID" });
    }

    const comicBook = await ComicBook.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!comicBook) {
      return res.status(404).json({ message: "Comic book not found" });
    }

    res.json(comicBook);
  } catch (error) {
    next(error);
  }
};

// Delete
export const deleteBook = async (req, res, next) => {
  try {
    const comicBook = await ComicBook.findByIdAndDelete(req.params.id);
    if (!comicBook)
      return res.status(404).json({ message: "Comic book not found" });
    res.json({ message: "Comic book deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get all books with pagination and filtering
export const getBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort, ...filters } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort ? JSON.parse(sort) : { createdAt: -1 },
    };

    const query = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        if (key === "price" || key === "yearOfPublication") {
          query[key] = { $gte: parseFloat(filters[key]) };
        } else {
          query[key] = new RegExp(filters[key], "i");
        }
      }
    });

    const comicBooks = await ComicBook.paginate(query, options);
    res.json(comicBooks);
  } catch (error) {
    next(error);
  }
};

// Get comic book details by ID
export const getBookDetails = async (req, res, next) => {
  try {
    const comicBook = await ComicBook.findById(req.params.id);
    if (!comicBook)
      return res.status(404).json({ message: "Comic book not found" });
    res.json(comicBook);
  } catch (error) {
    next(error);
  }
};
