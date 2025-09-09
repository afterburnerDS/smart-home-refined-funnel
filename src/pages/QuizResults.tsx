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
    // Base URL
    let url = 'https://link.wattleads.com/widget/booking/7B3xHxHgXVutXPXIwfwj';
    
    // Add query parameters for pre-filling the form
    const params = new URLSearchParams();
    if (firstName) params.append('first_name', firstName);
    if (lastName) params.append('last_name', lastName);
    if (email) params.append('email', email);
    if (phone) params.append('phone', phone);
    
    // Append parameters if any exist
    const queryString = params.toString();
    if (queryString) {
      url = `${url}?${queryString}`;
    }
    
    return url;
  };

  useEffect(() => {
    console.log('QuizResults useEffect running');
    
    // Load GoHighLevel widget scripts
    const formScript = document.createElement('script');
    formScript.src = 'https://link.wattleads.com/js/form_embed.js';
    formScript.type = 'text/javascript';
    document.head.appendChild(formScript);
    
    // Load GoHighLevel embed script for the calendar
    const embedScript = document.createElement('script');
    embedScript.src = 'https://link.wattleads.com/js/embed.js';
    embedScript.type = 'text/javascript';
    document.head.appendChild(embedScript);
    
    console.log('GoHighLevel widget script added to head');
    
    // Add script to forward query params to GoHighLevel iframe
    setTimeout(() => {
      const queryParamsScript = document.createElement('script');
      queryParamsScript.textContent = `
        (function () {
          // adjust the selector to match your embed if needed
          var iframe = document.querySelector('iframe[src*="link.wattleads.com"]');
          if (!iframe) return;

          var parentQS = window.location.search;        // "?c_ad_id=TEST123&..."
          if (!parentQS) return;

          var src = new URL(iframe.src, window.location.origin);
          // keep any existing params on the iframe and append the parent's params
          if (src.search) iframe.src = src + '&' + parentQS.slice(1);
          else iframe.src = src + parentQS;
        })();
      `;
      document.body.appendChild(queryParamsScript);
      console.log('Query params forwarding script added');
    }, 1000); // Wait for iframe to be mounted
    
    // Set booking URL after we have all the data
    if (phone || email || userName) {
      const url = createBookingUrl();
      setBookingUrl(url);
      console.log('Booking URL set:', url);
      
      // Add console log to verify iframe loading
      setTimeout(() => {
        console.log('Checking if iframe is loaded:', document.querySelector('iframe')?.contentWindow);
        console.log('Booking calendar iframe element:', document.querySelector('iframe'));
      }, 2000);
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
    
    return () => {
      // Cleanup scripts when component unmounts
      if (formScript.parentNode) {
        formScript.parentNode.removeChild(formScript);
      }
      if (embedScript.parentNode) {
        embedScript.parentNode.removeChild(embedScript);
      }
    };
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 max-w-4xl py-8 md:py-20">
        {/* 1. WattLeads Logo */}
        <div className="text-center mb-3 md:mb-6">
          <div className="inline-block">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              WattLeads
            </h1>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-6 md:mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-red-500">
            Get 15+ Pre-Qualified Electrical Premium Estimate Requests Every Month
          </h3>
          
          {/* Call-to-Action Button moved right below headline */}
          <div className="mt-6 mb-4">
            <button 
              onClick={() => document.getElementById('calendar-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center gap-2 text-sm md:text-xl shadow-lg"
            >
              👉 SCHEDULE FREE CONSULTATION
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Video instruction */}
        <div className="text-center mb-4">
          <p className="text-lg md:text-3xl text-white">
            This Video reveals Exactly How We Do It For Over <span className="font-semibold text-orange-400">80+ Electrical and Smart Home Businesses</span> in under <span className="font-semibold text-orange-400">2 Minutes</span>
          </p>
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
        
        {/* Benefits Bar - Moved to right below the video */}
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



        {/* Calendar Section */}
        <div id="calendar-section" className="mb-16">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-semibold mb-4 text-black">
                Schedule Your Free Consultation {firstName}!
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Let's discuss how we can scale your smart home business with qualified leads.
              </p>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-2 rounded-full mb-4">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">15-Minute Free Call</span>
              </div>
            </div>
            
            {/* GoHighLevel Booking Widget - Updated with new embed */}
            <div className="min-h-[600px] w-full">
              <div dangerouslySetInnerHTML={{ __html: `
                <iframe 
                  src="https://link.wattleads.com/widget/booking/7B3xHxHgXVutXPXIwfwj" 
                  style="width: 100%; border:none; overflow: hidden; min-height: 600px;" 
                  scrolling="no" 
                  id="msgsndr-calendar"
                  className="rounded-lg w-full"
                  allow="camera; microphone; autoplay; encrypted-media;"
                ></iframe>
              ` }} />
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