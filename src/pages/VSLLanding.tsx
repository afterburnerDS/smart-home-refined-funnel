import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { Play, Shield, Wifi, Mic, Settings, Zap, Star, ArrowRight } from "lucide-react";
const VSLLanding = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const features = [{
    icon: Settings,
    title: "AI Lead Qualification",
    description: "Pre-qualify leads by budget, timeline & project scope"
  }, {
    icon: Wifi,
    title: "Meta Ads Management",
    description: "Profitable campaigns that actually convert"
  }, {
    icon: Mic,
    title: "AI Appointment Setting",
    description: "Automated booking that fills your calendar"
  }, {
    icon: Shield,
    title: "CRM Integration",
    description: "Seamless handoff to your sales process"
  }, {
    icon: Zap,
    title: "Performance Dashboard",
    description: "Real-time ROI tracking and optimization"
  }];
  const testimonials = [{
    quote: "WattLeads transformed our lead quality. We went from 200 tire-kickers to 20 serious buyers monthly.",
    author: "Marcus T., Smart Home Pro",
    image: "/placeholder-testimonial-1.jpg"
  }, {
    quote: "Finally, marketing that actually works. $180k revenue from 15 leads last month.",
    author: "Jennifer K., Automation Expert",
    image: "/placeholder-testimonial-2.jpg"
  }, {
    quote: "No more $5k/month agencies with zero results. WattLeads pays for itself 10x over.",
    author: "David M., Tech Integration Co.",
    image: "/placeholder-testimonial-3.jpg"
  }, {
    quote: "The AI qualification is incredible. Every consultation is with someone ready to spend $25k+.",
    author: "Sarah L., Luxury Installer",
    image: "/placeholder-testimonial-4.jpg"
  }];
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
  return <div className="min-h-screen bg-background">
      <ProgressBar currentStep={1} totalSteps={4} stepLabel="Watch Video" />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-up">
              <h1 className="lg:text-6xl font-heading font-semibold mb-6 leading-tight text-4xl">
                <span className="text-primary">Get 40 Pre-Qualified Leads</span> into your calendar in 90 Days or <span className="text-primary">Don't Pay!</span>
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                See how we help Smart Home companies generate <strong>$100k to $300k</strong> monthly from <strong>just 15-25</strong> qualified leads while other agencies send 200+ tire-kickers who waste your time.
              </p>
              
              {/* VSL Video */}
              <div className="relative mb-8 rounded-2xl overflow-hidden bg-black/20 aspect-video">
                {!isVideoPlaying ? <div className="flex items-center justify-center h-full cursor-pointer group" onClick={() => setIsVideoPlaying(true)}>
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-full text-sm">
                      4:30 minutes
                    </div>
                  </div> : <div className="w-full h-full flex items-center justify-center text-gray-400">
                    [Wistia Video Player - Smart Home Lead Generation Demo - 4:30]
                  </div>}
              </div>

              <Link to="/quiz" className="btn-orange inline-flex items-center gap-2 text-lg">
                Start Your Application
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="fade-up lg:pl-8">
              <div className="card-rounded bg-white/10 backdrop-blur-sm border-white/20">
                <h3 className="text-2xl font-heading mb-4">What You Get</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{feature.title}</h4>
                        <p className="text-sm text-gray-300">{feature.description}</p>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain/Agitate/Solve Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="fade-up text-center mb-16">
            <h2 className="text-4xl font-heading font-semibold mb-6 text-rich-black">
              You're Tired of Marketing That Doesn't Work...
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              If you're a Smart Home company owner, you know the frustration:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="fade-up card-rounded border-red-200 bg-red-50">
              <h3 className="text-xl font-semibold mb-4 text-red-800">Current Marketing Problems</h3>
              <ul className="space-y-3 text-red-700">
                <li>❌ Paying $3,000-$5,000/month to agencies with no guaranteed results</li>
                <li>❌ Chasing unqualified leads who ghost you after seeing $25k+ prices</li>
                <li>❌ Wasting 45 minutes per consultation educating tire-kickers who never buy</li>
                <li>❌ Competing on price because leads are shopping around</li>
                <li>❌ Empty appointment slots while competitors stay booked solid</li>
                <li>❌ Marketing agencies that disappear when results don't materialize</li>
              </ul>
            </div>

            <div className="fade-up card-rounded border-green-200 bg-green-50">
              <h3 className="text-xl font-semibold mb-4 text-green-800">WattLeads Solution</h3>
              <ul className="space-y-3 text-green-700">
                <li>✅ Every lead is budget-qualified by AI ($25k+ projects only)</li>
                <li>✅ Pre-educated prospects who understand smart home value</li>
                <li>✅ Leads come pre-scheduled and ready to buy</li>
                <li>✅ Stop competing on price, start selling premium value</li>
                <li>✅ Consistent 15-25 qualified leads monthly</li>
                <li>✅ 90-day ROI guarantee or money back</li>
              </ul>
            </div>
          </div>

          <div className="fade-up text-center">
            <Link to="/quiz" className="btn-orange inline-flex items-center gap-2">
              Start Your Application
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Guarantee Banner */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="fade-up">
            <h3 className="text-2xl font-heading font-semibold text-white mb-2">
              90-Day ROI Guarantee
            </h3>
            <p className="text-primary-foreground/90">
              If we don't generate qualified leads that pay for our service within 90 days, we'll refund every penny.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Carousel */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="fade-up text-center mb-12">
            <h2 className="text-3xl font-heading font-semibold mb-4 text-rich-black">
              What Smart Home Companies Are Saying
            </h2>
            <p className="text-xl text-muted-foreground">
              Real results from real smart home businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => <div key={index} className="fade-up card-rounded">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-sm mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.author}</p>
                  </div>
                </div>
              </div>)}
          </div>

          <div className="fade-up text-center mt-12">
            <Link to="/quiz" className="btn-orange inline-flex items-center gap-2">
              Start Your Application
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-rich-black text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-8 text-sm">
            <a href="#privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>;
};
export default VSLLanding;