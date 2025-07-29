# GoHighLevel Private Integration Setup Guide

## 🆕 **New: Private Integrations in GoHighLevel**

GoHighLevel has introduced Private Integrations, which is their new recommended way to handle webhook integrations. This guide will help you set it up.

## 🚀 **Option 1: Private Integration (Recommended)**

### Step 1: Create Private Integration in GoHighLevel

1. **Log into GoHighLevel**
2. **Go to Settings → Private Integrations**
3. **Click "Create New Integration"**
4. **Fill in the details:**
   - **Name:** `WattLeads Funnel Integration`
   - **Description:** `Lead capture integration for smart home funnel`
   - **Webhook URL:** `https://your-domain.com/api/gohighlevel-webhook`
   - **Events:** Select "Contact Created" and "Opportunity Created"

### Step 2: Set Up Webhook Endpoint

You'll need to create a webhook endpoint that GoHighLevel can call. Here are your options:

#### Option A: Use a Webhook Service (Easiest)
1. **Sign up for a webhook service** like:
   - [Webhook.site](https://webhook.site) (Free)
   - [Pipedream](https://pipedream.com) (Free tier)
   - [Zapier](https://zapier.com) (Paid)

2. **Get your webhook URL** from the service

3. **Configure the webhook** to forward data to GoHighLevel

#### Option B: Create Your Own Webhook Server
If you have a server, create an endpoint that:
1. Receives the webhook data
2. Formats it for GoHighLevel
3. Sends it to GoHighLevel's API

### Step 3: Configure Environment Variables

Update your `.env` file:

```env
# Use Private Integration
VITE_GHL_USE_PRIVATE_INTEGRATION=true
VITE_GHL_PRIVATE_INTEGRATION_URL=https://your-webhook-url.com/webhook
VITE_GHL_PRIVATE_INTEGRATION_KEY=your_private_integration_key_here

# Keep these for fallback (optional)
VITE_GHL_LOCATION_ID=your_location_id_here
VITE_GHL_API_KEY=your_api_key_here
```

## 🔄 **Option 2: Direct API (Fallback)**

If you prefer to use the direct API approach:

```env
# Use Direct API
VITE_GHL_USE_PRIVATE_INTEGRATION=false
VITE_GHL_LOCATION_ID=your_location_id_here
VITE_GHL_API_KEY=your_api_key_here
VITE_GHL_BASE_URL=https://rest.gohighlevel.com/v1
```

## 🛠️ **Quick Setup with Webhook.site**

### Step 1: Get Webhook URL
1. Go to [webhook.site](https://webhook.site)
2. Copy your unique webhook URL
3. Add it to your GoHighLevel Private Integration

### Step 2: Test the Integration
1. Complete your funnel quiz
2. Check webhook.site for incoming data
3. Verify the data format

### Step 3: Forward to GoHighLevel
Set up webhook.site to forward the data to GoHighLevel's API endpoint.

## 📊 **Data Flow**

### Private Integration Flow:
```
User completes quiz → Your funnel → Webhook endpoint → GoHighLevel
```

### Direct API Flow:
```
User completes quiz → Your funnel → GoHighLevel API directly
```

## 🔧 **Testing Your Integration**

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Complete the quiz flow**

3. **Check for success:**
   - Browser console for logs
   - GoHighLevel dashboard for new contacts
   - Webhook service logs (if using Private Integration)

## 🚨 **Troubleshooting**

### Private Integration Issues:
- **Webhook not receiving data:** Check webhook URL in GoHighLevel
- **Data not reaching GoHighLevel:** Verify webhook forwarding setup
- **Authentication errors:** Check integration key

### Direct API Issues:
- **401 errors:** Check API key and Location ID
- **404 errors:** Verify API endpoint URL
- **Rate limiting:** Implement retry logic

## 📞 **Support**

Need help setting up the Private Integration?

1. **Check GoHighLevel's documentation** on Private Integrations
2. **Test with webhook.site** first to verify data flow
3. **Contact GoHighLevel support** for Private Integration questions
4. **Email info@wattleads.com** for funnel-specific issues

## 🎯 **Next Steps**

1. **Choose your integration method** (Private Integration recommended)
2. **Set up your webhook endpoint** or use direct API
3. **Configure environment variables**
4. **Test the integration**
5. **Monitor lead submissions** in GoHighLevel

---

**Pro Tip:** Start with webhook.site for testing, then move to a production webhook service once everything works!
