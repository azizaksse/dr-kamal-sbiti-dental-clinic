# Quick Environment Setup Guide

## Required Environment Variables

Copy this template to your `.env.local` file and fill in your actual values:

```env
# ==============================================
# GOOGLE CALENDAR API CONFIGURATION
# ==============================================
GOOGLE_CALENDAR_ID=your-calendar-id@gmail.com
GOOGLE_CLIENT_EMAIL=service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----"
GOOGLE_PROJECT_ID=your-google-project-id

# ==============================================
# EMAIL CONFIGURATION (SMTP)
# ==============================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password

# ==============================================
# CLINIC INFORMATION
# ==============================================
CLINIC_EMAIL=clinic@example.com
CLINIC_NAME=Your Dental Clinic Name
CLINIC_PHONE=+1234567890
CLINIC_ADDRESS="123 Main St, City, State 12345"

# ==============================================
# APPLICATION CONFIGURATION
# ==============================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## How to Get These Values:

1. **Google Calendar API** - Follow full setup guide in `GOOGLE_CALENDAR_SETUP.md`
2. **Gmail SMTP** - Use Gmail App Password (not your regular password)
3. **Clinic Info** - Your clinic's contact information
4. **App URL** - Your website URL (localhost for development)

## Quick Test:

1. Add these variables to `.env.local`
2. Run `npm run dev`
3. Visit `http://localhost:3000/api/appointments/test-config`
4. Check if all services show as "configured: true"

## Important Notes:

- Never commit `.env.local` to version control
- Use Gmail App Password for SMTP_PASS
- Keep your Google private key secure
- The private key should include `\n` for line breaks when copied from JSON