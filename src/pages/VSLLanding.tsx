import goHighLevelService from "../services/gohighlevel";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Play, X, CheckCircle } from "lucide-react";


interface QuizData {
  name: string;
  email: string;
  phone: string;
}

const VSLLanding = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [quizData, setQuizData] = useState<QuizData>({
    name: "",
    email: "",
    phone: ""
  });

  const handleStartQuiz = () => {
    setShowPopup(true);
  };

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleInputChange = (field: keyof QuizData, value: string) => {
    setQuizData({ ...quizData, [field]: value });
  };

  const canProceed = () => {
    return quizData.name && quizData.email && quizData.phone;
  };

  const handleSubmit = async () => {
    // Submit to GoHighLevel CRM
    try {
      const utmParams = goHighLevelService.getUTMParams();
      
      const leadData = {
        name: quizData.name,
        email: quizData.email,
        phone: quizData.phone,
        services: ["Smart Home Services"],
        monthlyProjects: "Not specified",
        avgProjectValue: "Not specified",
        marketingSpend: "Not specified",
        source: "WattLeads Smart Home Funnel",
        ...utmParams
      };
      
      const result = await goHighLevelService.submitLead(leadData);
      
      if (result.success) {
        console.log("Lead submitted to GoHighLevel successfully:", result.contactId);
      } else {
        console.error("Failed to submit lead to GoHighLevel:", result.error);
      }
    } catch (error) {
      console.error("Error submitting to GoHighLevel:", error);
    }
    
    // Track Lead event when user completes quiz with contact info
    if (typeof window !== "undefined" && (window as any).fbq) {
      console.log("Firing Lead event on quiz completion...");
      (window as any).fbq("track", "Lead", {
        content_name: "Quiz Completion",
        content_category: "Lead Generation",
        value: 1
      });
      console.log("Lead event fired on quiz completion");
    } else {
      console.log("Meta Pixel not found on quiz completion");
    }
    
    // Close popup
    setShowPopup(false);
    
    // Navigate directly to results page
    window.location.href = '/results';
  };



  useEffect(() => {
    // Animation observer
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.1
    });
    const elements = document.querySelectorAll('.fade-up');
    elements.forEach(el => observer.observe(el));
    
    // Load GHL form script
    const script = document.createElement('script');
    script.src = 'https://link.wattleads.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);
    
    // Listen for form submission events
    const handleFormSubmit = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'object') {
        // Check for GHL form submission events
        if (
          (event.data.type === 'form_submit' || 
           event.data.type === 'form_submitted' ||
           event.data.event === 'form_submitted') && 
          (event.data.formId === '6b3KeOaT4WGpaHWtXfLH' || 
           event.data.id === '6b3KeOaT4WGpaHWtXfLH')
        ) {
          console.log('Form submission detected:', event.data);
          
          // Close the popup
          setShowPopup(false);
          
          // Track conversion
          if (typeof window !== "undefined" && (window as any).fbq) {
            (window as any).fbq("track", "Lead", {
              content_name: "Form Submission",
              content_category: "Lead Generation",
              value: 1
            });
          }
          
          // Force redirect to results page
          setTimeout(() => {
            window.location.href = '/results';
          }, 500);
        }
      }
    };
    
    window.addEventListener('message', handleFormSubmit);
    
    return () => {
      observer.disconnect();
      // Remove script and event listener when component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      window.removeEventListener('message', handleFormSubmit);
    };
  }, []);

  return (
    <div className="min-h-screen bg-rich-black">

      
      <div className="container mx-auto px-4 max-w-4xl py-8 md:py-20">
        {/* 1. WattLeads Logo */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-block">
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              WattLeads
            </h1>
          </div>
        </div>

        {/* Call out - Below logo */}
        <div className="text-center mb-6 md:mb-8">
          <p className="text-lg md:text-2xl text-red-500 font-bold">
            ! US Electrical and Smart Home Companies !
          </p>
        </div>

        {/* 2. Main Headline - Inside Red Container */}
        <div className="text-center mb-6 md:mb-8">
          <div className="bg-red-600 rounded-full px-6 py-3 inline-flex items-center gap-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <h2 className="text-lg md:text-xl font-bold text-white">
              Tired of Paying for Leads That Can't Afford Your Services?
            </h2>
          </div>
        </div>

        {/* 3. Subheadline */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-xl md:text-3xl text-white max-w-3xl mx-auto">
            Watch how our system generates highly qualified premium electrical installations with ready to buy customers without lifting a finger
          </p>
        </div>

        {/* 4. Screenshot Image */}
        <div className="mb-8 md:mb-12">
          <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl max-w-4xl mx-auto cursor-pointer" onClick={handleImageClick}>
            <div className="aspect-video w-full h-full relative">
              {/* Your screenshot image */}
              <img 
                src="/screenshot.png" 
                alt="Video screenshot with play button overlay" 
                className="w-full h-full object-cover"
              />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-orange-500/90 rounded-full flex items-center justify-center shadow-2xl hover:bg-orange-400 transition-all duration-300 transform hover:scale-110">
                  <Play className="w-16 h-16 text-white ml-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Call-to-Action Button */}
        <div className="text-center mb-8 md:mb-16">
          <button 
            onClick={handleStartQuiz}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg inline-flex items-center gap-3 text-lg md:text-xl shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Get Instant Access
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>









        {/* Quiz Section - HIDDEN */}
        {/* {showQuiz && (
          <div id="quiz-section" className="mb-16">
            <div className="bg-white rounded-lg p-8 shadow-2xl max-w-2xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-heading font-semibold mb-2 text-rich-black">
                  Let's Get Your Results
                </h2>
                <p className="text-gray-600">
                  Enter your details to see your personalized smart home plan
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={quizData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={quizData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    value={quizData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your mobile number"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="btn-outline inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    canProceed()
                      ? 'btn-red'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  Get My Results
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )} */}


      </div>

      {/* GHL Form with custom redirect */}
      <div className={`fixed inset-0 z-50 ${showPopup ? 'block' : 'hidden'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-2xl max-w-lg w-full mx-4 overflow-hidden">
            {/* Close button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src="https://link.wattleads.com/widget/form/6b3KeOaT4WGpaHWtXfLH"
              style={{ width: '100%', height: '500px', border: 'none' }}
              id="popup-6b3KeOaT4WGpaHWtXfLH" 
              data-form-id="6b3KeOaT4WGpaHWtXfLH"
              title="VSL Wattleads Form"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VSLLanding; 