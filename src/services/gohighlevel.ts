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
  locationId: string;
  apiKey: string;
  baseUrl?: string;
  // Private Integration settings
  usePrivateIntegration?: boolean;
  privateIntegrationKey?: string;
}

class GoHighLevelService {
  private config: GoHighLevelConfig;
  private baseUrl: string;

  constructor(config: GoHighLevelConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://rest.gohighlevel.com/v1';
  }

  async submitLead(leadData: LeadData): Promise<{ success: boolean; contactId?: string; error?: string }> {
    try {
      if (this.config.usePrivateIntegration && this.config.privateIntegrationKey) {
        return await this.submitViaPrivateIntegration(leadData);
      } else {
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
      const formattedPhone = this.formatPhoneNumber(leadData.phone);
      
      // Use GoHighLevel's Private Integration endpoint
      const response = await fetch(`${this.baseUrl}/contacts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.privateIntegrationKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
          source: 'WattLeads Funnel',
          tags: ['Smart Home Lead', 'Quiz Completed', 'WattLeads']
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Private Integration Error:', errorData);
        return {
          success: false,
          error: `Private Integration Error: ${response.status} - ${errorData.message || 'Unknown error'}`
        };
      }

      const result = await response.json();
      
      // Create opportunity if contact was created successfully
      if (result.id) {
        await this.createOpportunity(result.id, leadData);
      }

      return {
        success: true,
        contactId: result.id
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

      const response = await fetch(`${this.baseUrl}/contacts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('GoHighLevel API Error:', errorData);
        return {
          success: false,
          error: `API Error: ${response.status} - ${errorData.message || 'Unknown error'}`
        };
      }

      const result = await response.json();
      
      if (result.id) {
        await this.createOpportunity(result.id, leadData);
      }

      return {
        success: true,
        contactId: result.id
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
      const opportunityData = {
        contactId: contactId,
        name: `${leadData.name} - Smart Home Lead Generation`,
        status: 'Lead In',
        value: this.calculateOpportunityValue(leadData.avgProjectValue),
        source: 'WattLeads Funnel',
        description: `Smart Home Lead Generation Opportunity
        
Services: ${leadData.services.join(', ')}
Monthly Projects: ${leadData.monthlyProjects}
Average Project Value: ${leadData.avgProjectValue}
Marketing Spend: ${leadData.marketingSpend}

Lead Score: ${this.calculateLeadScore(leadData)}/100`,
        tags: ['Smart Home', 'Lead Generation', 'WattLeads']
      };

      const authHeader = this.config.usePrivateIntegration 
        ? `Bearer ${this.config.privateIntegrationKey}`
        : `Bearer ${this.config.apiKey}`;

      await fetch(`${this.baseUrl}/opportunities/`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(opportunityData)
      });

    } catch (error) {
      console.error('Error creating opportunity:', error);
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
  locationId: import.meta.env.VITE_GHL_LOCATION_ID || '',
  apiKey: import.meta.env.VITE_GHL_API_KEY || '',
  baseUrl: import.meta.env.VITE_GHL_BASE_URL,
  // Private Integration settings
  usePrivateIntegration: import.meta.env.VITE_GHL_USE_PRIVATE_INTEGRATION === 'true',
  privateIntegrationKey: import.meta.env.VITE_GHL_PRIVATE_INTEGRATION_KEY
});

export default goHighLevelService;
export type { LeadData };
