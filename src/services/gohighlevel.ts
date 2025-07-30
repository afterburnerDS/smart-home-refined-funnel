// GoHighLevel CRM Integration Service - Updated for Private Integrations
interface LeadData {
  name: string;
  email: string;
  phone: string;
  services: string[];
  monthlyProjects: string;
  avgProjectValue: string;
  marketingSpend: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

interface GoHighLevelConfig {
  // Private Integration settings
  usePrivateIntegration?: boolean;
  privateIntegrationKey?: string;
  // Direct API settings (fallback)
  locationId?: string;
  apiKey?: string;
  baseUrl?: string;
  // Pipeline settings
  pipelineId?: string;
  stageId?: string;
}

class GoHighLevelService {
  private config: GoHighLevelConfig;
  private baseUrl: string;

  constructor(config: GoHighLevelConfig) {
    this.config = config;
    // Use proxy in development and production to avoid CORS issues
    this.baseUrl = '/api/ghl';
    console.log('GoHighLevel Service initialized with config:', {
      usePrivateIntegration: config.usePrivateIntegration,
      hasPrivateKey: !!config.privateIntegrationKey,
      hasLocationId: !!config.locationId,
      hasApiKey: !!config.apiKey,
      hasPipelineId: !!config.pipelineId,
      hasStageId: !!config.stageId,
      baseUrl: this.baseUrl
    });
  }

