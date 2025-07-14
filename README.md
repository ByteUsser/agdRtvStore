# agdRtvStore

## 🏦 Fullstackowa aplikacja sklepu internetowego AGD/RTV

**Demo:**

* 🔗 Frontend (React): [agd-rtv-store.vercel.app](https://agd-rtv-store.vercel.app)
* 🔗 Backend (Express + MongoDB): [agd-backend-rjnn.onrender.com](https://agd-backend-rjnn.onrender.com)

---

## ⚙️ Technologie

### Frontend

* React (CRA)
* React Router
* FontAwesome
* JWT (dekodowanie tokenów)
* Obsługa logowania/rejestracji i koszyka
* Komunikacja z backendem przez REST API

### Backend

* Node.js + Express
* MongoDB + Mongoose
* Auth z JWT
* Obsługa produktów, użytkowników, koszyka
* CORS + Multer (obsługa plików)
* Zmienne środowiskowe (.env)

### Deployment

* **Vercel** (frontend)
* **Render** (backend + baza danych MongoDB Atlas)
* MongoDB Atlas (baza danych w chmurze)

---

## 🔪 Jak uruchomić projekt lokalnie

### 1. Klonowanie repozytorium

```bash
git clone https://github.com/ByteUsser/agdRtvStore.git
cd agdRtvStore
```

### 2. Uruchomienie backendu

```bash
cd backend
```

#### Stwórz plik `.env` i wklej:

```env
MONGO_URI=mongodb+srv://<login>:<haslo>@cluster0.XXXX.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=twoj_super_tajny_klucz
```

#### Zainstaluj zależności i uruchom serwer:

```bash
npm install
node server.js
```

### 3. Uruchomienie frontendu

```bash
cd ../frontend
```

#### Stwórz plik `.env` i wklej:

```env
REACT_APP_API_URL=http://localhost:5001
```

#### Zainstaluj zależności i uruchom aplikację:

```bash
npm install
npm start
```

---

## 📌 Funkcjonalności

* Rejestracja i logowanie użytkownika
* Zabezpieczenia JWT
* Lista produktów z podziałem na kategorie
* Dodawanie produktów do koszyka
* Wyświetlanie danych użytkownika
* Połączenie frontendu z backendem
