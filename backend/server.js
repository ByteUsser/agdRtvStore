const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); // Dodano trasę produktów
const cartRoutes = require('./routes/cartRoutes'); // Import trasy koszyka


dotenv.config();

console.log("Aktualny JWT_SECRET:", process.env.JWT_SECRET);


const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://agd-rtv-store.vercel.app'],
  credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Połączono z MongoDB"))
  .catch((error) => console.error("Błąd połączenia z MongoDB:", error));

app.get('/', (req, res) => {
  res.send('Serwer działa poprawnie!');
});

app.use('/api/auth', authRoutes); 
app.use('/api/products', productRoutes); // Zarejestrowano trasę produktów
app.use('/api/cart', cartRoutes);

app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    // Dla każdego middleware z trasą wyświetl metodę i ścieżkę
    console.log(`[${Object.keys(middleware.route.methods).join(', ')}] ${middleware.route.path}`);
  } else if (middleware.name === 'router') {
    // Jeśli middleware to router (np. cartRoutes), przejdź przez jego trasy
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        console.log(
          `[${Object.keys(handler.route.methods).join(', ')}] /api${handler.route.path}`
        );
      }
    });
  }
});


app.use('/uploads', express.static('uploads')); // Udostępnianie folderu uploads

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