  async submitLead(leadData: LeadData): Promise<{ success: boolean; contactId?: string; error?: string }> {
    console.log('=== LEAD SUBMISSION START ===');
    console.log('Full leadData received:', JSON.stringify(leadData, null, 2));
    console.log('Services:', leadData.services);
    console.log('Monthly Projects:', leadData.monthlyProjects);
    console.log('Avg Project Value:', leadData.avgProjectValue);
    console.log('Marketing Spend:', leadData.marketingSpend);
    console.log('============================');
    
    try {
      if (this.config.usePrivateIntegration && this.config.privateIntegrationKey) {
        console.log('Using Private Integration method');
        return await this.submitViaPrivateIntegration(leadData);
      } else {
        console.log('Using Direct API method');
        return await this.submitViaDirectAPI(leadData);
      }
    } catch (error) {
      console.error('GoHighLevel submission error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private async submitViaPrivateIntegration(leadData: LeadData): Promise<{ success: boolean; contactId?: string; error?: string }> {
    try {
      console.log('Attempting Private Integration submission...');
      const formattedPhone = this.formatPhoneNumber(leadData.phone);
      
      const payload = {
        email: leadData.email,
        firstName: this.getFirstName(leadData.name),
        lastName: this.getLastName(leadData.name),
        phone: formattedPhone,
        locationId: this.config.locationId,
        source: 'WattLeads Funnel',
        tags: ['Smart Home Lead', 'Quiz Completed', 'WattLeads']
      };

      console.log('Private Integration payload:', payload);
      console.log('Using Private Integration key:', this.config.privateIntegrationKey);

      const headers: Record<string, string> = {
        'Authorization': `Bearer ${this.config.privateIntegrationKey}`,
        'Content-Type': 'application/json'
      };

      // Only add Version header when not using proxy (proxy adds it automatically)
      if (!import.meta.env.DEV) {
        headers['Version'] = '2021-07-28';
      }

      const response = await fetch(`${this.baseUrl}/contacts/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      console.log('Private Integration response status:', response.status);
      console.log('Private Integration response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Private Integration Error:', errorData);
        return {
          success: false,
          error: `Private Integration Error: ${response.status} - ${errorData.message || 'Unknown error'}`
        };
      }

      const result = await response.json();
      console.log('Private Integration success result:', result);
      
      // Extract contact ID from the response (it might be nested in a contact object)
      const contactId = result.id || result.contact?.id || result.contactId;
      console.log('Extracted contact ID:', contactId);
      
      // Create opportunity if contact was created successfully
      if (contactId) {
        console.log('✅ Contact created successfully, now creating opportunity...');
        try {
          await this.createOpportunity(contactId, leadData);
          console.log('✅ Opportunity creation completed');
          

        } catch (opportunityError) {
          console.error('❌ Failed to create opportunity:', opportunityError);
          // Still return success for contact creation, but log the opportunity error
        }
      } else {
        console.log('❌ No contact ID returned, skipping opportunity creation');
        console.log('Full result object:', result);
      }

      return {
        success: true,
        contactId: contactId
      };

    } catch (error) {
      console.error('Private Integration submission error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Private Integration error occurred'
      };
    }
  }

  private async submitViaDirectAPI(leadData: LeadData): Promise<{ success: boolean; contactId?: string; error?: string }> {
    try {
      console.log('Attempting Direct API submission...');
      const formattedPhone = this.formatPhoneNumber(leadData.phone);
      
      const contactData = {
        email: leadData.email,
        firstName: this.getFirstName(leadData.name),
        lastName: this.getLastName(leadData.name),
        phone: formattedPhone,
        customField: {
          c_services: leadData.services.join(', '),
          c_monthly_projects: leadData.monthlyProjects,
          c_avg_project_value: leadData.avgProjectValue,
          c_marketing_spend: leadData.marketingSpend,
          c_source: leadData.source || 'WattLeads Funnel',
          c_utm_source: leadData.utm_source || '',
          c_utm_medium: leadData.utm_medium || '',
          c_utm_campaign: leadData.utm_campaign || '',
          c_lead_qualification: this.calculateLeadScore(leadData),
          c_company_type: 'Smart Home / Electrical',
          c_funnel_stage: 'Quiz Completed'
        },
        locationId: this.config.locationId,
        source: 'WattLeads Funnel',
        tags: ['Smart Home Lead', 'Quiz Completed', 'WattLeads']
      };

      console.log('Direct API payload:', contactData);

      const headers: Record<string, string> = {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json'
      };

      // Only add Version header when not using proxy (proxy adds it automatically)
      if (!import.meta.env.DEV) {
        headers['Version'] = '2021-07-28';
      }

      const response = await fetch(`${this.baseUrl}/contacts/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(contactData)
      });

      console.log('Direct API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('GoHighLevel API Error:', errorData);
        return {
          success: false,
          error: `API Error: ${response.status} - ${errorData.message || 'Unknown error'}`
        };
      }

      const result = await response.json();
      console.log('Direct API success result:', result);
      
      // Extract contact ID from the response (it might be nested in a contact object)
      const contactId = result.id || result.contact?.id || result.contactId;
      console.log('Extracted contact ID:', contactId);
      
      if (contactId) {
        console.log('✅ Contact created successfully, now creating opportunity...');
        try {
          await this.createOpportunity(contactId, leadData);
          console.log('✅ Opportunity creation completed');
        } catch (opportunityError) {
          console.error('❌ Failed to create opportunity:', opportunityError);
          // Still return success for contact creation, but log the opportunity error
        }
      } else {
        console.log('❌ No contact ID returned, skipping opportunity creation');
        console.log('Full result object:', result);
      }

      return {
        success: true,
        contactId: contactId
      };

    } catch (error) {
      console.error('Direct API submission error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Direct API error occurred'
      };
    }
  }

  private async createOpportunity(contactId: string, leadData: LeadData): Promise<void> {
    try {
      console.log('=== OPPORTUNITY CREATION START ===');
      console.log('Contact ID:', contactId);
      console.log('Pipeline ID:', this.config.pipelineId);
      console.log('Stage ID:', this.config.stageId);
      console.log('Base URL:', this.baseUrl);
      console.log('Lead Data for opportunity:', JSON.stringify(leadData, null, 2));
      
      if (!this.config.pipelineId || !this.config.stageId) {
        console.error('Missing pipeline or stage ID for opportunity creation');
        return;
      }

      const opportunityData = {
        locationId: this.config.locationId,
        pipelineId: this.config.pipelineId,
        contactId: contactId,
        name: `${leadData.name} - Smart Home Lead Generation`,
        status: 'open',
        description: `🏠 Smart Home Lead - Quiz Results

📋 QUIZ RESPONSES:
Services: ${leadData.services.join(', ')}
Monthly Projects: ${leadData.monthlyProjects}
Avg Project Value: ${leadData.avgProjectValue}
Marketing Spend: ${leadData.marketingSpend}
Lead Score: ${this.calculateLeadScore(leadData)}/100
Source: WattLeads Funnel

${leadData.utm_source ? `UTM Source: ${leadData.utm_source}` : ''}
${leadData.utm_medium ? `UTM Medium: ${leadData.utm_medium}` : ''}
${leadData.utm_campaign ? `UTM Campaign: ${leadData.utm_campaign}` : ''}`
      };

      const authHeader = this.config.usePrivateIntegration 
        ? `Bearer ${this.config.privateIntegrationKey}`
        : `Bearer ${this.config.apiKey}`;

      console.log('Opportunity creation payload:', opportunityData);
      console.log('Using endpoint:', `${this.baseUrl}/deals/`);

      const headers: Record<string, string> = {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      };

      // Try the deals endpoint first (most GoHighLevel instances use deals)
      const dealsPayload = {
        locationId: this.config.locationId,
        pipelineId: this.config.pipelineId,
        contactId: contactId,
        title: `${leadData.name} - Smart Home Lead Generation`,
        status: 'open'
      };
      
      console.log('=== DEALS ENDPOINT ATTEMPT ===');
      console.log('Deals payload:', JSON.stringify(dealsPayload, null, 2));
      console.log('Deals URL:', `${this.baseUrl}/deals/`);
      console.log('Deals headers:', headers);
      
      let response = await fetch(`${this.baseUrl}/deals/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(dealsPayload)
      });

      // If deals endpoint fails, try opportunities endpoint as fallback
      if (!response.ok) {
        console.log('=== OPPORTUNITIES ENDPOINT ATTEMPT ===');
        console.log('Deals endpoint failed with status:', response.status);
        console.log('Opportunities payload:', JSON.stringify(opportunityData, null, 2));
        console.log('Opportunities URL:', `${this.baseUrl}/opportunities/`);
        console.log('Opportunities headers:', headers);
        
        response = await fetch(`${this.baseUrl}/opportunities/`, {
          method: 'POST',
          headers,
          body: JSON.stringify(opportunityData)
        });
      }

      console.log('=== OPPORTUNITY CREATION RESPONSE ===');
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Opportunity creation failed!');
        console.error('Error status:', response.status);
        console.error('Error data:', JSON.stringify(errorData, null, 2));
        console.error('Full error response:', response);
        throw new Error(`Opportunity creation failed: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const result = await response.json();
      console.log('Opportunity created successfully:', result);
      console.log('Full opportunity response structure:', JSON.stringify(result, null, 2));

      // Extract opportunity ID from the response (try multiple possible locations)
      const opportunityId = result.id || result._id || result.opportunity?.id || result.opportunity?._id || result.data?.id || result.data?._id;
      
      console.log('Extracted opportunity ID:', opportunityId);
      console.log('Using contact ID from parameter:', contactId);

      // Create a note with the quiz answers since we can't include description in opportunity
      if (opportunityId) {
        console.log('📝 Attempting to create note for opportunity:', opportunityId);
        await this.createOpportunityNote(opportunityId, leadData);
      } else {
        console.log('❌ No opportunity ID found in response');
        console.log('Available keys in response:', Object.keys(result));
      }
      
      // Always try to create a contact note since we have the contact ID
      console.log('📝 Creating contact note for backup:', contactId);
      await this.createContactNote(contactId, leadData);

    } catch (error) {
      console.error('Error creating opportunity:', error);
      // Re-throw the error so it's visible in the calling method
      throw error;
    }
  }

  private async createOpportunityNote(opportunityId: string, leadData: LeadData): Promise<void> {
    try {
      const noteContent = `🏠 Smart Home Lead - Quiz Results

📋 QUIZ RESPONSES:
Services: ${leadData.services.join(', ')}
Monthly Projects: ${leadData.monthlyProjects}
Avg Project Value: ${leadData.avgProjectValue}
Marketing Spend: ${leadData.marketingSpend}
Lead Score: ${this.calculateLeadScore(leadData)}/100
Source: WattLeads Funnel

${leadData.utm_source ? `UTM Source: ${leadData.utm_source}` : ''}
${leadData.utm_medium ? `UTM Medium: ${leadData.utm_medium}` : ''}
${leadData.utm_campaign ? `UTM Campaign: ${leadData.utm_campaign}` : ''}`;

      const authHeader = this.config.usePrivateIntegration 
        ? `Bearer ${this.config.privateIntegrationKey}`
        : `Bearer ${this.config.apiKey}`;

      const headers: Record<string, string> = {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      };

      console.log('📝 Creating opportunity note...');

      // Try different note creation approaches with multiple endpoints
      const notePayloads = [
        // Standard note payload
        { body: noteContent },
        // Alternative with location
        { body: noteContent, locationId: this.config.locationId },
        // Simple text format
        { content: noteContent },
        { note: noteContent },
        // Try with title field
        { title: 'Quiz Results', body: noteContent },
        // Try with description field
        { description: noteContent }
      ];

      const endpoints = [
        `/opportunities/${opportunityId}/notes`,
        `/deals/${opportunityId}/notes`,
        `/opportunities/${opportunityId}/comments`,
        `/deals/${opportunityId}/comments`
      ];

      for (const endpoint of endpoints) {
        for (let i = 0; i < notePayloads.length; i++) {
          const payload = notePayloads[i];
          console.log(`📝 Trying ${endpoint} with payload ${i + 1}:`, payload);

          const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
          });

          if (response.ok) {
            const noteResult = await response.json();
            console.log('✅ Opportunity note created successfully:', noteResult);
            console.log('✅ Used endpoint:', endpoint);
            console.log('✅ Used payload:', payload);
            return;
          } else {
            const errorData = await response.json().catch(() => ({}));
            console.log(`❌ ${endpoint} payload ${i + 1} failed:`, response.status, errorData);
            console.log(`❌ Full response headers:`, Object.fromEntries(response.headers.entries()));
            console.log(`❌ Request URL:`, `${this.baseUrl}${endpoint}`);
            console.log(`❌ Request payload:`, payload);
          }
        }
      }

      console.warn('💡 All opportunity note attempts failed');

    } catch (error) {
      console.error('❌ Error creating opportunity note:', error);
    }
  }



