# 🛒 agdRtvStore

## 🏦 Fullstackowa aplikacja sklepu internetowego AGD/RTV

Prosty sklep internetowy stworzony jako projekt portfolio (MVP), z podstawową obsługą użytkownika – rejestracją, logowaniem i dynamicznym interfejsem frontowym opartym o React. Projekt pozwala zademonstrować umiejętność tworzenia aplikacji fullstack z autoryzacją, routingiem i połączeniem z bazą danych.

---

## 🔗 Demo

* 🖥️ **Frontend (React):** [agd-rtv-store.vercel.app](https://agd-rtv-store.vercel.app)  
* ⚙️ **Backend (Express + MongoDB):** [agd-backend-rjnn.onrender.com](https://agd-backend-rjnn.onrender.com)

> ℹ️ Uwaga: Backend hostowany na Render — może uruchamiać się kilka sekund po bezczynności (tzw. cold start).

---

## 👤 Testowy użytkownik

Aby przetestować działanie bez potrzeby rejestracji:

- **Email:** `ania@op.pl`  
- **Hasło:** `ania`

---

## ⚙️ Technologie

### 🔵 Frontend

- React (CRA)
- React Router
- FontAwesome
- JWT (dekodowanie tokenów)
- Obsługa logowania / rejestracji
- Komunikacja z backendem przez REST API

### 🟢 Backend

- Node.js + Express
- MongoDB + Mongoose
- Auth z JWT (logowanie, rejestracja, token)
- Obsługa użytkowników
- CORS
- Zmienne środowiskowe (`.env`)

### ☁️ Deployment

- **Vercel** – frontend
- **Render** – backend (Node.js)
- **MongoDB Atlas** – baza danych w chmurze

---

## 🛠️ Jak uruchomić projekt lokalnie

### 1. Klonowanie repozytorium

```bash
git clone https://github.com/ByteUsser/agdRtvStore.git
cd agdRtvStore
```
2. Zainstaluj zależności
npm install

3. Stwórz plik .env w folderze backend:
MONGO_URI=mongodb+srv://agduser:agduser123@cluster0.wgqrxvi.mongodb.net/agdRtvStore?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=twoj_super_tajny_klucz

4. Uruchom backend
cd backend
npm run dev

5. Uruchom frontend
cd ../frontend
npm start
