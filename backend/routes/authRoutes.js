const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Importujemy jsonwebtoken
const User = require('../models/User');

const router = express.Router();

// Logowanie użytkownika
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Znajdź użytkownika na podstawie e-maila
    const user = await User.findOne({ email });
    console.log("Pobrany użytkownik z bazy:", user); // Debugowanie użytkownika

    if (!user) {
      return res.status(400).json({ message: 'Nieprawidłowy email lub hasło' });
    }

    // Porównaj podane hasło z zahashowanym w bazie danych
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Nieprawidłowy email lub hasło' });
    }

    // Generowanie tokenu JWT (zawiera userId i role)
    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role }, // Payload tokenu
      process.env.JWT_SECRET, // Klucz JWT
      { expiresIn: '1h' } // Ważność tokenu
    );

    console.log("Generowanie tokenu z rolą:", user.role); // Debugowanie roli
    console.log("Wygenerowany token:", token); // Debugowanie tokenu

    // Zwróć token i dane użytkownika
    res.json({
      message: 'Zalogowano pomyślnie',
      token,
      userId: user._id,
      name: user.name,
    });
  } catch (error) {
    console.error("Błąd podczas logowania:", error);
    res.status(500).json({ message: 'Błąd serwera', error });
  }
});

// Rejestracja użytkownika
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Sprawdzenie, czy użytkownik o podanym emailu już istnieje
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Użytkownik o podanym emailu już istnieje' });
    }

    // Hashowanie hasła
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tworzenie nowego użytkownika
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      role: 'user', // Domyślna rola
    });

    // Zapisanie użytkownika do bazy danych
    await newUser.save();

    res.status(201).json({ message: 'Rejestracja zakończona pomyślnie' });
  } catch (error) {
    console.error("Błąd podczas rejestracji:", error);
    res.status(500).json({ message: 'Błąd serwera', error });
  }
});

module.exports = router;
