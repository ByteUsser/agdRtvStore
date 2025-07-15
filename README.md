# 🛒 agdRtvStore

## 🏦 Fullstackowa aplikacja sklepu internetowego AGD/RTV

Kompletny sklep internetowy z funkcjonalnościami takimi jak: rejestracja i logowanie użytkownika, autoryzacja JWT, dodawanie produktów do koszyka oraz komunikacja z backendem przez REST API.

---

## 🔗 Demo

* 🖥️ **Frontend (React):** [agd-rtv-store.vercel.app](https://agd-rtv-store.vercel.app)
* ⚙️ **Backend (Express + MongoDB):** [agd-backend-rjnn.onrender.com](https://agd-backend-rjnn.onrender.com)

> ℹ️ Backend hostowany na Render – może chwilę się uruchamiać po bezczynności (cold start).

---

## 👤 Testowy użytkownik

Aby przetestować logowanie bez potrzeby rejestracji:

- **Email:** `test@test.pl`  
- **Hasło:** `test123`

---

## ⚙️ Technologie

### 🔵 Frontend

- React (CRA)
- React Router
- FontAwesome
- JWT (dekodowanie tokenów)
- Obsługa logowania / rejestracji / koszyka
- Komunikacja z backendem przez REST API

### 🟢 Backend

- Node.js + Express
- MongoDB + Mongoose
- Auth z JWT (logowanie, rejestracja, token)
- Obsługa produktów, użytkowników, koszyka
- CORS + Multer (obsługa plików)
- Zmienne środowiskowe (.env)

### ☁️ Deployment

- **Vercel** – frontend
- **Render** – backend (Node.js) + połączenie z MongoDB Atlas
- **MongoDB Atlas** – baza danych w chmurze

---

## 🛠️ Jak uruchomić projekt lokalnie

### 1. Klonowanie repozytorium

```bash
git clone https://github.com/ByteUsser/agdRtvStore.git
cd agdRtvStore
