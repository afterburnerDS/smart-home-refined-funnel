export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Version');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Parse body for POST/PUT requests if it's a string
  let parsedBody = req.body;
  if (req.method !== 'GET' && typeof req.body === 'string') {
    try {
      parsedBody = JSON.parse(req.body);
    } catch (e) {
      console.error('Failed to parse body as JSON:', e);
      parsedBody = req.body;
    }
  }

  try {
    // Get the path from Vercel's catch-all parameter
    const { path } = req.query;
    const targetPath = Array.isArray(path) ? path.join('/') : (path || '');
    
    // Construct the target URL - Use the correct GoHighLevel v2 API base URL for Private Integrations
    const targetUrl = `https://services.leadconnectorhq.com/${targetPath}`;
    
    // Prepare headers - forward all relevant headers for v2 API
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    };

    // Add authorization header if present
    if (req.headers.authorization) {
      headers['Authorization'] = req.headers.authorization;
    }

    // Add any other GoHighLevel specific headers for v2 API
    if (req.headers.version) {
      headers['Version'] = req.headers.version;
    }

    console.log('=== GoHighLevel Proxy Debug ===');
    console.log('Original URL:', req.url);
    console.log('Query params:', req.query);
    console.log('Path param:', path);
    console.log('Extracted path:', targetPath);
    console.log('Target URL:', targetUrl);
    console.log('Method:', req.method);
    console.log('Headers:', headers);
    console.log('Original body type:', typeof req.body);
    console.log('Original body:', req.body);
    console.log('Parsed body:', parsedBody);
    console.log('==============================');

    // Make the request to GoHighLevel
    console.log('Making fetch request to:', targetUrl);
    console.log('Fetch options:', {
      method: req.method,
      headers,
      body: req.method !== 'GET' && parsedBody ? JSON.stringify(parsedBody) : undefined
    });
    
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.method !== 'GET' && parsedBody ? JSON.stringify(parsedBody) : undefined
    });

    let responseData;
    try {
      responseData = await response.json();
    } catch (e) {
      // If response is not JSON, return text
      responseData = await response.text();
    }
    
    console.log('=== GoHighLevel Response ===');
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    console.log('Response data:', responseData);
    console.log('===========================');

    // Return the response with proper status
    res.status(response.status);
    
    // Set response headers
    response.headers.forEach((value, key) => {
      if (!key.toLowerCase().includes('content-encoding') && 
          !key.toLowerCase().includes('transfer-encoding')) {
        res.setHeader(key, value);
      }
    });

    if (typeof responseData === 'string') {
      res.send(responseData);
    } else {
      res.json(responseData);
    }

  } catch (error) {
    console.error('=== Proxy Error ===');
    console.error('Error details:', error);
    console.error('Request URL:', req.url);
    console.error('Request method:', req.method);
    console.error('Request body:', req.body);
    console.error('==================');
    res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message,
      url: req.url,
      method: req.method
    });
  }
} 