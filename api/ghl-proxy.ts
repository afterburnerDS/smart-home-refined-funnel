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
    // Get the path from the 'path' query parameter
    const targetPath = req.query.path || '';
    
    // Construct the target URL - Use the correct GoHighLevel Private Integration API base URL
    const targetUrl = `https://services.leadconnectorhq.com/${targetPath}`;
    
    // Prepare headers - forward all relevant headers for v2 API
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    };

    // Add authorization header if present AND valid, otherwise use env var (server-side secret)
    const incomingAuth = (req.headers.authorization || '').toString();
    const looksInvalid = !incomingAuth || incomingAuth.includes('undefined') || incomingAuth.includes('null') || /^Bearer\s*$/i.test(incomingAuth);
    if (incomingAuth && !looksInvalid) {
      headers['Authorization'] = incomingAuth;
    } else {
      const envToken = process.env.GHL_PRIVATE_INTEGRATION_KEY || process.env.GHL_API_KEY;
      if (envToken) {
        headers['Authorization'] = `Bearer ${envToken}`;
      } else {
        // Fail early with a clear message instead of forwarding an unauthenticated request
        res.status(401).json({
          error: 'Missing server authorization token',
          hint: 'Set GHL_PRIVATE_INTEGRATION_KEY (preferred) or GHL_API_KEY in Vercel project Environment Variables',
          targetPath
        });
        return;
      }
    }

    // If locationId missing from body, inject server value to satisfy GHL requirement
    if (parsedBody && typeof parsedBody === 'object' && !parsedBody.locationId && process.env.GHL_LOCATION_ID) {
      parsedBody.locationId = process.env.GHL_LOCATION_ID;
    }

    // Add any other GoHighLevel specific headers for v2 API
    if (req.headers.version) {
      headers['Version'] = req.headers.version;
    }

    console.log('=== GoHighLevel Proxy Debug ===');
    console.log('Original URL:', req.url);
    console.log('Query params:', req.query);
    console.log('Path param:', req.query.path);
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
    
    let response;
    try {
      response = await fetch(targetUrl, {
        method: req.method,
        headers,
        body: req.method !== 'GET' && parsedBody ? JSON.stringify(parsedBody) : undefined
      });
    } catch (fetchErr) {
      console.error('Fetch to GoHighLevel failed:', fetchErr);
      res.status(502).json({ error: 'Failed to reach GoHighLevel', details: String(fetchErr) });
      return;
    }

    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = responseText;
    }
    
    console.log('=== GoHighLevel Response ===');
    console.log('Response status:', response.status);
    console.log('Response data:', responseData);
    console.log('===========================');

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Version');
    
    // Return the response with proper status and content type
    res.status(response.status);
    res.setHeader('Content-Type', 'application/json');
    
    if (typeof responseData === 'object') {
      res.json(responseData);
    } else {
      res.json({ message: responseData });
    }

  } catch (error) {
    console.error('=== Proxy Error ===');
    console.error('Error details:', error);
    console.error('Request URL:', req.url);
    console.error('Request method:', req.method);
    console.error('Request body:', req.body);
    console.error('Target path:', req.query.path);
    console.error('==================');
    
    // Set CORS headers even for errors
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Version');
    res.setHeader('Content-Type', 'application/json');
    
    res.status(500).json({ 
      error: 'Proxy server error', 
      details: error instanceof Error ? error.message : 'Unknown error',
      url: req.url,
      method: req.method,
      path: req.query.path
    });
  }
} 