#!/bin/bash

echo "🚀 GoHighLevel Private Integration Setup"
echo "========================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Creating one..."
    cat > .env << 'ENVEOF'
# GoHighLevel Private Integration (Recommended)
VITE_GHL_USE_PRIVATE_INTEGRATION=true
VITE_GHL_PRIVATE_INTEGRATION_URL=https://webhook.site/YOUR_UNIQUE_ID_HERE
VITE_GHL_PRIVATE_INTEGRATION_KEY=your_private_integration_key_here

# Fallback Direct API (keep for backup)
VITE_GHL_LOCATION_ID=your_location_id_here
VITE_GHL_API_KEY=your_api_key_here
VITE_GHL_BASE_URL=https://rest.gohighlevel.com/v1

# Meta Pixel
VITE_META_PIXEL_ID=YOUR_PIXEL_ID_HERE
ENVEOF
    echo "✅ .env file created"
else
    echo "✅ .env file exists"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Go to https://webhook.site and copy your unique webhook URL"
echo "2. Update VITE_GHL_PRIVATE_INTEGRATION_URL in .env with your webhook URL"
echo "3. In GoHighLevel, create a Private Integration with your webhook URL"
echo "4. Test the integration by completing the quiz"
echo ""
echo "🔧 Files created:"
echo "✅ api/gohighlevel-webhook.js - Webhook handler"
echo "✅ vercel.json - Updated with webhook endpoint"
echo "✅ .env - Environment variables template"
echo ""
echo "📖 Check PRIVATE_INTEGRATION_SETUP.md for detailed instructions"
