import { useEffect } from "react";
import { CheckCircle, Play, FileText, Camera, Wifi, Mail } from "lucide-react";

const Confirmation = () => {
  useEffect(() => {
    // Fire conversion event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'lead_complete');
    }
    
    // Custom event for analytics
    window.dispatchEvent(new CustomEvent('lead_complete', {
      detail: { page: 'confirmation', timestamp: Date.now() }
    }));
  }, []);

  const checklist = [
    {
      icon: FileText,
      title: "Floor Plan PDF",
      description: "Upload or sketch your home's layout for accurate planning"
    },
    {
      icon: Camera,
      title: "Inspiration Photos",
      description: "Screenshots of smart home setups you love"
    },
    {
      icon: Wifi,
      title: "Speed Test Screenshot",
      description: "Run a speed test and save the results (speedtest.net)"
    }
  ];

  const handleShareEmail = () => {
    const subject = "Our Smart Home Discovery Call is Scheduled";
    const body = `Hi there!

I've scheduled a discovery call with WattLeads to explore smart home integration for our house. 

The call will help us understand:
• What's possible with our current home
• Which smart systems would add the most value
• Investment requirements and timeline

Thought you'd want to know about this exciting next step!

Best regards`;

    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = emailUrl;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-heading font-semibold mb-4 text-rich-black">
            You're Booked!
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Check your email for calendar details and meeting preparation info.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Prep Video */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4 text-rich-black">
                Quick Prep Video
              </h2>
              <p className="text-muted-foreground mb-6">
                Watch this 90-second video to get the most out of your discovery call.
              </p>
            </div>

            <div className="relative aspect-video bg-rich-black rounded-2xl overflow-hidden">
              <div className="flex items-center justify-center h-full cursor-pointer group">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-full text-sm text-white">
                  1:30 prep guide
                </div>
              </div>
            </div>

            <div className="card-rounded bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">What We'll Cover</h3>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Your home's smart potential assessment</li>
                <li>• Technology recommendations for your lifestyle</li>
                <li>• Timeline and investment discussion</li>
                <li>• Next steps if it's a good fit</li>
              </ul>
            </div>
          </div>

          {/* Preparation Checklist */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4 text-rich-black">
                How to Prepare
              </h2>
              <p className="text-muted-foreground mb-6">
                Having these items ready will help us give you the most accurate recommendations.
              </p>
            </div>

            <div className="space-y-4">
              {checklist.map((item, index) => (
                <div key={index} className="card-rounded hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Share with Spouse */}
            <div className="card-rounded bg-primary/5 border-primary/20">
              <h3 className="font-semibold mb-3">Keep Your Partner in the Loop</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Smart home decisions affect the whole family. Share the details with your spouse or partner.
              </p>
              
              <button
                onClick={handleShareEmail}
                className="btn-outline inline-flex items-center gap-2 text-sm"
              >
                <Mail className="w-4 h-4" />
                Share via Email
              </button>
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-16 card-rounded bg-rich-black text-white">
          <h2 className="text-2xl font-heading font-semibold mb-4">
            Thank You for Choosing WattLeads
          </h2>
          <p className="text-gray-300 mb-6">
            We're excited to help you create the smart home of your dreams. Our team will review your quiz answers before the call to provide the most relevant recommendations.
          </p>
          
          <div className="flex justify-center gap-8 text-sm text-gray-400">
            <span>✓ CEDIA Certified Integrators</span>
            <span>✓ 50+ Homes Transformed</span>
            <span>✓ 30-Day Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;