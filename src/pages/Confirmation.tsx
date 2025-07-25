import { useEffect } from "react";
import { CheckCircle, Phone, Clock, Mail, MessageSquare, Play } from "lucide-react";

const Confirmation = () => {
  useEffect(() => {
    // Track Schedule event when user lands on confirmation page
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Schedule');
    }
    
    // Custom event for analytics
    window.dispatchEvent(new CustomEvent('schedule_complete', {
      detail: { page: 'confirmation', timestamp: Date.now() }
    }));
  }, []);

  return (
    <div className="min-h-screen bg-rich-black">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* WattLeads Logo - Compact */}
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            WattLeads
          </h1>
        </div>

        {/* Main Confirmation Message - Compact */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4 italic">
            Thanks! Your call is confirmed!
          </h2>
          
          <div className="mb-4 max-w-2xl mx-auto">
            <h3 className="text-lg md:text-xl font-heading font-black mb-3 text-white">
              Last Step! ✅ Confirm the meeting!
            </h3>
            
            <div className="space-y-3 text-sm md:text-base text-white">
              <p className="font-semibold">
                We've blocked out the time you selected, and we will be calling on the number you provided!
              </p>
              
              <p>
                All you need to do now is confirm the meeting (check your email shortly)!
              </p>
              
              <p>
                Just try to be in a quiet spot, phone in hand ready to go at the time and date you selected!
              </p>
            </div>
          </div>

          {/* Video Section - Compact Above the Fold */}
          <div className="mb-4 max-w-2xl mx-auto">
            <div className="mb-3">
              <h4 className="text-lg md:text-xl font-heading font-semibold text-white mb-1">
                Watch This Quick Video
              </h4>
              <p className="text-sm text-gray-300">
                See how we've helped electrical companies scale with qualified leads
              </p>
            </div>
            
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-xl">
              <div className="flex items-center justify-center h-full cursor-pointer group">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                </div>
                <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                  2:30 success stories
                </div>
                <div className="absolute top-2 right-2 bg-primary/20 px-2 py-1 rounded text-xs text-white border border-primary/30">
                  🔥 Case Studies
                </div>
              </div>
            </div>
          </div>

          {/* You will be talking with me section */}
          <div className="mb-6 max-w-3xl mx-auto">
            <h4 className="text-xl md:text-2xl font-heading font-semibold text-white mb-6 text-center">
              You will be talking with me: <span className="text-primary">Daniel Silva</span>
            </h4>
            
            <div className="grid md:grid-cols-2 gap-6 items-center">
              {/* Daniel's Photo */}
              <div className="order-2 md:order-1">
                <div className="relative aspect-square max-w-xs mx-auto">
                  <img 
                    src="/daniel-silva.jpg" 
                    alt="Daniel Silva - WattLeads Founder"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                      e.currentTarget.className = "w-full h-full object-contain rounded-lg shadow-lg bg-gray-800 p-8";
                    }}
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" fill="currentColor" />
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="order-1 md:order-2 text-left">
                <p className="text-white mb-4 leading-relaxed">
                  As an <strong>electrical engineer</strong> turned digital marketer, I've developed a proprietary system that consistently <strong>generates high-quality leads</strong> without cold calling, networking, or SEO.
                </p>
                
                <p className="text-white leading-relaxed">
                  Let me walk you through how we can transform your business <strong>with predictable, qualified leads.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Additional Instructions - Compact */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h4 className="text-lg font-semibold text-white">Need to Reschedule?</h4>
            </div>
            <p className="text-sm text-white">
              If you need to reschedule, or you think you may have provided the wrong phone number, just reply to the text we've just sent you!
            </p>
          </div>
        </div>

        {/* What We Do Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-heading font-black mb-6 text-center text-white">
            How WattLeads Will Transform Your Electrical Business
          </h3>
          
          <div className="space-y-4 text-lg text-white">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <span>We use proven META strategies to target <strong>luxury homeowners</strong> within your <strong>target radius</strong>.</span>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <span>We implement <strong>consultation offers</strong> that guarantees your first meeting with these clients.</span>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <span>We use our <strong>pre-trained A.I. assistant</strong> to ensure that EVERY SINGLE lead that gets in touch is <strong>immediately followed up with</strong> and has all their questions answered.</span>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <span>We <strong>schedule phone appointments</strong> with potential clients, so that you know when and what time you will be speaking to them (no time wasted).</span>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <span>We deliver a <strong>guaranteed volume of leads</strong> which will at a MINIMUM cover initial investment</span>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <span>We offer a <strong>30 day test drive</strong> so that you can try it for yourself without committing long term.</span>
            </div>
          </div>
        </div>

        {/* Call Preparation */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="w-6 h-6 text-primary" />
              <h4 className="text-xl font-semibold text-white">During Your Call</h4>
            </div>
            <ul className="space-y-2 text-white">
              <li>• Business assessment & growth planning</li>
              <li>• Meta ads strategy discussion</li>
              <li>• ROI projections for your market</li>
              <li>• Custom lead generation blueprint</li>
            </ul>
          </div>
          
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-primary" />
              <h4 className="text-xl font-semibold text-white">What to Expect</h4>
            </div>
            <ul className="space-y-2 text-white">
              <li>• 15-30 minute strategy session</li>
              <li>• No pressure, just valuable insights</li>
              <li>• Clear next steps if it's a fit</li>
              <li>• Immediate action items you can implement</li>
            </ul>
          </div>
        </div>

        {/* Final Thank You */}
        <div className="text-center">
          <h3 className="text-3xl font-heading font-bold text-white mb-4 italic">
            Thanks! Your call is confirmed!
          </h3>
          <p className="text-lg text-gray-300 mb-8">
            We're excited to help you scale your electrical business with qualified $25k+ leads!
          </p>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-700">
          <p className="text-lg font-semibold text-white mb-2">WattLeads © 2024</p>
          <div className="flex justify-center gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-primary">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;