  private async createContactNote(contactId: string, leadData: LeadData): Promise<void> {
    try {
      const noteContent = `🏠 Smart Home Lead - Quiz Results

📋 QUIZ RESPONSES:
Services: ${leadData.services.join(', ')}
Monthly Projects: ${leadData.monthlyProjects}
Avg Project Value: ${leadData.avgProjectValue}
Marketing Spend: ${leadData.marketingSpend}
Lead Score: ${this.calculateLeadScore(leadData)}/100
Source: WattLeads Funnel

${leadData.utm_source ? `UTM Source: ${leadData.utm_source}` : ''}
${leadData.utm_medium ? `UTM Medium: ${leadData.utm_medium}` : ''}
${leadData.utm_campaign ? `UTM Campaign: ${leadData.utm_campaign}` : ''}`;

      const authHeader = this.config.usePrivateIntegration 
        ? `Bearer ${this.config.privateIntegrationKey}`
        : `Bearer ${this.config.apiKey}`;

      const headers: Record<string, string> = {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      };

      console.log('📝 Creating contact note...');

      // Try different note creation approaches with multiple endpoints
      const notePayloads = [
        // Standard note payload
        { body: noteContent },
        // Alternative with location
        { body: noteContent, locationId: this.config.locationId },
        // Simple text format
        { content: noteContent },
        { note: noteContent },
        // Try with title field
        { title: 'Quiz Results', body: noteContent },
        // Try with description field
        { description: noteContent }
      ];

      const endpoints = [
        `/contacts/${contactId}/notes`,
        `/contacts/${contactId}/comments`
      ];

      for (const endpoint of endpoints) {
        for (let i = 0; i < notePayloads.length; i++) {
          const payload = notePayloads[i];
          console.log(`📝 Trying ${endpoint} with payload ${i + 1}:`, payload);

          const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
          });

          if (response.ok) {
            const noteResult = await response.json();
            console.log('✅ Contact note created successfully:', noteResult);
            console.log('✅ Used endpoint:', endpoint);
            console.log('✅ Used payload:', payload);
            return;
          } else {
            const errorData = await response.json().catch(() => ({}));
            console.log(`❌ ${endpoint} payload ${i + 1} failed:`, response.status, errorData);
            console.log(`❌ Full response headers:`, Object.fromEntries(response.headers.entries()));
            console.log(`❌ Request URL:`, `${this.baseUrl}${endpoint}`);
            console.log(`❌ Request payload:`, payload);
          }
        }
      }

