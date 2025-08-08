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
  // Facebook Ad Tracking Parameters
  ad_id?: string;
  adset_id?: string;
  campaign_id?: string;
  fbclid?: string;
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
    // Always use the official direct API endpoint unless explicitly opting into proxy-based Private Integration
    // Official base URL per GoHighLevel docs
    this.baseUrl = 'https://services.leadconnectorhq.com/';
    console.log('GoHighLevel Service initialized with config:', {
      usePrivateIntegration: config.usePrivateIntegration,
      hasPrivateKey: !!config.privateIntegrationKey,
      hasApiKey: !!config.apiKey,
      locationId: config.locationId,
      baseUrl: this.baseUrl
    });
  }

  async submitLead(leadData: LeadData): Promise<{ success: boolean; contactId?: string; error?: string }> {
    console.log('=== GOHIGHLEVEL LEAD SUBMISSION ===');
    console.log('Lead data received:', leadData);
    
    try {
      // Only use the Private Integration flow if explicitly enabled
      const shouldUsePrivateIntegration = this.config.usePrivateIntegration === true && !!this.config.privateIntegrationKey;

      if (shouldUsePrivateIntegration) {
        console.log('Using Private Integration method');
        return await this.submitViaPrivateIntegration(leadData);
      } else {
        console.log('Using Direct API method');
        const directResult = await this.submitViaDirectAPI(leadData);
        return directResult;
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
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      };

      const url = `${this.baseUrl}contacts/`;
      const response = await fetch(url, {
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
          
          // Update contact with custom fields (for GHL automations)
          console.log('🔧 About to update custom fields for contactId:', contactId);
          await this.updateContactCustomFields(contactId, leadData);
          console.log('✅ Custom fields update completed');

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
      console.error('Private Integration submission failed:', error);
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
        locationId: this.config.locationId,
        source: 'WattLeads Funnel',
        tags: ['Smart Home Lead', 'Quiz Completed', 'WattLeads']
      };

      console.log('Direct API payload:', contactData);

      const token = this.config.apiKey || this.config.privateIntegrationKey || '';
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      };

      const url = `${this.baseUrl}contacts/`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(contactData)
      });

      console.log('Direct API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Direct API Error:', errorData);
        return {
          success: false,
          error: `Direct API Error: ${response.status} - ${errorData.message || 'Unknown error'}`
        };
      }

      const result = await response.json();
      console.log('Direct API success result:', result);
      
      const contactId = result.contact?.id || result.id;
      
      if (contactId) {
        try {
          await this.createOpportunity(contactId, leadData);
        } catch (opportunityError) {
          console.error('Failed to create opportunity:', opportunityError);
        }
      }

      return {
        success: true,
        contactId: contactId
      };

    } catch (error) {
      console.error('Direct API submission failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Direct API error occurred'
      };
    }
  }

  private async createOpportunity(contactId: string, leadData: LeadData): Promise<void> {
    try {
      console.log('=== CREATING OPPORTUNITY ===');
      console.log('Contact ID:', contactId);
      console.log('Pipeline ID:', this.config.pipelineId);
      console.log('Stage ID:', this.config.stageId);

      if (!this.config.pipelineId || !this.config.stageId) {
        console.error('Missing pipeline or stage ID for opportunity creation');
        return;
      }

      // Use the correct opportunity payload structure for GoHighLevel v2 API
      // Based on official API documentation
      const opportunityData = {
        contactId: contactId,
        locationId: this.config.locationId,
        pipelineId: this.config.pipelineId,
        pipelineStageId: this.config.stageId,  // Use pipelineStageId, not stageId
        name: `${leadData.name} - Smart Home Lead Generation`,  // Use name, not title
        status: "open",  // Required field with specific values
        monetaryValue: 0
      };

      const authHeader = this.config.usePrivateIntegration 
        ? `Bearer ${this.config.privateIntegrationKey}`
        : `Bearer ${this.config.apiKey}`;

      console.log('=== OPPORTUNITY CREATION ===');
      console.log('Opportunity payload:', JSON.stringify(opportunityData, null, 2));
      
      const headers: Record<string, string> = {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      };
      
      console.log('Opportunities headers:', headers);
      
      const url = `${this.baseUrl}opportunities/`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(opportunityData)
      });

      console.log('Opportunity creation response status:', response.status);
      console.log('Opportunity creation response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Opportunity creation failed:', response.status, errorData);
        throw new Error(`Opportunity creation failed: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const result = await response.json();
      console.log('✅ Opportunity created successfully:', result);
      
      // Get the opportunity ID for notes
      const opportunityId = result.id || result.opportunity?.id;
      
      if (opportunityId) {
        // Create notes for both opportunity and contact
        await this.createOpportunityNote(opportunityId, leadData);
        await this.createContactNote(contactId, leadData);
      } else {
        console.warn('⚠️ No opportunity ID returned, skipping note creation');
      }

    } catch (error) {
      console.error('❌ Error in createOpportunity:', error);
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
${leadData.utm_campaign ? `UTM Campaign: ${leadData.utm_campaign}` : ''}

📱 FACEBOOK AD TRACKING:
${leadData.ad_id ? `Ad ID: ${leadData.ad_id}` : ''}
${leadData.adset_id ? `AdSet ID: ${leadData.adset_id}` : ''}
${leadData.campaign_id ? `Campaign ID: ${leadData.campaign_id}` : ''}
${leadData.fbclid ? `Facebook Click ID: ${leadData.fbclid}` : ''}`;

      const authHeader = this.config.usePrivateIntegration 
        ? `Bearer ${this.config.privateIntegrationKey}`
        : `Bearer ${this.config.apiKey}`;

      const notePayload = {
        body: noteContent,
        userId: 'system'
      };

      console.log('Note payload:', JSON.stringify(notePayload, null, 2));
      
      const url = `${this.baseUrl}opportunities/${opportunityId}/notes`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
          'Version': '2021-07-28'
        },
        body: JSON.stringify(notePayload)
      });

      console.log('Opportunity note response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Opportunity note creation failed:', response.status, errorData);
      } else {
        console.log('✅ Opportunity note created successfully');
      }

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
${leadData.utm_campaign ? `UTM Campaign: ${leadData.utm_campaign}` : ''}

