# GoHighLevel CRM Integration Setup Guide

## 🚀 Complete GoHighLevel Integration for WattLeads Funnel

This guide will help you set up the GoHighLevel CRM integration for your WattLeads smart home funnel.

## 📋 Prerequisites

1. **GoHighLevel Account** - You need an active GoHighLevel account
2. **API Access** - Your GoHighLevel account must have API access enabled
3. **Location ID** - Your GoHighLevel location/business ID
4. **API Key** - Your GoHighLevel API key

## 🔧 Setup Steps

### Step 1: Get Your GoHighLevel Credentials

1. **Log into GoHighLevel**
2. **Go to Settings → API & Webhooks**
3. **Copy your Location ID and API Key**

### Step 2: Configure Environment Variables

1. **Open the `.env` file** in your project root
2. **Replace the placeholder values:**

```env
# GoHighLevel CRM Integration
VITE_GHL_LOCATION_ID=your_actual_location_id_here
VITE_GHL_API_KEY=your_actual_api_key_here
VITE_GHL_BASE_URL=https://rest.gohighlevel.com/v1

# Meta Pixel (Update with your actual pixel ID)
VITE_META_PIXEL_ID=your_actual_pixel_id_here
```

### Step 3: Test the Integration

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Complete the quiz flow** to test lead submission
3. **Check your GoHighLevel dashboard** for new contacts

## 📊 What Gets Sent to GoHighLevel

### Contact Information
- **Name** (First & Last)
- **Email**
- **Phone** (formatted for international)
- **Source**: "WattLeads Smart Home Funnel"

### Custom Fields
- **Services**: Selected smart home services
- **Monthly Projects**: Project volume
- **Average Project Value**: Revenue per project
- **Marketing Spend**: Current marketing budget
- **Lead Score**: Calculated qualification score (0-100)
- **Company Type**: "Smart Home / Electrical"
- **Funnel Stage**: "Quiz Completed" or "Call Booked"
- **UTM Parameters**: Source, medium, campaign tracking

### Tags Applied
- "Smart Home Lead"
- "Quiz Completed"
- "WattLeads"

## 🎯 Lead Scoring System

The system automatically calculates a lead score (0-100) based on:

- **Project Value** (30 points max)
  - $50k+ = 30 points
  - $25k-$50k = 25 points
  - $10k-$25k = 15 points
  - Under $10k = 5 points

- **Marketing Spend** (25 points max)
  - $10k+ = 25 points
  - $5k-$10k = 20 points
  - $2k-$5k = 15 points
  - Under $2k = 5 points

- **Monthly Projects** (20 points max)
  - 30+ projects = 20 points
  - 16-30 projects = 15 points
  - 6-15 projects = 10 points
  - 1-5 projects = 5 points

- **Premium Services** (15 points max)
  - Has premium service = 15 points
  - Basic services only = 10 points

## 🔄 Integration Points

### 1. Quiz Completion (VSLLanding.tsx & Quiz.tsx)
- Triggers when user completes quiz with contact info
- Creates new contact in GoHighLevel
- Creates opportunity with calculated value
- Applies tags and custom fields

### 2. Call Booking (Booking.tsx)
- Updates existing lead when call is booked
- Tracks booking event
- Updates funnel stage to "Call Booked"

### 3. UTM Tracking
- Automatically captures UTM parameters
- Stores in custom fields for campaign tracking

## 🛠️ Troubleshooting

### Common Issues

1. **"API Error: 401"**
   - Check your API key is correct
   - Ensure API access is enabled in GoHighLevel

2. **"API Error: 404"**
   - Verify your Location ID is correct
   - Check the API endpoint URL

3. **Leads not appearing in GoHighLevel**
   - Check browser console for errors
   - Verify environment variables are loaded
   - Ensure you're using the correct Location ID

### Debug Mode

To enable debug logging, add this to your `.env`:
```env
VITE_DEBUG=true
```

## 📈 Analytics Integration

The integration also includes:

- **Meta Pixel Events**: Lead and Purchase tracking
- **Custom Events**: Funnel stage tracking
- **UTM Parameter Capture**: Campaign attribution

## 🔒 Security Notes

- API keys are stored in environment variables
- No sensitive data is logged to console in production
- All API calls use HTTPS
- Phone numbers are automatically formatted for international use

## 📞 Support

If you need help with the integration:

1. Check the browser console for error messages
2. Verify your GoHighLevel credentials
3. Test with the development server first
4. Contact support with specific error messages

## 🚀 Deployment

When deploying to production:

1. **Set environment variables** in your hosting platform
2. **Test the integration** in production
3. **Monitor lead submissions** in GoHighLevel
4. **Set up notifications** for new leads

---

**Need help?** Contact info@wattleads.com for support with the GoHighLevel integration.
