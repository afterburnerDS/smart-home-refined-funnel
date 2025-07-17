import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { Badge, CheckCircle, Star, ArrowRight } from "lucide-react";

const QuizResults = () => {
  const [searchParams] = useSearchParams();
  const [isQualified, setIsQualified] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    const services = searchParams.get('services')?.split(',') || [];
    const budget = searchParams.get('budget') || '';
    const timeline = searchParams.get('timeline') || '';

    setSelectedServices(services);

    // Qualification logic: Budget >= $25k AND Timeline = Immediate
    const qualifies = (budget === '$25k-$50k' || budget === '$50k+') && timeline === 'Immediately';
    setIsQualified(qualifies);
  }, [searchParams]);

  const servicesBenefits = {
    "Whole-Home Automation & Voice Control": [
      "Control lights, climate, and entertainment with voice commands",
      "Create custom scenes like 'Movie Night' or 'Good Morning'",
      "Automated schedules that learn your routine"
    ],
    "Lighting & Shading Scenes": [
      "Circadian rhythm lighting for better sleep",
      "Automated shades that adjust to sun position",
      "Energy savings up to 30% on utility bills"
    ],
    "Security & Cameras": [
      "AI-powered threat detection and alerts",
      "Professional monitoring integration",
      "Smart locks with biometric access"
    ],
    "Home Cinema / Media Room": [
      "Theater-quality audio and video",
      "One-touch entertainment experiences",
      "Immersive lighting that syncs with content"
    ],
    "Enterprise-Grade Networking": [
      "Blazing fast WiFi in every corner",
      "Dedicated IoT network for security",
      "99.9% uptime guarantee"
    ]
  };

  const name = searchParams.get('name') || '';
  const homeSize = searchParams.get('homeSize') || '';
  const budget = searchParams.get('budget') || '';
  const timeline = searchParams.get('timeline') || '';

  const bookingParams = new URLSearchParams(searchParams);

  return (
    <div className="min-h-screen bg-background">
      <ProgressBar currentStep={2} totalSteps={4} stepLabel="Your Results" />
      
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
              ? "Your home is perfect for our luxury smart integration package. Let's get you set up with a discovery call."
              : "We can definitely help transform your home. Here's what we recommend based on your preferences."
            }
          </p>
        </div>

        {/* Summary Card */}
        <div className="card-rounded mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <h2 className="text-2xl font-heading font-semibold mb-6 text-rich-black">
            Your Smart Home Profile
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Home Size</p>
              <p className="font-semibold">{homeSize}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Timeline</p>
              <p className="font-semibold">{timeline}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Budget Range</p>
              <p className="font-semibold">{budget}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Selected Services</p>
              <p className="font-semibold">{selectedServices.length} services</p>
            </div>
          </div>
        </div>

        {/* Selected Services Benefits */}
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl font-heading font-semibold text-rich-black">
            What You'll Get
          </h2>
          
          {selectedServices.map((service, index) => {
            const benefits = servicesBenefits[service as keyof typeof servicesBenefits] || [];
            return (
              <div key={index} className="card-rounded">
                <h3 className="text-xl font-semibold mb-4 text-rich-black">
                  {service}
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

        {/* CTA Section */}
        <div className="card-rounded bg-rich-black text-white text-center">
          <h2 className="text-3xl font-heading font-semibold mb-4">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Book your free discovery call and get a custom smart home blueprint designed for your space.
          </p>
          
          <div className="flex justify-center">
            <Link 
              to={`/booking?${bookingParams.toString()}`}
              className="btn-orange inline-flex items-center gap-2 text-lg"
            >
              Book Your Free Discovery Call
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="mt-6 flex justify-center gap-8 text-sm text-gray-400">
            <span>✓ No obligation</span>
            <span>✓ 30-minute consultation</span>
            <span>✓ Custom recommendations</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;