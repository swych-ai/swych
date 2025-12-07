# Email Service Setup - Resend

## Quick Setup Guide

### Step 1: Sign up for Resend

1. Go to https://resend.com
2. Sign up for a free account (100 emails/day free)
3. Verify your email address

### Step 2: Get Your API Key

1. Log in to Resend dashboard
2. Go to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "Swych.ai Production")
5. Copy the API key (starts with `re_`)

### Step 3: Add to Environment Variables

Add this to your `.env.local` file:

```env
RESEND_API_KEY=re_your_api_key_here
```

**Important:**
- Replace `re_your_api_key_here` with your actual API key
- Never commit `.env.local` to git
- For Vercel deployment, add this in Vercel project settings → Environment Variables

### Step 4: Verify Domain (Optional but Recommended)

For production, you should verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `swych.ai`)
4. Add the DNS records Resend provides
5. Wait for verification (usually a few minutes)

Once verified, update the `from` field in `src/app/api/send-email/route.ts`:
```typescript
from: "Swych.ai Contact Form <contact@swych.ai>"
```

### Step 5: Test

1. Restart your dev server: `npm run dev`
2. Go to your contact form
3. Submit a test message
4. Check your email inbox (theswych.ai@gmail.com)

---

## Vercel Deployment

For production on Vercel:

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key
   - **Environment:** Production, Preview, Development (select all)
4. Redeploy your application

---

## Troubleshooting

**"Email service not configured" error:**
- Make sure `RESEND_API_KEY` is in your `.env.local` file
- Restart your dev server after adding the key
- Check for typos in the variable name

**Emails not sending:**
- Verify your API key is correct
- Check Resend dashboard for error logs
- Make sure you haven't exceeded the free tier limit (100/day)

**Domain verification issues:**
- Use the default `onboarding@resend.dev` for testing
- For production, verify your domain in Resend dashboard

