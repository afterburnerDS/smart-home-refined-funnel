import goHighLevelService from "../services/gohighlevel";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface QuizData {
  name: string;
  email: string;
  phone: string;
}

const Quiz = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState<QuizData>({
    name: "",
    email: "",
    phone: ""
  });

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
    
    // Store quiz data and navigate to results
    const params = new URLSearchParams({
      services: "Smart Home Services",
      monthlyProjects: "Not specified",
      avgProjectValue: "Not specified",
      marketingSpend: "Not specified",
      name: quizData.name,
      email: quizData.email,
      phone: quizData.phone
    });
    navigate(`/results?${params.toString()}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="card-rounded">
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;