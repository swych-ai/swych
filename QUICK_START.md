# Quick Start - Database Connection

## 🚀 Quick Setup (5 minutes)

### 1. Install Turso CLI

**Windows (PowerShell as Administrator):**
```powershell
powershell -c "irm get.turso.tech/install.ps1 | iex"
```

**macOS/Linux:**
```bash
curl -sSf https://get.turso.tech/install.sh | bash
```

### 2. Login to Turso

```bash
turso auth login
```

This opens your browser to create/login to your Turso account (it's free!).

### 3. Create Database

```bash
turso db create swych-db
```

### 4. Get Your Credentials

**Get connection URL:**
```bash
turso db show swych-db --url
```

**Create and get auth token:**
```bash
turso db tokens create swych-db
```

Copy both values!

### 5. Create `.env.local` File

In your project root (`d:\swych\swych\.env.local`), create a file with:

```env
TURSO_CONNECTION_URL=libsql://your-database-url-here.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here

# Resend Email API (for contact form)
RESEND_API_KEY=your-resend-api-key-here

# Gemini API (for chatbot - optional)
GEMINI_API_KEY=your-gemini-api-key-here
```

**Replace:**
- `your-database-url-here.turso.io` with the URL from step 4
- `your-auth-token-here` with the token from step 4

### 6. Push Database Schema

```bash
npm run db:push
```

This creates the tables in your database.

### 7. Start Your Dev Server

```bash
npm run dev
```

The testimonials will automatically seed when you first visit the testimonials section!

---

## ✅ Verify Connection

Check if you're connected:

```bash
turso auth whoami
```

List your databases:

```bash
turso db list
```

---

## 🔧 Troubleshooting

**"Cannot find module" errors:**
- Make sure you're in the `swych` directory: `cd swych`
- Run `npm install` if you haven't

**Database connection errors:**
- Double-check your `.env.local` file exists and has correct values
- Make sure there are no extra spaces in the `.env.local` file
- Restart your dev server after creating `.env.local`

**"Table not found" errors:**
- Run `npm run db:push` to create the tables

---

## 📚 More Commands

```bash
# View database in browser
npm run db:studio

# Generate migration files
npm run db:generate

# Manually seed testimonials (optional - auto-seeds on first API call)
npm run seed:testimonials
```

---

## 🎯 That's It!

Once you complete these steps, your database will be connected and testimonials will appear on your website automatically!

