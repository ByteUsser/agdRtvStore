const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const { isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Konfiguracja multer do przechowywania zdjęć
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Folder do przechowywania zdjęć
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Pobieranie wszystkich produktów
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Błąd podczas pobierania produktów', error });
  }
});

router.get('/category/:categoryName', async (req, res) => {
  const { categoryName } = req.params;

  try {
    const products = await Product.find({ category: categoryName }); // Pobiera produkty na podstawie kategorii
    res.json(products);
  } catch (error) {
    console.error('Błąd podczas pobierania produktów według kategorii:', error);
    res.status(500).json({ message: 'Błąd podczas pobierania produktów' });
  }
});


// Dodawanie nowego produktu
router.post('/add', isAdmin, upload.single('image'), async (req, res) => {
  const { name, price, brand, category } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const newProduct = new Product({ name, price, brand, category, image });
    const savedProduct = await newProduct.save();
    res.status(201).json({ message: 'Produkt dodany pomyślnie', product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Błąd podczas dodawania produktu', error });
  }
});


router.delete('/:id', isAdmin, async (req, res) => {
  const { id } = req.params; // Pobierz ID produktu z parametrów

  try {
    const deletedProduct = await Product.findByIdAndDelete(id); // Usuń produkt z bazy danych
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produkt nie został znaleziony' });
    }
    res.status(200).json({ message: 'Produkt został usunięty', product: deletedProduct });
  } catch (error) {
    console.error('Błąd podczas usuwania produktu:', error);
    res.status(500).json({ message: 'Błąd serwera', error });
  }
});

module.exports = router;