      console.warn('💡 All contact note attempts failed');

    } catch (error) {
      console.error('❌ Error creating contact note:', error);
    }
  }

  private calculateLeadScore(leadData: LeadData): number {
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
    
    const hasPremiumService = leadData.services.some(service => 
      premiumServices.includes(service)
    );
    
    if (hasPremiumService) score += 15;
    else score += 10;

    return Math.min(score, 100);
  }

  private calculateOpportunityValue(avgProjectValue: string): number {
    switch (avgProjectValue) {
      case '$50k+': return 50000;
      case '$25k-$50k': return 37500;
      case '$10k-$25k': return 17500;
      default: return 10000;
    }
  }

  private formatPhoneNumber(phone: string): string {
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

  private getFirstName(fullName: string): string {
    return fullName.split(' ')[0] || fullName;
  }

  private getLastName(fullName: string): string {
    const parts = fullName.split(' ');
    return parts.length > 1 ? parts.slice(1).join(' ') : '';
  }

  getUTMParams(): { utm_source?: string; utm_medium?: string; utm_campaign?: string } {
    if (typeof window === 'undefined') return {};
    
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get('utm_source') || undefined,
      utm_medium: urlParams.get('utm_medium') || undefined,
      utm_campaign: urlParams.get('utm_campaign') || undefined
    };
  }
}

// Initialize with environment variables
const goHighLevelService = new GoHighLevelService({
  // Private Integration settings
  usePrivateIntegration: import.meta.env.VITE_GHL_USE_PRIVATE_INTEGRATION === 'true',
  privateIntegrationKey: import.meta.env.VITE_GHL_PRIVATE_INTEGRATION_KEY,
  // Direct API settings (fallback)
  locationId: import.meta.env.VITE_GHL_LOCATION_ID,
  apiKey: import.meta.env.VITE_GHL_API_KEY,
  baseUrl: import.meta.env.VITE_GHL_BASE_URL,
  // Pipeline settings
  pipelineId: import.meta.env.VITE_GHL_PIPELINE_ID,
  stageId: import.meta.env.VITE_GHL_STAGE_ID
});

export default goHighLevelService;
export type { LeadData };
