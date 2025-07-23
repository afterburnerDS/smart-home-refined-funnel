import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Badge, CheckCircle, Star, ArrowRight, Calendar, Clock, Mail } from "lucide-react";

const QuizResults = () => {
  const [searchParams] = useSearchParams();
  const [isQualified, setIsQualified] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    const services = searchParams.get('services')?.split(',') || [];
    const avgProjectValue = searchParams.get('avgProjectValue') || '';
    const marketingSpend = searchParams.get('marketingSpend') || '';

    setSelectedServices(services);

    // Qualification logic: Avg Project Value >= $25k AND Marketing Spend >= $2k
    const qualifies = (avgProjectValue === '$25k-$50k' || avgProjectValue === '$50k+') && 
                     (marketingSpend === '$2k-$5k' || marketingSpend === '$5k-$10k' || marketingSpend === '$10k+');
    setIsQualified(qualifies);
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

  const bookingParams = new URLSearchParams(searchParams);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Results Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            {isQualified ? (
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full">
                <Badge className="w-5 h-5" />
                <span className="font-semibold">Perfect Fit</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full">
                <Star className="w-5 h-5" />
                <span className="font-semibold">Good Candidate</span>
              </div>
            )}
          </div>

          <h1 className="text-4xl font-heading font-semibold mb-4 text-rich-black">
            Great News, {name}!
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {isQualified 
              ? "Your company is perfect for our premium lead generation system. Let's get you set up with qualified $25k+ prospects immediately."
              : "We can definitely help grow your smart home business. Here's what our lead generation system can do for your company."
            }
          </p>
        </div>

        {/* Summary Card */}
        <div className="card-rounded mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <h2 className="text-2xl font-heading font-semibold mb-6 text-rich-black">
            Your Business Profile
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Monthly Projects</p>
              <p className="font-semibold">{monthlyProjects}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg Project Value</p>
              <p className="font-semibold">{avgProjectValue}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Marketing Spend</p>
              <p className="font-semibold">{marketingSpend}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Service Categories</p>
              <p className="font-semibold">{selectedServices.length} specialties</p>
            </div>
          </div>
        </div>

        {/* Selected Services Benefits */}
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl font-heading font-semibold text-rich-black">
            How WattLeads Helps Your Business
          </h2>
          
          {selectedServices.map((service, index) => {
            const benefits = servicesBenefits[service as keyof typeof servicesBenefits] || [];
            return (
              <div key={index} className="card-rounded">
                <h3 className="text-xl font-semibold mb-4 text-rich-black">
                  {service} Lead Generation
                </h3>
                <div className="space-y-3">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Booking Section (from Booking page) */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-heading font-semibold mb-6 text-rich-black">
              Book Your Free Strategy Call
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get a custom lead generation blueprint designed specifically for your smart home company and growth goals.
            </p>
          </div>
          
          {/* Calendar Embed */}
          <div className="card-rounded">
            <h2 className="text-2xl font-heading font-semibold mb-6 text-center">
              Choose Your Preferred Time
            </h2>
            {/* Calendly Embed */}
            <div className="min-h-[600px]">
              <iframe
                src="https://calendly.com/sagebyte/15minphone"
                width="100%"
                height="600"
                frameBorder="0"
                title="Schedule a meeting"
              />
            </div>
          </div>
          
          {/* Help Text */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>Need another time? Email hello@wattleads.com</span>
            </div>
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
            <div className="card-rounded bg-muted/30">
              <p className="text-sm italic mb-3">"WattLeads' strategy call changed everything. We went from 5 leads/month to 25 qualified prospects."</p>
              <p className="font-semibold text-sm">— Marcus T., Smart Home Pro</p>
            </div>
            <div className="card-rounded bg-muted/30">
              <p className="text-sm italic mb-3">"The ROI projections were spot-on. We're now booking $150k+ monthly from their lead system."</p>
              <p className="font-semibold text-sm">— Jennifer K., Automation Expert</p>
            </div>
          </div>
          
          {/* Badges */}
          <div className="flex gap-6 items-center justify-center">
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
      </div>
    </div>
  );
};

export default QuizResults;