📱 FACEBOOK AD TRACKING:
${leadData.ad_id ? `Ad ID: ${leadData.ad_id}` : ''}
${leadData.adset_id ? `AdSet ID: ${leadData.adset_id}` : ''}
${leadData.campaign_id ? `Campaign ID: ${leadData.campaign_id}` : ''}
${leadData.fbclid ? `Facebook Click ID: ${leadData.fbclid}` : ''}`;

      const authHeader = this.config.usePrivateIntegration 
        ? `Bearer ${this.config.privateIntegrationKey}`
        : `Bearer ${this.config.apiKey}`;

      const notePayload = {
        body: noteContent,
        userId: 'system'
      };

      console.log('Contact note payload:', JSON.stringify(notePayload, null, 2));
      
      const url = `${this.baseUrl}contacts/${contactId}/notes`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
          'Version': '2021-07-28'
        },
        body: JSON.stringify(notePayload)
      });

      console.log('Contact note response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Contact note creation failed:', response.status, errorData);
      } else {
        console.log('✅ Contact note created successfully');
      }

      console.warn('💡 Contact note creation failed');

    } catch (error) {
      console.error('❌ Error creating contact note:', error);
    }
  }

  private async updateContactCustomFields(contactId: string, leadData: LeadData): Promise<void> {
    try {
      console.log('🔧 Updating contact custom fields...');
      
      // Use lowercase field names matching the GoHighLevel placeholders
      const customFields = [
        {
          key: "c_ad_id",
          field_value: leadData.ad_id || ''
        },
        {
          key: "c_adset_id", 
          field_value: leadData.adset_id || ''
        },
        {
          key: "c_campaign_id",
          field_value: leadData.campaign_id || ''
        },
        {
          key: "c_fbclid",
          field_value: leadData.fbclid || ''
        }
      ];

      console.log('📋 Custom fields to update:', customFields);

      const token = this.config.privateIntegrationKey || this.config.apiKey || '';
      const authHeader = `Bearer ${token}`;
      const headers: Record<string, string> = {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      };

      const url = `${this.baseUrl}contacts/${contactId}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ customFields: customFields })
      });

      console.log('🌐 Custom fields API URL:', url);
      console.log('📤 Custom fields payload sent:', JSON.stringify({ customFields: customFields }, null, 2));
      console.log('🔑 Authorization header:', authHeader.substring(0, 20) + '...');
      console.log('📋 Custom fields update response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Custom fields update failed:', response.status);
        console.error('❌ Full error response:', JSON.stringify(errorData, null, 2));
        console.error('❌ Response headers:', Object.fromEntries(response.headers.entries()));
      } else {
        const successData = await response.json().catch(() => ({}));
        console.log('✅ Custom fields updated successfully');
        console.log('✅ Success response:', JSON.stringify(successData, null, 2));
        console.log('🎯 Contact should now have these custom fields populated in GoHighLevel');
      }

    } catch (error) {
      console.error('❌ Error updating custom fields:', error);
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

    if (leadData.services.length > 3) score += 15;
    else if (leadData.services.length > 1) score += 10;
    else score += 5;

    if (leadData.monthlyProjects === '10+ projects') score += 20;
    else if (leadData.monthlyProjects === '5-10 projects') score += 15;
    else if (leadData.monthlyProjects === '1-5 projects') score += 10;
    else score += 5;

    return Math.min(score, 100);
  }

  private formatPhoneNumber(phone: string): string {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Add +1 if it's a 10-digit US number
    if (cleaned.length === 10) {
      return `+1${cleaned}`;
    }
    
    // Add + if it doesn't start with it
    if (cleaned.length > 10 && !phone.startsWith('+')) {
      return `+${cleaned}`;
    }
    
    return phone;
  }

  private getFirstName(fullName: string): string {
    return fullName.split(' ')[0] || '';
  }

  private getLastName(fullName: string): string {
    const parts = fullName.split(' ');
    return parts.length > 1 ? parts.slice(1).join(' ') : '';
  }

  getUTMParams(): { 
    utm_source?: string; 
    utm_medium?: string; 
    utm_campaign?: string;
    ad_id?: string;
    adset_id?: string;
    campaign_id?: string;
    fbclid?: string;
  } {
    if (typeof window === 'undefined') return {};
    
    const urlParams = new URLSearchParams(window.location.search);
    const params = {
      utm_source: urlParams.get('utm_source') || undefined,
      utm_medium: urlParams.get('utm_medium') || undefined,
      utm_campaign: urlParams.get('utm_campaign') || undefined,
      // Facebook Ad Tracking Parameters
      ad_id: urlParams.get('ad_id') || undefined,
      adset_id: urlParams.get('adset_id') || undefined,
      campaign_id: urlParams.get('campaign_id') || undefined,
      fbclid: urlParams.get('fbclid') || undefined
    };
    
    console.log('🔍 URL Parameters captured:', params);
    console.log('📍 Current URL:', window.location.href);
    
    return params;
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