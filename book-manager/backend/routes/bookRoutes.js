const express = require("express");
const Book = require("../models/Book");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, author, tags, status } = req.body;

    const book = await Book.create({
      title,
      author,
      tags,
      status,
      userId: req.user.id,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const books = await Book.find({
      userId: req.user.id,
    });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;