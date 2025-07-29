// GoHighLevel Webhook Handler
// This function receives data from your funnel and forwards it to GoHighLevel

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const leadData = req.body;
    
    // Validate required fields
    if (!leadData.name || !leadData.email || !leadData.phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Format data for GoHighLevel
    const formattedData = {
      email: leadData.email,
      firstName: leadData.name.split(' ')[0],
      lastName: leadData.name.split(' ').slice(1).join(' ') || '',
      phone: formatPhoneNumber(leadData.phone),
      customField: {
        c_services: leadData.services?.join(', ') || '',
        c_monthly_projects: leadData.monthlyProjects || '',
        c_avg_project_value: leadData.avgProjectValue || '',
        c_marketing_spend: leadData.marketingSpend || '',
        c_source: leadData.source || 'WattLeads Funnel',
        c_utm_source: leadData.utm_source || '',
        c_utm_medium: leadData.utm_medium || '',
        c_utm_campaign: leadData.utm_campaign || '',
        c_lead_qualification: calculateLeadScore(leadData),
        c_company_type: 'Smart Home / Electrical',
        c_funnel_stage: 'Quiz Completed'
      },
      locationId: process.env.GHL_LOCATION_ID,
      source: 'WattLeads Funnel',
      tags: ['Smart Home Lead', 'Quiz Completed', 'WattLeads']
    };

    // Submit to GoHighLevel API
    const response = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GoHighLevel API Error:', errorData);
      return res.status(500).json({ 
        error: 'Failed to submit to GoHighLevel',
        details: errorData 
      });
    }

    const result = await response.json();
    
    // Create opportunity if contact was created successfully
    if (result.id) {
      await createOpportunity(result.id, leadData);
    }

    // Return success
    return res.status(200).json({ 
      success: true, 
      contactId: result.id,
      message: 'Lead submitted successfully' 
    });

  } catch (error) {
    console.error('Webhook handler error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

// Helper functions
function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('+')) {
    return cleaned;
  }
  
  return `+1${cleaned}`;
}

function calculateLeadScore(leadData) {
  let score = 0;

  if (leadData.avgProjectValue === '$50k+') score += 30;
  else if (leadData.avgProjectValue === '$25k-$50k') score += 25;
  else if (leadData.avgProjectValue === '$10k-$25k') score += 15;
  else score += 5;

  if (leadData.marketingSpend === '$10k+') score += 25;
  else if (leadData.marketingSpend === '$5k-$10k') score += 20;
  else if (leadData.marketingSpend === '$2k-$5k') score += 15;
  else score += 5;

  if (leadData.monthlyProjects === '30+ projects') score += 20;
  else if (leadData.monthlyProjects === '16-30 projects') score += 15;
  else if (leadData.monthlyProjects === '6-15 projects') score += 10;
  else score += 5;

  const premiumServices = [
    'Whole-Home Automation & Voice Control',
    'Home Cinema / Media Room',
    'Enterprise-Grade Networking'
  ];
  
  const hasPremiumService = leadData.services?.some(service => 
    premiumServices.includes(service)
  );
  
  if (hasPremiumService) score += 15;
  else score += 10;

  return Math.min(score, 100);
}

async function createOpportunity(contactId, leadData) {
  try {
    const opportunityData = {
      contactId: contactId,
      locationId: process.env.GHL_LOCATION_ID,
      name: `${leadData.name} - Smart Home Lead Generation`,
      status: 'Lead In',
      value: calculateOpportunityValue(leadData.avgProjectValue),
      source: 'WattLeads Funnel',
      description: `Smart Home Lead Generation Opportunity

Services: ${leadData.services?.join(', ') || ''}
Monthly Projects: ${leadData.monthlyProjects || ''}
Average Project Value: ${leadData.avgProjectValue || ''}
Marketing Spend: ${leadData.marketingSpend || ''}

Lead Score: ${calculateLeadScore(leadData)}/100`,
      tags: ['Smart Home', 'Lead Generation', 'WattLeads']
    };

    await fetch('https://rest.gohighlevel.com/v1/opportunities/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(opportunityData)
    });

  } catch (error) {
    console.error('Error creating opportunity:', error);
  }
}

function calculateOpportunityValue(avgProjectValue) {
  switch (avgProjectValue) {
    case '$50k+': return 50000;
    case '$25k-$50k': return 37500;
    case '$10k-$25k': return 17500;
    default: return 10000;
  }
}
