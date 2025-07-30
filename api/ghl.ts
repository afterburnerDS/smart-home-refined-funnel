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

  try {
    const { path, ...queryParams } = req.query;
    const targetPath = Array.isArray(path) ? path.join('/') : path || '';
    
    // Construct the target URL
    const targetUrl = `https://services.leadconnectorhq.com/${targetPath}`;
    
    // Prepare headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    };

    // Add authorization header if present
    if (req.headers.authorization) {
      headers['Authorization'] = req.headers.authorization;
    }

    console.log('Proxying request to:', targetUrl);
    console.log('Method:', req.method);
    console.log('Headers:', headers);

    // Make the request to GoHighLevel
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
    });

    const responseData = await response.json().catch(() => ({}));
    
    console.log('GoHighLevel response status:', response.status);
    console.log('GoHighLevel response data:', responseData);

    // Return the response
    res.status(response.status).json(responseData);

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
} 