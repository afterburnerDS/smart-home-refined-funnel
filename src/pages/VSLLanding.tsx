import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [isQualified, setIsQualified] = useState(false);
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

  const servicesBenefits = {
    "Residential Electrical Services": [
      "Target high-value whole home rewiring and panel upgrades",
      "Premium electrical repairs and installations for luxury homes",
      "Recurring maintenance contracts with affluent homeowners"
    ],
    "Commercial Electrical Contracting": [
      "Large-scale commercial building projects worth $50k-$500k+",
      "Ongoing maintenance contracts with commercial properties",
      "Industrial facility electrical system upgrades"
    ],
    "Industrial Electrical & Maintenance": [
      "High-ticket industrial equipment installations",
      "Emergency electrical service contracts with premium pricing",
      "Specialized technical expertise commanding higher rates"
    ],
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

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestion(1);
    setShowResults(false);
    // Smooth scroll to quiz section
    setTimeout(() => {
      const quizElement = document.getElementById('quiz-section');
      if (quizElement) {
        quizElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleOptionSelect = (questionId: number, option: string) => {
    if (questionId === 1) {
      const newServices = quizData.services.includes(option)
        ? quizData.services.filter(s => s !== option)
        : [...quizData.services, option];
      setQuizData({ ...quizData, services: newServices });
    } else if (questionId === 2) {
      setQuizData({ ...quizData, monthlyProjects: option });
    } else if (questionId === 3) {
      setQuizData({ ...quizData, avgProjectValue: option });
    } else if (questionId === 4) {
      setQuizData({ ...quizData, marketingSpend: option });
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

  const handleNext = () => {
    if (currentQuestion < 5) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Show results instead of navigating
      setShowResults(true);
      
      // Qualification logic: Avg Project Value >= $25k AND Marketing Spend >= $2k
      const qualifies = (quizData.avgProjectValue === '$25k-$50k' || quizData.avgProjectValue === '$50k+') && 
                       (quizData.marketingSpend === '$2k-$5k' || quizData.marketingSpend === '$5k-$10k' || quizData.marketingSpend === '$10k+');
      setIsQualified(qualifies);
      
      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById('results-section');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
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
      {showQuiz && !showResults && (
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
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              WattLeads
            </h1>
          </div>
        </div>

        {/* 2. Main Headline */}
        <div className="fade-up text-center mb-4 md:mb-8">
          <h2 className="text-3xl md:text-6xl font-heading font-bold text-white">
            <span className="text-primary">US Electrical and Smart Home Companies</span>
          </h2>
        </div>

        {/* 3. Subheadline */}
        <div className="fade-up text-center mb-6 md:mb-12">
          <h3 className="text-xl md:text-4xl font-heading font-bold mb-3 md:mb-6 text-white">
            <span className="text-primary">Get 40 Pre-Qualified Leads in 90 Days or Don't Pay!</span>
          </h3>
          
          <p className="text-base md:text-2xl text-muted-foreground">
            Start with a 30-day test drive today and start receiving <span className="font-semibold text-primary">pre-qualified, high income leads</span> within 72 hours...
          </p>
        </div>

        {/* 4. VSL Video */}
        <div className="fade-up mb-6 md:mb-12">
          <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 md:w-20 md:h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 hover:bg-red-600 transition-colors cursor-pointer">
                  <Play className="w-5 h-5 md:w-8 md:h-8 text-white ml-1" />
                </div>
                <p className="text-white text-sm md:text-lg font-semibold">Watch the Video</p>
                <p className="text-gray-400 text-xs md:text-sm mt-1 md:mt-2">Learn how we generate 40+ qualified leads</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Call-to-Action Button */}
        <div className="fade-up text-center mb-8 md:mb-16">
          <p className="text-gray-300 mb-3 md:mb-6 italic text-sm md:text-base">
            Get started in 30 seconds...
          </p>
          
          <button 
            onClick={handleStartQuiz}
            className="btn-red inline-flex items-center gap-2 text-lg md:text-xl px-6 py-3 md:px-8 md:py-4 shadow-lg"
          >
            👉 START YOUR 30-DAY TEST DRIVE!
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          
          <p className="text-gray-300 mt-3 md:mt-4 text-sm md:text-base">
            Receive 20+ test leads before you commit...
          </p>
        </div>



        {/* Value Proposition */}
        <div className="fade-up mb-16">
          <p className="text-xl text-muted-foreground mb-8 text-center">
            Add an <span className="font-semibold text-primary">extra $50-100,000</span> per month to your electrical or smart home business by targeting <span className="font-semibold text-primary">high-end luxury clients</span>...
          </p>
          
          <p className="text-lg text-muted-foreground mb-8">
            Most electrical and smart home companies struggle with cash flow, low margins & difficult clients because they focus TOO much on basic installations.
          </p>
          
          <p className="text-lg text-muted-foreground mb-8">
            Here at WattLeads we target luxury homeowners within your area, with targeted META ads, and proven offers.
          </p>
          
          <p className="text-lg text-muted-foreground mb-8">
            We also pre-qualify every lead before it lands in your in-box, so that you aren't wasting time trying to call and schedule leads who never answer the phone.
          </p>
          
          <p className="text-lg text-muted-foreground mb-8">
            Oh! And you can also try risk free for 30 days...
          </p>
        </div>

        {/* Benefits List */}
        <div className="fade-up mb-16">
          <ul className="space-y-4 text-lg text-muted-foreground mb-8">
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
          
          <p className="text-lg text-muted-foreground mb-8">
            All you need to do to get started, is schedule in a FREE 15-minute intro call with us today.
          </p>
          
          <p className="text-lg text-muted-foreground mb-8">
            It's 100% free, no strings attached, book in by clicking the link below...
          </p>
          
          <div className="text-center mb-8">
            <button 
              onClick={handleStartQuiz}
              className="btn-red inline-flex items-center gap-2 text-xl px-8 py-4"
            >
              👉 START YOUR 30-DAY TEST DRIVE!
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-lg text-muted-foreground text-center">
            Receive 20+ test leads before you commit...
          </p>
        </div>

        {/* Value Proposition Repeat */}
        <div className="fade-up mb-16">
          <p className="text-xl text-muted-foreground mb-8 text-center">
            Add an <span className="font-semibold text-primary">extra $50-100,000 per month</span> to your electrical or smart home business by targeting <span className="font-semibold text-primary">high-end luxury clients</span>...
          </p>
          
          <p className="text-lg text-muted-foreground mb-8">
            Most electrical and smart home companies struggle with cash flow, low margins & difficult clients because they focus TOO much on basic installations.
          </p>
          
          <p className="text-lg text-muted-foreground mb-8">
            Here at WattLeads we target luxury homeowners within your area, with targeted META ads, and proven offers.
          </p>
          
          <p className="text-lg text-muted-foreground mb-8">
            We also pre-qualify every lead before it lands in your in-box, so that you aren't wasting time trying to call and schedule leads who never answer the phone.
          </p>
          
          <p className="text-lg text-muted-foreground mb-8">
            Oh! And you can also try risk free for 30 days...
          </p>
        </div>

        {/* What You Get Section */}
        <div className="fade-up mb-16">
          <h3 className="text-2xl font-heading font-bold mb-6 text-center text-white">
            What do you get with our 30-day test drive?
          </h3>
          
          <p className="text-lg text-muted-foreground mb-8">
            In the next 30 days we will launch your campaign, implement PROVEN strategies & funnels, and guarantee a minimum number of qualified, luxury smart home projects or you DON'T PAY.
          </p>
          
          <p className="text-lg text-muted-foreground mb-6">
            Here's what you're guaranteed...
          </p>
          
          <ul className="space-y-4 text-lg text-muted-foreground mb-8">
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
          
          <p className="text-lg text-muted-foreground mb-8">
            All you need to do to get started, is schedule in a FREE 15-minute intro call with us today.
          </p>
          
          <p className="text-lg text-muted-foreground mb-8">
            It's 100% free, no strings attached, book in by clicking the link below...
          </p>
          
          <div className="text-center mb-8">
            <button 
              onClick={handleStartQuiz}
              className="btn-red inline-flex items-center gap-2 text-xl px-8 py-4"
            >
              👉 START YOUR 30-DAY TEST DRIVE!
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-lg text-muted-foreground text-center">
            Receive 20+ test leads before you commit...
          </p>
        </div>

        {/* Comparison Section */}
        <div className="fade-up mb-16">
          <h3 className="text-3xl font-heading font-bold mb-8 text-center text-white">
            Why switch to WattLeads?
          </h3>
          
          <h4 className="text-2xl font-heading font-bold mb-6 text-center text-white">
            Us vs Other Marketing Agencies...
          </h4>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="card-rounded border-gray-600 bg-gray-800/50 p-6">
              <h5 className="text-xl font-semibold mb-4 text-gray-300">Most agencies</h5>
              <ul className="space-y-3 text-gray-400">
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
          <h3 className="text-2xl font-heading font-bold mb-6 text-center text-white">
            How we are able to HYPER TARGET the best luxury deals for your electrical or smart home company...
          </h3>
          
          <ul className="space-y-4 text-lg text-muted-foreground mb-8">
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
              className="btn-red inline-flex items-center gap-2 text-xl px-8 py-4"
            >
              👉 START YOUR 30-DAY TEST DRIVE!
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-lg text-muted-foreground text-center">
            Receive 20+ test leads before you commit...
          </p>
        </div>

        {/* Quiz Section */}
        {showQuiz && !showResults && (
          <div id="quiz-section" className="mb-16">
            <div className="bg-white rounded-lg p-8 shadow-2xl max-w-2xl mx-auto">
              {currentQuestion <= 4 && currentQ && (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl font-heading font-semibold mb-2 text-rich-black">
                      {currentQ.title}
                    </h2>
                    {currentQ.subtitle && (
                      <p className="text-muted-foreground">{currentQ.subtitle}</p>
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
                    <p className="text-muted-foreground">
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

                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    canProceed()
                      ? 'btn-red'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  {currentQuestion === 5 ? 'Get My Results' : 'Next'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && (
          <div id="results-section" className="mb-16">
            <div className="bg-white rounded-lg p-8 shadow-2xl">
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
                  Great News, {quizData.name}!
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  {isQualified 
                    ? "Your company is perfect for our premium lead generation system. Let's get you set up with qualified $25k+ prospects immediately."
                    : "We can definitely help grow your electrical or smart home business. Here's what our lead generation system can do for your company."
                  }
                </p>
              </div>

              {/* Summary Card */}
              <div className="mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-6">
                <h2 className="text-2xl font-heading font-semibold mb-6 text-rich-black">
                  Your Business Profile
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Monthly Projects</p>
                    <p className="font-semibold">{quizData.monthlyProjects}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Avg Project Value</p>
                    <p className="font-semibold">{quizData.avgProjectValue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Marketing Spend</p>
                    <p className="font-semibold">{quizData.marketingSpend}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Service Categories</p>
                    <p className="font-semibold">{quizData.services.length} specialties</p>
                  </div>
                </div>
              </div>

              {/* Selected Services Benefits */}
              <div className="space-y-6 mb-12">
                <h2 className="text-3xl font-heading font-semibold text-rich-black">
                  How WattLeads Helps Your Business
                </h2>
                
                {quizData.services.map((service, index) => {
                  const benefits = servicesBenefits[service as keyof typeof servicesBenefits] || [];
                  return (
                    <div key={index} className="border border-border rounded-lg p-6">
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

              {/* Booking Section */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-heading font-semibold mb-6 text-rich-black">
                    Book Your Free Strategy Call
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8">
                    Get a custom lead generation blueprint designed specifically for your electrical or smart home company and growth goals.
                  </p>
                </div>
                
                {/* Calendar Embed */}
                <div className="border border-border rounded-lg p-6">
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
                      <p className="text-muted-foreground">Get a clear roadmap for profitable Meta ads campaigns, including audience targeting, budget allocation, and conversion optimization specifically for electrical and smart home companies.</p>
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
                  <div className="border border-border rounded-lg p-4 bg-muted/30">
                    <p className="text-sm italic mb-3">"WattLeads' strategy call changed everything. We went from 5 leads/month to 25 qualified prospects."</p>
                    <p className="font-semibold text-sm">— Marcus T., Smart Home Pro</p>
                  </div>
                  <div className="border border-border rounded-lg p-4 bg-muted/30">
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
        )}

        {/* Footer */}
        <div className="fade-up text-center py-8 border-t border-border">
          <p className="text-lg font-semibold text-white mb-2">WattLeads © 2024</p>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-primary">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VSLLanding; 