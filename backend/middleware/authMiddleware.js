const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware do sprawdzania, czy użytkownik jest zalogowany
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Brak tokenu autoryzacji' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Przekazujemy dane użytkownika do kolejnych middleware
    next();
  } catch (error) {
    res.status(401).json({ message: 'Nieautoryzowany dostęp', error });
  }
};

// Middleware do sprawdzania, czy użytkownik jest administratorem
const isAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Brak tokenu autoryzacji' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role === 'admin') { // Sprawdzamy rolę w dekodowanym tokenie
      req.user = decoded; // Przekazujemy dane użytkownika do kolejnych middleware
      next();
    } else {
      res.status(403).json({ message: 'Brak uprawnień' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Nieautoryzowany dostęp', error });
  }
};

module.exports = { authenticate, isAdmin };
