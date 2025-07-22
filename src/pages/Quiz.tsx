import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

interface QuizData {
  services: string[];
  monthlyProjects: string;
  avgProjectValue: string;
  marketingSpend: string;
  name: string;
  email: string;
  phone: string;
}

const Quiz = () => {
  const navigate = useNavigate();
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
      title: "What type of smart home company are you?",
      subtitle: "Select all that apply",
      type: "multiselect",
      options: [
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
      // Store quiz data and navigate to results
      const params = new URLSearchParams({
        services: quizData.services.join(','),
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
      navigate('/');
    }
  };

  const currentQ = questions.find(q => q.id === currentQuestion);

  return (
    <div className="min-h-screen bg-background">
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
      
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="card-rounded">
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
                  ? 'btn-orange'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {currentQuestion === 5 ? 'Get My Results' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;