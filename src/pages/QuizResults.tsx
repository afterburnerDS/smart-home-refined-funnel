import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Star, ArrowRight, Calendar, Clock, Mail, CheckCircle, Play, Check, Badge } from "lucide-react";

const QuizResults = () => {
  const [searchParams] = useSearchParams();
  const [bookingUrl, setBookingUrl] = useState<string>('');
  const hasFired = useRef(false);

  // Extract personal data from URL parameters
  const userName = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';

  console.log('QuizResults component loaded with params:', { userName, email, phone });

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
      const cleanPhone = phone.replace(/\D/g, '');
      params.append('phone', cleanPhone);
    }
    
    if (userName) {
      params.append('name', userName);
    }
    
    const queryUrl = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    return queryUrl;
  };

  useEffect(() => {
    console.log('QuizResults useEffect running');
    
    // Set booking URL after we have all the data
    if (phone || email || userName) {
      const url = createBookingUrl();
      setBookingUrl(url);
      console.log('Booking URL set:', url);
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

        {/* Stars and Rating - Below logo */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex justify-center items-center gap-1 mb-2">
            <span className="text-yellow-400 text-lg md:text-xl">⭐</span>
            <span className="text-yellow-400 text-lg md:text-xl">⭐</span>
            <span className="text-yellow-400 text-lg md:text-xl">⭐</span>
            <span className="text-yellow-400 text-lg md:text-xl">⭐</span>
            <span className="text-yellow-400 text-lg md:text-xl">⭐</span>
          </div>
          <p className="text-white text-sm md:text-base font-medium mb-4">
            Rated 4.8/5 by 100+ Clients
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-red-500">
            Get 15+ Pre-Qualified Electrical Premium Estimate Requests Every Month
          </h3>
        </div>

        {/* Video instruction */}
        <div className="text-center mb-4">
          <p className="text-lg md:text-3xl text-white">
            This Video reveals Exactly How We Do It For Over <span className="font-semibold text-orange-400">80+ Electrical and Smart Home Businesses</span> in under <span className="font-semibold text-orange-400">2 Minutes</span> With..
          </p>
        </div>

        {/* Benefits Bar - After video instruction */}
        <div className="mb-6 md:mb-8">
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

        {/* 4. VSL Video - Now visible since user completed form */}
        <div className="mb-6 md:mb-12">
          <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <div
              className="aspect-video w-full h-full"
              dangerouslySetInnerHTML={{
                __html: `<script src="https://fast.wistia.com/embed/medias/lrllcsxo0v.jsonp" async></script><script src="https://fast.wistia.com/embed/lrllcsxo0v.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_lrllcsxo0v videoFoam=true autoplay=true style="height:100%;position:relative;width:100%"><div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;"><img src="https://fast.wistia.com/embed/medias/lrllcsxo0v/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" /></div></div></div></div>`
              }}
            />
          </div>
        </div>





        {/* 5. Call-to-Action Button */}
        <div className="text-center mb-8 md:mb-16">
          <p className="text-white mb-3 md:mb-6 italic text-sm md:text-base">
            Get started in 30 seconds...
          </p>
          
          <button 
            onClick={() => document.getElementById('calendar-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center gap-2 text-sm md:text-xl shadow-lg"
          >
            👉 START YOUR 30-DAY TEST DRIVE!
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          
          <p className="text-white mt-3 md:mt-4 text-sm md:text-base">
            Receive 20+ test leads before you commit...
          </p>
          
          <p className="text-white mt-2 md:mt-3 text-xs md:text-sm italic">
            (We have generated over 10,000 qualified leads to electrical companies in the last 12 months)
          </p>
        </div>

        {/* Value Proposition */}
        <div className="mb-16">
          <p className="text-xl text-white mb-8 text-center">
            Add an <span className="font-semibold text-orange-400">extra $50-100,000</span> per month to your electrical or smart home business by targeting <span className="font-semibold text-orange-400">high-end luxury clients</span>...
          </p>
          
          <p className="text-lg text-white mb-8">
            Most electrical and smart home companies struggle with cash flow, low margins & difficult clients because they focus TOO much on basic installations.
          </p>
          
          <p className="text-lg text-white mb-8">
            Here at WattLeads we target luxury homeowners within your area, with targeted META ads, and proven offers.
          </p>
          
          <p className="text-lg text-white mb-8">
            We also pre-qualify every lead before it lands in your in-box, so that you aren't wasting time trying to call and schedule leads who never answer the phone.
          </p>
          
          <p className="text-lg text-white mb-8">
            Oh! And you can also try risk free for 30 days...
          </p>
        </div>

        {/* Benefits List */}
        <div className="mb-16">
          <ul className="space-y-4 text-lg text-white mb-8">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
              <span>Leads within 72-hours</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
              <span>No long-term commitment.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
              <span>Everything full custom branded.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
              <span>Trained A.I. assistant custom to your company.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
              <span>Easy to use lead tracker.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
              <span>+ much more!</span>
            </li>
          </ul>
          
          <p className="text-lg text-white mb-8">
            All you need to do to get started, is schedule in a FREE 15-minute intro call with us today.
          </p>
          
          <p className="text-lg text-white mb-8">
            It's 100% free, no strings attached, book in by clicking the link below...
          </p>
          
          <div className="text-center mb-8">
            <button 
              onClick={() => document.getElementById('calendar-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg inline-flex items-center gap-2 text-sm md:text-xl shadow-lg"
            >
              👉 START YOUR 30-DAY TEST DRIVE!
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-lg text-white text-center">
            Receive 20+ test leads before you commit...
          </p>
        </div>

        {/* Comparison Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center text-white">
            Why switch to WattLeads?
          </h3>
          
          <h4 className="text-2xl font-extrabold mb-6 text-center text-white">
            Us vs Other Marketing Agencies...
          </h4>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="border border-gray-600 bg-gray-800/50 p-6 rounded-lg">
              <h5 className="text-xl font-bold mb-4 text-white">Most agencies</h5>
              <ul className="space-y-3 text-white">
                <li>• 6 month contracts</li>
                <li>• Zero guarantees</li>
                <li>• Up front fees</li>
                <li>• Poor quality leads</li>
                <li>• 14-30 day setup</li>
                <li>• Non-responsive leads</li>
                <li>• Zero lead qualification</li>
              </ul>
            </div>
            
            <div className="border border-orange-400/30 bg-orange-400/10 p-6 rounded-lg">
              <h5 className="text-xl font-semibold mb-4 text-orange-400">WattLeads</h5>
              <ul className="space-y-3 text-white">
                <li>• Zero long term contract</li>
                <li>• Guaranteed leads or you don't pay</li>
                <li>• Zero setup fees</li>
                <li>• High quality, pre-verified leads</li>
                <li>• 0-3 day setup</li>
                <li>• Leads confirm at 90%</li>
                <li>• All leads pre-qualified</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Work Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center text-white">
            How we are able to HYPER TARGET the best luxury deals for your electrical or smart home company...
          </h3>
          
          <ul className="space-y-4 text-lg text-white mb-8">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
              <span>We use proven META strategies to target <strong>luxury homeowners</strong> within your <strong>target radius</strong>.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
              <span>We implement <strong>consultation offers</strong> that guarantees your first meeting with these clients.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
              <span>We use our <strong>pre-trained A.I. assistant</strong> to ensure that EVERY SINGLE lead that gets in touch is <strong>immediately followed up with</strong> and has all their questions answered.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
              <span>We <strong>schedule phone appointments</strong> with potential clients, so that you know when and what time you will be speaking to them (no time wasted).</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
              <span>We deliver a <strong>guaranteed volume of leads</strong> which will at a MINIMUM cover initial investment</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
              <span>We offer a <strong>30 day test drive</strong> so that you can try it for yourself without committing long term.</span>
            </li>
          </ul>
          
          <div className="text-center mb-8">
            <button 
              onClick={() => document.getElementById('calendar-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg inline-flex items-center gap-2 text-sm md:text-xl shadow-lg"
            >
              👉 START YOUR 30-DAY TEST DRIVE!
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-lg text-white text-center">
            Receive 20+ test leads before you commit...
          </p>
        </div>

        {/* Calendar Section */}
        <div id="calendar-section" className="mb-16">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-semibold mb-4 text-black">
                Schedule Your Free Consultation, {firstName}!
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Let's discuss how we can scale your smart home business with qualified leads.
              </p>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-2 rounded-full mb-4">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">15-Minute Free Call</span>
              </div>
            </div>
            
            {/* GoHighLevel Booking Widget */}
            <div className="min-h-[600px] w-full">
              {bookingUrl ? (
                <iframe
                  key={`booking-${phone}-${email}-${firstName}-${lastName}`}
                  src={bookingUrl}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title="Schedule a meeting"
                  className="rounded-lg w-full"
                  style={{ minHeight: '600px' }}
                />
              ) : (
                <div className="flex items-center justify-center h-[600px] bg-gray-100 rounded-lg">
                  <div className="text-gray-500">Loading booking calendar...</div>
                </div>
              )}
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

export default QuizResults;