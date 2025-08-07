import goHighLevelService from "../services/gohighlevel";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, ArrowRight, Calendar, Clock, Mail, CheckCircle, Play, ArrowLeft, Check, Badge } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";

interface QuizData {
  services: string[];
  monthlyProjects: string;
  avgProjectValue: string;
  marketingSpend: string;
  name: string;
  email: string;
  phone: string;
}

const VSLLanding = () => {
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>({
    services: [],
    monthlyProjects: "",
    avgProjectValue: "",
    marketingSpend: "",
    name: "",
    email: "",
    phone: ""
  });

  const questions = [
    {
      id: 1,
      title: "What type of electrical or smart home company are you?",
      subtitle: "Select all that apply",
      type: "multiselect",
      options: [
        "Residential Electrical Services",
        "Commercial Electrical Contracting",
        "Industrial Electrical & Maintenance",
        "Whole-Home Automation & Voice Control",
        "Lighting & Shading Scenes", 
        "Security & Cameras",
        "Home Cinema / Media Room",
        "Enterprise-Grade Networking"
      ]
    },
    {
      id: 2,
      title: "How many projects do you typically complete per month?",
      type: "single",
      options: ["1-5 projects", "6-15 projects", "16-30 projects", "30+ projects"]
    },
    {
      id: 3,
      title: "What's your average project value?",
      type: "single",
      options: ["Under $10k", "$10k-$25k", "$25k-$50k", "$50k+"]
    },
    {
      id: 4,
      title: "How much are you currently spending on marketing per month?",
      type: "single",
      options: ["Under $2k", "$2k-$5k", "$5k-$10k", "$10k+"]
    }
  ];

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestion(1);
    
    // Smooth scroll to quiz section
    setTimeout(() => {
      const quizElement = document.getElementById('quiz-section');
      if (quizElement) {
        quizElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleOptionSelect = (questionId: number, option: string) => {
    // Update quiz data based on question
    if (questionId === 1) {
      setQuizData({ ...quizData, services: [option] }); // Single select for services
    } else if (questionId === 2) {
      setQuizData({ ...quizData, monthlyProjects: option });
    } else if (questionId === 3) {
      setQuizData({ ...quizData, avgProjectValue: option });
    } else if (questionId === 4) {
      setQuizData({ ...quizData, marketingSpend: option });
    }

    // Automatically advance to next question
    if (questionId < 5) {
      setCurrentQuestion(questionId + 1);
    }
  };

  const handleInputChange = (field: keyof QuizData, value: string) => {
    setQuizData({ ...quizData, [field]: value });
  };

  const canProceed = () => {
    if (currentQuestion === 1) return quizData.services.length > 0;
    if (currentQuestion === 2) return quizData.monthlyProjects !== "";
    if (currentQuestion === 3) return quizData.avgProjectValue !== "";
    if (currentQuestion === 4) return quizData.marketingSpend !== "";
    if (currentQuestion === 5) return quizData.name && quizData.email && quizData.phone;
    return false;
  };

  const handleNext = async () => {
    if (currentQuestion < 5) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit to GoHighLevel CRM
      try {
        const utmParams = goHighLevelService.getUTMParams();
        
        const leadData = {
          name: quizData.name,
          email: quizData.email,
          phone: quizData.phone,
          services: quizData.services,
          monthlyProjects: quizData.monthlyProjects,
          avgProjectValue: quizData.avgProjectValue,
          marketingSpend: quizData.marketingSpend,
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
      
      // Navigate to results page with quiz data
      const params = new URLSearchParams({
        services: quizData.services.join(","),
        monthlyProjects: quizData.monthlyProjects,
        avgProjectValue: quizData.avgProjectValue,
        marketingSpend: quizData.marketingSpend,
        name: quizData.name,
        email: quizData.email,
        phone: quizData.phone
      });
      navigate(`/results?${params.toString()}`);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setShowQuiz(false);
    }
  };

  const currentQ = questions.find(q => q.id === currentQuestion);

  useEffect(() => {
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
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-rich-black">
      {/* Progress Bar - only show during quiz */}
      {showQuiz && (
        <ProgressBar 
          currentStep={currentQuestion} 
          totalSteps={5} 
          stepLabel={
            currentQuestion === 1 ? "Company Type" :
            currentQuestion === 2 ? "Monthly Projects" :
            currentQuestion === 3 ? "Avg Project Value" :
            currentQuestion === 4 ? "Marketing Spend" :
            currentQuestion === 5 ? "Contact Info" :
            "Smart Home Quiz"
          }
        />
      )}
      
      <div className="container mx-auto px-4 max-w-4xl py-8 md:py-20">
        {/* 1. WattLeads Logo */}
        <div className="fade-up text-center mb-3 md:mb-6">
          <div className="inline-block">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              WattLeads
            </h1>
          </div>
        </div>

        {/* 1. Trust Indicators */}
        <div className="fade-up text-center mb-4 md:mb-6">
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
          <p className="text-white text-lg md:text-2xl opacity-80">
            <span className="text-red-500">! US Electrical and Smart Home Companies !</span>
          </p>
        </div>

        {/* 2. Main Headline */}
        <div className="fade-up text-center mb-4 md:mb-8">
          <h2 className="text-2xl md:text-5xl font-heading font-bold text-white text-center">
            <span className="text-red-500 font-bold text-6xl">Tired of Paying for Leads That Can't Afford Your Services?</span> {/* Updated headline */}
          </h2>
        </div>

        {/* 3. Subheadline */}
        <div className="fade-up text-center mb-6 md:mb-12">
          <p className="text-lg md:text-3xl text-white">
            Start with a 30-day test drive today and start receiving <span className="font-semibold text-primary">pre-qualified, high income leads</span> within 72 hours...
          </p>
        </div>

        {/* Video instruction */}
        <div className="fade-up text-center mb-4">
          <p className="text-white text-lg md:text-xl font-medium">
            Watch the video to see how it works
          </p>
        </div>

        {/* 4. VSL Video */}
        <div className="fade-up mb-6 md:mb-12">
          <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <div
              className="aspect-video w-full h-full"
              dangerouslySetInnerHTML={{
                __html: `<wistia-player media-id="jejvjuy9v9" aspect="1.7777777777777777" style="display: block; width: 100%; height: 100%"></wistia-player>`
              }}
            />
          </div>
        </div>

        {/* Benefits Bar */}
        <div className="fade-up mb-8 md:mb-12">
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
        <div className="fade-up text-center mb-8 md:mb-16">
          <p className="text-white mb-3 md:mb-6 italic text-sm md:text-base">
            Get started in 30 seconds...
          </p>
          
          <button 
            onClick={handleStartQuiz}
            className="btn-red inline-flex items-center gap-2 text-sm md:text-xl px-6 py-3 md:px-8 md:py-4 shadow-lg whitespace-nowrap"
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
        <div className="fade-up mb-16">
          <p className="text-xl text-white mb-8 text-center">
            Add an <span className="font-semibold text-primary">extra $50-100,000</span> per month to your electrical or smart home business by targeting <span className="font-semibold text-primary">high-end luxury clients</span>...
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
        <div className="fade-up mb-16">
          <ul className="space-y-4 text-lg text-white mb-8">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <span>Leads within 72-hours</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <span>No long-term commitment.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <span>Everything full custom branded.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <span>Trained A.I. assistant custom to your company.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <span>Easy to use lead tracker.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
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
              onClick={handleStartQuiz}
              className="btn-red inline-flex items-center gap-2 text-sm md:text-xl px-8 py-4 whitespace-nowrap"
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
        <div className="fade-up mb-16">
          <h3 className="text-3xl font-heading font-black mb-8 text-center text-white">
            Why switch to WattLeads?
          </h3>
          
          <h4 className="text-2xl font-heading font-extrabold mb-6 text-center text-white">
            Us vs Other Marketing Agencies...
          </h4>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="card-rounded border-gray-600 bg-gray-800/50 p-6">
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
            
            <div className="card-rounded border-primary/30 bg-primary/10 p-6">
              <h5 className="text-xl font-semibold mb-4 text-primary">WattLeads</h5>
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
        <div className="fade-up mb-16">
          <h3 className="text-2xl font-heading font-black mb-6 text-center text-white">
            How we are able to HYPER TARGET the best luxury deals for your electrical or smart home company...
          </h3>
          
          <ul className="space-y-4 text-lg text-white mb-8">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <span>We use proven META strategies to target <strong>luxury homeowners</strong> within your <strong>target radius</strong>.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <span>We implement <strong>consultation offers</strong> that guarantees your first meeting with these clients.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <span>We use our <strong>pre-trained A.I. assistant</strong> to ensure that EVERY SINGLE lead that gets in touch is <strong>immediately followed up with</strong> and has all their questions answered.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <span>We <strong>schedule phone appointments</strong> with potential clients, so that you know when and what time you will be speaking to them (no time wasted).</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <span>We deliver a <strong>guaranteed volume of leads</strong> which will at a MINIMUM cover initial investment</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <span>We offer a <strong>30 day test drive</strong> so that you can try it for yourself without committing long term.</span>
            </li>
          </ul>
          
          <div className="text-center mb-8">
            <button 
              onClick={handleStartQuiz}
              className="btn-red inline-flex items-center gap-2 text-sm md:text-xl px-8 py-4 whitespace-nowrap"
            >
              👉 START YOUR 30-DAY TEST DRIVE!
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-lg text-white text-center">
            Receive 20+ test leads before you commit...
          </p>
        </div>

        {/* Quiz Section */}
        {showQuiz && (
          <div id="quiz-section" className="mb-16">
            <div className="bg-white rounded-lg p-8 shadow-2xl max-w-2xl mx-auto">
              {currentQuestion <= 4 && currentQ && (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl font-heading font-semibold mb-2 text-rich-black">
                      {currentQ.title}
                    </h2>
                    {currentQ.subtitle && (
                      <p className="text-gray-600">{currentQ.subtitle}</p>
                    )}
                  </div>

                  <div className="space-y-4 mb-8">
                    {currentQ.options.map((option, index) => {
                      const isSelected = currentQuestion === 1 
                        ? quizData.services.includes(option)
                        : (currentQuestion === 2 && quizData.monthlyProjects === option) ||
                          (currentQuestion === 3 && quizData.avgProjectValue === option) ||
                          (currentQuestion === 4 && quizData.marketingSpend === option);

                      return (
                        <button
                          key={index}
                          onClick={() => handleOptionSelect(currentQuestion, option)}
                          className={`w-full p-4 border-2 rounded-xl text-left transition-all duration-200 hover:border-primary ${
                            isSelected 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{option}</span>
                            {isSelected && (
                              <Check className="w-5 h-5 text-primary" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {currentQuestion === 5 && (
                <>
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
                </>
              )}

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="btn-outline inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                {currentQuestion === 5 && (
                  <button
                    onClick={handleNext}
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
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="fade-up text-center py-8 border-t border-border">
          <p className="text-lg font-semibold text-white mb-2">WattLeads © 2025</p>
          <div className="flex justify-center gap-4 text-sm text-white">
            <a href="/privacy-policy" className="hover:text-primary">Privacy Policy</a>
            <span>|</span>
            <a href="/terms-conditions" className="hover:text-primary">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VSLLanding; 