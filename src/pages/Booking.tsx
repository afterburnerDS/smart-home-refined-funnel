import { useSearchParams } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { CheckCircle, Calendar, Clock, Mail } from "lucide-react";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || '';

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

          {/* Right Column - Calendly Embed */}
          <div className="space-y-6">
            <div className="card-rounded">
              <h2 className="text-2xl font-heading font-semibold mb-6 text-center">
                Choose Your Preferred Time
              </h2>
              
              {/* Calendly Placeholder */}
              <div className="bg-muted/30 rounded-lg p-8 text-center min-h-[500px] flex flex-col justify-center">
                <Calendar className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-4">Calendly Integration</h3>
                <p className="text-muted-foreground mb-6">
                  Interactive calendar with 15 & 30-minute slots will appear here
                </p>
                
                <div className="space-y-3 max-w-xs mx-auto">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>15-min Quick Consultation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>30-min In-Depth Discovery</span>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-primary font-medium">
                    🕐 Automatically detects your local timezone
                  </p>
                </div>
              </div>
            </div>

            {/* Help Text */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>Need another time? Email hello@wattleads.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;