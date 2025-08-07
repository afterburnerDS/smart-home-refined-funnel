import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Badge, CheckCircle, Star, Calendar, Clock, Mail } from "lucide-react";

const QuizResults = () => {
  const [searchParams] = useSearchParams();
  const [isQualified, setIsQualified] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const hasFired = useRef(false);
  const [bookingUrl, setBookingUrl] = useState<string>('');


  // Extract personal data from URL parameters
  const userName = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';

  // Split name into first and last name
  const nameParts = userName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Create pre-filled booking widget URL
  const createBookingUrl = () => {
    const baseUrl = 'https://link.wattleads.com/widget/booking/ZvHsKSU1VayvObZkyBHA';
    const params = new URLSearchParams();
    

    
    // Try different parameter name variations for GoHighLevel
    if (firstName) {
      params.append('first_name', firstName);
      params.append('fname', firstName);
    }
    if (lastName) {
      params.append('last_name', lastName);
      params.append('lname', lastName);
    }
    if (email) {
      params.append('email', email);
    }
    if (phone) {
      // Include phone parameter (GoHighLevel booking widget ignores it but we keep trying)
      const cleanPhone = phone.replace(/\D/g, ''); // Remove all non-digits
      params.append('phone', cleanPhone);
    }
    
    // Keep it minimal - only add name if needed
    if (userName) {
      params.append('name', userName);
    }
    
    // Try both query params and hash params
    const queryUrl = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    
    // Skip hash parameters for now, keep it simple
    const finalUrl = queryUrl;
    

    
    return finalUrl;
  };



  useEffect(() => {
    const services = searchParams.get('services')?.split(',') || [];
    const avgProjectValue = searchParams.get('avgProjectValue') || '';
    const marketingSpend = searchParams.get('marketingSpend') || '';

    setSelectedServices(services);

    // Qualification logic: Avg Project Value >= $25k AND Marketing Spend >= $2k
    const qualifies = (avgProjectValue === '$25k-$50k' || avgProjectValue === '$50k+') && 
                     (marketingSpend === '$2k-$5k' || marketingSpend === '$5k-$10k' || marketingSpend === '$10k+');
    setIsQualified(qualifies);

    // Set booking URL after we have all the data
    if (phone || email || userName) {
      const url = createBookingUrl();
      setBookingUrl(url);
    }

    // Track Lead event only once when user lands on results page
    if (!hasFired.current && typeof window !== 'undefined' && (window as any).fbq) {
      console.log('Firing Lead event on results page...');
      (window as any).fbq('track', 'Lead', {
        content_name: 'Quiz Results',
        content_category: 'Lead Generation',
        value: 1
      });
      console.log('Lead event fired on results page');
      hasFired.current = true;
    }

    // Scroll to top of page when component mounts
    window.scrollTo(0, 0);
  }, [searchParams]);

  const servicesBenefits = {
    "Whole-Home Automation & Voice Control": [
      "Target high-end clients who invest $30k+ in automation systems",
      "Position yourself as premium installer in luxury market",
      "Higher profit margins on complex integration projects"
    ],
    "Lighting & Shading Scenes": [
      "Upsell opportunities with architectural lighting design",
      "Recurring revenue from scene customization services", 
      "Differentiate from basic smart switch installers"
    ],
    "Security & Cameras": [
      "High-ticket commercial and residential security projects",
      "Monthly monitoring revenue streams",
      "Integration with luxury home automation systems"
    ],
    "Home Cinema / Media Room": [
      "Premium theater installations starting at $50k+",
      "Celebrity and executive clientele referrals",
      "Showcase projects that attract media attention"
    ],
    "Enterprise-Grade Networking": [
      "Commercial building contracts worth $100k+",
      "Ongoing support and maintenance revenue",
      "Foundation for all other smart building systems"
    ]
  };

  // Get quiz data for display
  const monthlyProjects = searchParams.get('monthlyProjects') || '';
  const avgProjectValue = searchParams.get('avgProjectValue') || '';
  const marketingSpend = searchParams.get('marketingSpend') || '';

  return (
    <div className="min-h-screen bg-background">
      {/* Results Header Section - Compact */}
      <div className="w-full bg-gradient-to-r from-primary/5 to-accent/5 py-8 px-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            {isQualified ? (
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-2 rounded-full">
                <Badge className="w-4 h-4" />
                <span className="font-semibold text-sm">Perfect Fit</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-2 rounded-full">
                <Star className="w-4 h-4" />
                <span className="font-semibold text-sm">Good Candidate</span>
              </div>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-heading font-semibold mb-4 text-rich-black">
            Schedule Your Consultation, {userName}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4">
            {isQualified 
              ? "Your company is perfect for our premium lead generation system. Let's get you set up with qualified $25k+ prospects immediately."
              : ""
            }
          </p>
        </div>
      </div>

      {/* Calendar Booking Section - Compact Above the Fold */}
      <div className="w-full py-8 px-8 bg-white">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4 text-rich-black">
            Schedule Your Consultation
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Let's discuss how we can scale your smart home business with qualified leads.
          </p>
        </div>
        


        {/* Calendar Embed - Compact */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-xl font-heading font-semibold mb-6 text-center">
              Choose Your Preferred Time
            </h3>
            {/* GoHighLevel Booking Widget */}
            <div className="min-h-[600px] w-full">
                                   {bookingUrl ? (
                <iframe
                  key={`booking-${phone}-${email}-${firstName}-${lastName}`} // Force remount when data changes
                  src={bookingUrl}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title="Schedule a meeting"
                  className="rounded-lg w-full"
                  style={{ minHeight: '600px' }}
                  onLoad={() => {
                    // Iframe loaded successfully with pre-filled name and email
                    // Note: Phone pre-filling is not supported by GoHighLevel booking widgets
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-[600px] bg-gray-100 rounded-lg">
                  <div className="text-gray-500">Loading booking calendar...</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;