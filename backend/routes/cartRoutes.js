const express = require('express');
const Cart = require('../models/Cart');
const { authenticate } = require('../middleware/authMiddleware'); // Middleware do autoryzacji JWT

const router = express.Router();

// Dodawanie produktu do koszyka
router.post('/add', authenticate, async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.userId; // Pobierz ID użytkownika z tokena (middleware authenticate)

    try {
        // Znajdź koszyk użytkownika
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Jeśli koszyk użytkownika nie istnieje, utwórz nowy
            cart = new Cart({ userId, items: [] });
        }

        // Sprawdź, czy produkt już jest w koszyku
        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (productIndex !== -1) {
            // Jeśli produkt już istnieje, zwiększ ilość
            cart.items[productIndex].quantity += 1;
        } else {
            // Jeśli produkt nie istnieje, dodaj go do koszyka
            cart.items.push({ productId, quantity: 1 });
        }

        // Zapisz koszyk
        await cart.save();

        res.status(200).json({ message: 'Produkt dodany do koszyka', cart });
    } catch (error) {
        console.error('Błąd podczas dodawania do koszyka:', error);
        res.status(500).json({ message: 'Błąd serwera', error });
    }
});

router.get('/', authenticate, async (req, res) => {
  const userId = req.user.userId; // Pobierz ID użytkownika z tokena

  try {
    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.productId', // Populowanie szczegółowych danych produktów
      model: 'Product',
      select: 'name price brand image', // Pobieraj dodatkowo markę (brand)
    });

    if (!cart) {
      return res.status(200).json({ message: 'Koszyk jest pusty', items: [] });
    }

    res.status(200).json({ items: cart.items });
  } catch (error) {
    console.error('Błąd podczas pobierania koszyka:', error);
    res.status(500).json({ message: 'Błąd serwera', error });
  }
});

// Usuwanie produktu z koszyka
router.delete('/:productId', authenticate, async (req, res) => {
  const { productId } = req.params; // Pobierz ID produktu z parametrów URL
  const userId = req.user.userId; // Pobierz ID użytkownika z tokena

  try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
          return res.status(404).json({ message: 'Koszyk nie został znaleziony' });
      }

      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
      await cart.save();

      res.status(200).json({ message: 'Produkt usunięty z koszyka', cart });
  } catch (error) {
      console.error('Błąd podczas usuwania produktu z koszyka:', error);
      res.status(500).json({ message: 'Błąd serwera', error });
  }
});

router.patch('/update', authenticate, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId;

  try {
    if (quantity <= 0) {
      return res.status(400).json({ message: 'Ilość musi być większa niż 0' });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Koszyk nie został znaleziony' });
    }

    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex !== -1) {
      cart.items[productIndex].quantity = quantity;
    } else {
      return res.status(404).json({ message: 'Produkt nie został znaleziony w koszyku' });
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
      model: 'Product',
      select: 'name price brand image',
    });

    res.status(200).json({ cart: updatedCart });
  } catch (error) {
    console.error('Błąd podczas aktualizacji koszyka:', error);
    res.status(500).json({ message: 'Błąd serwera' });
  }
});


module.exports = router;
