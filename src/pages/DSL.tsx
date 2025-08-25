import { useEffect, useState, useRef } from "react";
import { Star, ArrowRight, CheckCircle } from "lucide-react";

const DSL = () => {
  const [bookingUrl, setBookingUrl] = useState<string>('');

  // Create pre-filled booking widget URL
  const createBookingUrl = () => {
    const baseUrl = 'https://link.wattleads.com/widget/booking/ZvHsKSU1VayvObZkyBHA';
    return baseUrl;
  };

  useEffect(() => {
    // Set booking URL
    const url = createBookingUrl();
    setBookingUrl(url);
    console.log('DSL page loaded, booking URL set:', url);

    // Load the form embed script
    const script = document.createElement('script');
    script.src = 'https://link.wattleads.com/js/form_embed.js';
    script.type = 'text/javascript';
    document.head.appendChild(script);

    // Scroll to top of page when component mounts
    window.scrollTo(0, 0);
    
    return () => {
      // Cleanup script when component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 max-w-4xl py-8 md:py-20">
        {/* 1. WattLeads Logo */}
        <div className="text-center mb-3 md:mb-6">
          <div className="inline-block">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              WattLeads
            </h1>
          </div>
        </div>

        {/* 1. Trust Indicators */}
        <div className="text-center mb-4 md:mb-6">
          <div className="flex justify-center items-center gap-1 mb-2">
            <span className="text-yellow-400 text-lg md:text-xl">⭐</span>
            <span className="text-yellow-400 text-lg md:text-xl">⭐</span>
            <span className="text-yellow-400 text-lg md:text-xl">⭐</span>
            <span className="text-yellow-400 text-lg md:text-xl">⭐</span>
            <span className="text-yellow-400 text-lg md:text-xl">⭐</span>
          </div>
          <p className="text-white text-sm md:text-base font-medium mb-2">
            Rated 4.8/5 by 100+ Clients
          </p>
        </div>

        {/* 2. Main Headline */}
        <div className="text-center mb-4 md:mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-white text-center">
            <span className="text-red-500 font-bold text-2xl md:text-4xl">Get 15+ Pre-Qualified Electrical Premium Estimate Requests Every Month</span>
          </h2>
        </div>

        {/* 4. Google Slides */}
        <div className="text-center mb-4">
          <p className="text-white text-lg md:text-xl font-medium mb-6">
            Click Through All The Slides Below To See Exactly How Our Offer Works
          </p>
        </div>

        <div className="mb-8 md:mb-12">
          <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <div className="aspect-video w-full h-full">
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe 
                  src="https://docs.google.com/presentation/d/e/2PACX-1vQLMwVz_E2HRG3q1qwQLms4lY1kzVKJ0u7pG2ruNAFFvW8os4dEuylMtBx-l_A5H4SPWYC1R-ddz-ro/embed?start=false&loop=false&delayms=3000&showControls=true" 
                  frameBorder="0" 
                  allowFullScreen={true}
                  title="WattLeads Presentation"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Bar */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-row items-center justify-center gap-2 md:gap-8 text-center">
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-4 h-4 md:w-6 md:h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-2.5 h-2.5 md:w-4 md:h-4 text-white" />
              </div>
              <span className="text-white font-bold text-[10px] md:text-base whitespace-nowrap">Qualified leads only</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-4 h-4 md:w-6 md:h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-2.5 h-2.5 md:w-4 md:h-4 text-white" />
              </div>
              <span className="text-white font-bold text-[10px] md:text-base whitespace-nowrap">Zero setup fees</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-4 h-4 md:w-6 md:h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-2.5 h-2.5 md:w-4 md:h-4 text-white" />
              </div>
              <span className="text-white font-bold text-[10px] md:text-base whitespace-nowrap">30 day test drive</span>
            </div>
          </div>
        </div>

        {/* 5. Call-to-Action Button */}
        <div className="text-center mb-8 md:mb-16">
          <button 
            onClick={() => document.getElementById('calendar-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center gap-2 text-sm md:text-xl shadow-lg"
          >
            👉 START YOUR 30-DAY TEST DRIVE!
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Calendar Section - Right below the slides */}
        <div id="calendar-section" className="mb-16">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-semibold mb-4 text-black">
                Schedule A Call With Us Here!
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Let's discuss how we can scale your electrical business with qualified leads.
              </p>
              <div className="text-center mb-6">
                <p className="text-lg text-gray-700 mb-4">
                  We'll deploy our custom-built Electrical AI system into your business and guarantee you 45 new estimates in the first 90 days.
                </p>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-2 rounded-full mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">30-Minute Free Call</span>
                </div>
              </div>
            </div>
            
            {/* GoHighLevel Booking Widget - 30 Minute Discovery */}
            <div className="min-h-[600px] w-full">
              <iframe
                src="https://link.wattleads.com/widget/otl/V8vnftjM8?slug=company123/discovery-05e8dcf4-611c-4619-aba2-ea0549d65643"
                width="100%"
                height="600"
                frameBorder="0"
                title="Schedule a meeting"
                className="rounded-lg w-full"
                style={{ minHeight: '600px' }}
              ></iframe>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-600">
          <p className="text-lg font-semibold text-white mb-2">WattLeads © 2025</p>
          <div className="flex justify-center gap-4 text-sm text-white">
            <a href="/privacy-policy" className="hover:text-orange-400">Privacy Policy</a>
            <span>|</span>
            <a href="/terms-conditions" className="hover:text-orange-400">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSL;
