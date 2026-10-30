const express = require('express');
const axios = require('axios');
const books = require("./booksdb.js");
const public_users = express.Router();

const PORT = process.env.PORT || 5000;
const BOOKS_API_URL = `http://127.0.0.1:${PORT}/internal/books`;

public_users.post("/register", (req, res) => {
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Internal endpoint for book data
public_users.get('/internal/books', (req, res) => {
  return res.json(books);
});

// Get all books
public_users.get('/', async (req, res) => {
  try {
    const response = await axios.get(BOOKS_API_URL);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get book by ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  try {
    const response = await axios.get(BOOKS_API_URL);
    const book = response.data[req.params.isbn];

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get books by author
public_users.get('/author/:author', async (req, res) => {
  try {
    const response = await axios.get(BOOKS_API_URL);
    const author = req.params.author.toLowerCase();

    const result = Object.values(response.data).filter(
      book => book.author.toLowerCase() === author
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get books by title
public_users.get('/title/:title', async (req, res) => {
  try {
    const response = await axios.get(BOOKS_API_URL);
    const title = req.params.title.toLowerCase();

    const result = Object.values(response.data).filter(
      book => book.title.toLowerCase().includes(title)
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get book reviews
public_users.get('/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json(book.reviews);
});

module.exports.general = public_users;
