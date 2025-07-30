import goHighLevelService from "../services/gohighlevel";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { CheckCircle, Mail } from "lucide-react";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const phone = searchParams.get("phone") || "";
  
  // Split name into first and last name
  const nameParts = name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Create pre-filled booking widget URL
  const createBookingUrl = () => {
    const baseUrl = 'https://link.wattleads.com/widget/booking/ZvHsKSU1VayvObZkyBHA';
    const params = new URLSearchParams();
    
    // Try multiple parameter name variations to ensure compatibility
    // GoHighLevel booking widget only supports name and email pre-filling
    if (firstName) {
      params.append('first_name', firstName);
    }
    if (lastName) {
      params.append('last_name', lastName);
    }
    if (email) {
      params.append('email', email);
    }
    // Note: Phone pre-filling is not supported by GoHighLevel booking widgets
    
    // Add the full name as well
    if (name) {
      params.append('name', name);
    }
    
    // Add quiz data as additional info
    const services = searchParams.get('services') || '';
    const monthlyProjects = searchParams.get('monthlyProjects') || '';
    const avgProjectValue = searchParams.get('avgProjectValue') || '';
    
    if (services || monthlyProjects || avgProjectValue) {
      const additionalInfo = `Quiz Results: Services: ${services.replace(/,/g, ', ')}, Monthly Projects: ${monthlyProjects}, Avg Project Value: ${avgProjectValue}`;
      params.append('additional_info', additionalInfo);
      params.append('notes', additionalInfo);
      params.append('message', additionalInfo);
      params.append('comments', additionalInfo);
    }
    
    const finalUrl = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    console.log('📅 Pre-filled booking URL:', finalUrl);
    console.log('📋 User data:', { firstName, lastName, email, phone, name });
    console.log('📞 Phone formatting attempts:', { 
      original: phone, 
      clean: phone.replace(/\D/g, ''), 
      formatted: phone.replace(/\D/g, '').length === 10 ? `+1${phone.replace(/\D/g, '')}` : phone 
    });
    
    return finalUrl;
  };
  
  const handleBookingComplete = async (bookingData: any) => {
    try {
      // Update lead in GoHighLevel with booking information
      const utmParams = goHighLevelService.getUTMParams();
      
      const leadData = {
        name: name,
        email: email,
        phone: phone,
        services: searchParams.get("services")?.split(",") || [],
        monthlyProjects: searchParams.get("monthlyProjects") || "",
        avgProjectValue: searchParams.get("avgProjectValue") || "",
        marketingSpend: searchParams.get("marketingSpend") || "",
        source: "WattLeads Smart Home Funnel",
        ...utmParams
      };
      
      const result = await goHighLevelService.submitLead(leadData);
      
      if (result.success) {
        console.log("Booking submitted to GoHighLevel successfully:", result.contactId);
        
        // Track booking event
        if (typeof window !== "undefined" && (window as any).fbq) {
          (window as any).fbq("track", "Purchase", {
            content_name: "Strategy Call Booking",
            content_category: "Lead Generation",
            value: 1
          });
        }
        
        // Navigate to confirmation
        navigate("/confirmation");
      } else {
        console.error("Failed to submit booking to GoHighLevel:", result.error);
        // Still navigate to confirmation even if CRM submission fails
        navigate("/confirmation");
      }
    } catch (error) {
      console.error("Error submitting booking to GoHighLevel:", error);
      // Still navigate to confirmation even if CRM submission fails
      navigate("/confirmation");
    }
  };
  // Remove duplicate declarations - these are already declared above
  // const [searchParams] = useSearchParams();
  // const name = searchParams.get('name') || '';

  const testimonials = [
    {
      quote: "WattLeads' strategy call changed everything. We went from 5 leads/month to 25 qualified prospects.",
      author: "Marcus T., Smart Home Pro"
    },
    {
      quote: "The ROI projections were spot-on. We're now booking $150k+ monthly from their lead system.",
      author: "Jennifer K., Automation Expert"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ProgressBar currentStep={3} totalSteps={4} stepLabel="Book Your Call" />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Call Value & Testimonials */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-heading font-semibold mb-6 text-rich-black">
                Book Your Free Strategy Call
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Get a custom lead generation blueprint designed specifically for your smart home company and growth goals.
              </p>
            </div>

            {/* Call Value Points */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Business Assessment & Growth Plan</h3>
                  <p className="text-muted-foreground">We'll analyze your current marketing, identify gaps, and create a custom lead generation strategy that fits your business model and growth targets.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Meta Ads Strategy & Budget Optimization</h3>
                  <p className="text-muted-foreground">Get a clear roadmap for profitable Meta ads campaigns, including audience targeting, budget allocation, and conversion optimization specifically for smart home companies.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">ROI Projections & Implementation Timeline</h3>
                  <p className="text-muted-foreground">Understand exactly what results to expect, when to expect them, and how our AI qualification system will transform your sales process.</p>
                </div>
              </div>
            </div>

            {/* Mini Testimonials */}
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="card-rounded bg-muted/30">
                  <p className="text-sm italic mb-3">"{testimonial.quote}"</p>
                  <p className="font-semibold text-sm">— {testimonial.author}</p>
                </div>
              ))}
            </div>

            {/* Badges */}
            <div className="flex gap-6 items-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-2">
                  <span className="font-bold text-sm">Meta</span>
                </div>
                <p className="text-xs text-muted-foreground">Certified</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-2">
                  <span className="font-bold text-sm">AI</span>
                </div>
                <p className="text-xs text-muted-foreground">Expert</p>
              </div>
            </div>
          </div>

          {/* Right Column - GoHighLevel Booking Widget */}
          <div className="space-y-6">
            <div className="card-rounded">
              <h2 className="text-2xl font-heading font-semibold mb-6 text-center">
                Choose Your Preferred Time
              </h2>
              
              {/* GoHighLevel Booking Widget */}
              <div className="min-h-[600px] w-full">
                <iframe
                  src={createBookingUrl()}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title="Schedule a meeting"
                  className="rounded-lg w-full"
                  style={{ minHeight: '600px' }}
                />
              </div>
            </div>

            {/* Help Text */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>Need another time? Email info@wattleads.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;