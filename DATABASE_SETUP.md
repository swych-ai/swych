# Database Setup Guide - Turso (libSQL)

## Step 1: Install Turso CLI

First, install the Turso CLI tool:

**On Windows (PowerShell):**
```powershell
powershell -c "irm get.turso.tech/install.ps1 | iex"
```

**On macOS/Linux:**
```bash
curl -sSf https://get.turso.tech/install.sh | bash
```

## Step 2: Login to Turso

After installing, login to your Turso account:

```bash
turso auth login
```

This will open a browser window for you to authenticate. If you don't have an account, you can create one at https://turso.tech

## Step 3: Create a Database

Create a new database (or use an existing one):

```bash
turso db create swych-db
```

This will create a database and give you a connection URL.

## Step 4: Get Database Credentials

Get your database connection URL:

```bash
turso db show swych-db
```

Or get the connection URL directly:

```bash
turso db show swych-db --url
```

Get your auth token:

```bash
turso db tokens create swych-db
```

## Step 5: Create Environment Variables File

Create a `.env.local` file in the root of your project (`d:\swych\swych\.env.local`) with:

```env
TURSO_CONNECTION_URL=libsql://your-database-url.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
```

**Important:** 
- Replace `your-database-url.turso.io` with your actual database URL
- Replace `your-auth-token-here` with your actual auth token
- Never commit `.env.local` to git (it should be in `.gitignore`)

## Step 6: Run Database Migrations

After setting up your environment variables, run the migrations to create the tables:

```bash
npm run db:push
```

Or if you have drizzle-kit installed globally:

```bash
npx drizzle-kit push
```

## Step 7: Seed the Database (Optional)

The testimonials will auto-seed when you first access them, but if you want to manually seed:

You can create a seed script in `package.json` or run the seed file directly using tsx/ts-node.

## Alternative: Use Local SQLite (for development)

If you want to use a local SQLite database for development instead of Turso:

1. Update `src/db/index.ts` to use local SQLite
2. Or set environment variables to point to a local file

## Troubleshooting

### Database connection errors:
- Make sure your `.env.local` file exists and has the correct values
- Verify your TURSO_CONNECTION_URL and TURSO_AUTH_TOKEN are correct
- Check that you're logged in: `turso auth whoami`

### Migration errors:
- Make sure your database exists: `turso db list`
- Check your schema file is correct
- Verify your environment variables are loaded

## Useful Turso Commands

```bash
# List all databases
turso db list

# Show database info
turso db show swych-db

# Create a new database
turso db create swych-db

# Delete a database (careful!)
turso db destroy swych-db

# Create auth token
turso db tokens create swych-db

# List all tokens
turso db tokens list swych-db

# Revoke a token
turso db tokens revoke swych-db <token-id>
```

