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
    console.log('Test function called');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Query:', req.query);
    console.log('Body:', req.body);

    res.status(200).json({
      message: 'Test function working',
      method: req.method,
      url: req.url,
      query: req.query,
      body: req.body,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Test function error:', error);
    res.status(500).json({
      error: 'Test function failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}