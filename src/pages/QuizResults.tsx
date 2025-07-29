import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Badge, CheckCircle, Star, Calendar, Clock, Mail } from "lucide-react";

const QuizResults = () => {
  const [searchParams] = useSearchParams();
  const [isQualified, setIsQualified] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const hasFired = useRef(false);

  useEffect(() => {
    const services = searchParams.get('services')?.split(',') || [];
    const avgProjectValue = searchParams.get('avgProjectValue') || '';
    const marketingSpend = searchParams.get('marketingSpend') || '';

    setSelectedServices(services);

    // Qualification logic: Avg Project Value >= $25k AND Marketing Spend >= $2k
    const qualifies = (avgProjectValue === '$25k-$50k' || avgProjectValue === '$50k+') && 
                     (marketingSpend === '$2k-$5k' || marketingSpend === '$5k-$10k' || marketingSpend === '$10k+');
    setIsQualified(qualifies);

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

  const name = searchParams.get('name') || '';
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
            Great News, {name}!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4">
            {isQualified 
              ? "Your company is perfect for our premium lead generation system. Let's get you set up with qualified $25k+ prospects immediately."
              : "We can definitely help grow your smart home business. Here's what our lead generation system can do for your company."
            }
          </p>
        </div>
      </div>

      {/* Calendar Booking Section - Compact Above the Fold */}
      <div className="w-full py-8 px-8 bg-white">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4 text-rich-black">
            Book Your Free Strategy Call
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Get a custom lead generation blueprint designed specifically for your smart home company.
          </p>
        </div>
        
        {/* Calendar Embed - Compact */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-xl font-heading font-semibold mb-6 text-center">
              Choose Your Preferred Time
            </h3>
            {/* Calendly Embed - Smaller */}
            <div className="min-h-[500px]">
              <iframe
                src="https://calendly.com/sagebyte/15minphone"
                width="100%"
                height="500"
                frameBorder="0"
                title="Schedule a meeting"
                className="rounded-lg"
              />
            </div>
          </div>
          
          {/* Help Text */}
          <div className="text-center mt-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>Need another time? Email info@wattleads.com</span>
            </div>
          </div>
        </div>
        
        {/* Call Value Points - Compact Three Columns */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="text-center lg:text-left">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Business Assessment & Growth Plan</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">We'll analyze your current marketing, identify gaps, and create a custom lead generation strategy that fits your business model and growth targets.</p>
          </div>
          <div className="text-center lg:text-left">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Meta Ads Strategy & Budget Optimization</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">Get a clear roadmap for profitable Meta ads campaigns, including audience targeting, budget allocation, and conversion optimization specifically for smart home companies.</p>
          </div>
          <div className="text-center lg:text-left">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-lg mb-2">ROI Projections & Implementation Timeline</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">Understand exactly what results to expect, when to expect them, and how our AI qualification system will transform your sales process.</p>
          </div>
        </div>
        
        {/* Testimonials Grid - Compact */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-muted/30 p-6 rounded-xl">
            <p className="text-base italic mb-4 leading-relaxed">"WattLeads' strategy call changed everything. We went from 5 leads/month to 25 qualified prospects."</p>
            <p className="font-semibold text-sm">— Marcus T., Smart Home Pro</p>
          </div>
          <div className="bg-muted/30 p-6 rounded-xl">
            <p className="text-base italic mb-4 leading-relaxed">"The ROI projections were spot-on. We're now booking $150k+ monthly from their lead system."</p>
            <p className="font-semibold text-sm">— Jennifer K., Automation Expert</p>
          </div>
        </div>
        
        {/* Certification Badges - Compact */}
        <div className="flex gap-8 items-center justify-center">
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

      {/* Business Profile Section - Full Width */}
      <div className="w-full py-20 px-8 bg-muted/30">
        <h2 className="text-5xl font-heading font-semibold mb-16 text-rich-black text-center">
          Your Business Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-8 bg-white rounded-2xl">
            <p className="text-lg text-muted-foreground mb-3">Monthly Projects</p>
            <p className="text-3xl font-bold text-primary">{monthlyProjects}</p>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl">
            <p className="text-lg text-muted-foreground mb-3">Avg Project Value</p>
            <p className="text-3xl font-bold text-primary">{avgProjectValue}</p>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl">
            <p className="text-lg text-muted-foreground mb-3">Marketing Spend</p>
            <p className="text-3xl font-bold text-primary">{marketingSpend}</p>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl">
            <p className="text-lg text-muted-foreground mb-3">Service Categories</p>
            <p className="text-3xl font-bold text-primary">{selectedServices.length} specialties</p>
          </div>
        </div>
      </div>

      {/* How WattLeads Helps Section - Full Width */}
      <div className="w-full py-20 px-8 bg-white">
        <h2 className="text-5xl font-heading font-semibold text-rich-black text-center mb-20">
          How WattLeads Helps Your Business
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {selectedServices.map((service, index) => {
            const benefits = servicesBenefits[service as keyof typeof servicesBenefits] || [];
            return (
              <div key={index} className="bg-muted/30 p-8 rounded-2xl">
                <h3 className="text-3xl font-semibold mb-8 text-rich-black">
                  {service} Lead Generation
                </h3>
                <div className="space-y-6">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <CheckCircle className="w-7 h-7 text-green-500 flex-shrink-0 mt-1" />
                      <p className="text-muted-foreground text-xl leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizResults;