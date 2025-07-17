import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { Play, Shield, Wifi, Mic, Settings, Zap, Star, ArrowRight } from "lucide-react";

const VSLLanding = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const features = [
    {
      icon: Settings,
      title: "Whole-Home Control",
      description: "Seamless automation across every room"
    },
    {
      icon: Wifi,
      title: "Pro Wi-Fi",
      description: "Enterprise-grade networking that never fails"
    },
    {
      icon: Mic,
      title: "Voice Scenes",
      description: "Custom lighting & climate with simple commands"
    },
    {
      icon: Shield,
      title: "24/7 Remote Support",
      description: "Expert monitoring and instant troubleshooting"
    },
    {
      icon: Zap,
      title: "Energy Dashboard",
      description: "Real-time usage insights and optimization"
    }
  ];

  const testimonials = [
    {
      quote: "The team transformed our home into something from the future. Everything just works perfectly.",
      author: "Sarah M., Luxury Homeowner",
      image: "/placeholder-testimonial-1.jpg"
    },
    {
      quote: "Best investment we've made. The home theater and automation saved us months of DIY headaches.",
      author: "Michael T., Tech Executive",
      image: "/placeholder-testimonial-2.jpg"
    },
    {
      quote: "Professional installation, zero issues. Our smart home adds real value when selling.",
      author: "Lisa K., Real Estate Developer",
      image: "/placeholder-testimonial-3.jpg"
    },
    {
      quote: "The energy management alone pays for itself. Plus everything works with voice commands.",
      author: "David R., Homeowner",
      image: "/placeholder-testimonial-4.jpg"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-up');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ProgressBar currentStep={1} totalSteps={4} stepLabel="Watch Video" />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-up">
              <h1 className="text-5xl lg:text-6xl font-heading font-semibold mb-6 leading-tight">
                Ready for a Smart Home that{" "}
                <span className="text-primary italic">just works?</span>
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                See how homeowners add $30-70k in tech value—without DIY headaches.
              </p>
              
              {/* VSL Video */}
              <div className="relative mb-8 rounded-2xl overflow-hidden bg-black/20 aspect-video">
                {!isVideoPlaying ? (
                  <div 
                    className="flex items-center justify-center h-full cursor-pointer group"
                    onClick={() => setIsVideoPlaying(true)}
                  >
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-full text-sm">
                      3:45 minutes
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    [Wistia Video Player Placeholder - 3:45 Smart Home Demo]
                  </div>
                )}
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
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{feature.title}</h4>
                        <p className="text-sm text-gray-300">{feature.description}</p>
                      </div>
                    </div>
                  ))}
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
              Stop Fighting With DIY Smart Gadgets
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Most homeowners waste thousands on devices that don't talk to each other.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="fade-up card-rounded border-red-200 bg-red-50">
              <h3 className="text-xl font-semibold mb-4 text-red-800">DIY Nightmare</h3>
              <ul className="space-y-3 text-red-700">
                <li>• Multiple apps for each device</li>
                <li>• Constant connectivity issues</li>
                <li>• No professional support</li>
                <li>• Devices stop working after updates</li>
                <li>• Security vulnerabilities</li>
              </ul>
            </div>

            <div className="fade-up card-rounded border-green-200 bg-green-50">
              <h3 className="text-xl font-semibold mb-4 text-green-800">Professional Integration</h3>
              <ul className="space-y-3 text-green-700">
                <li>• Single control system</li>
                <li>• Enterprise-grade reliability</li>
                <li>• 24/7 monitoring & support</li>
                <li>• Future-proof technology</li>
                <li>• Bank-level security</li>
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
              30-Day "We-Fix-It-Free" Workmanship Guarantee
            </h3>
            <p className="text-primary-foreground/90">
              If anything doesn't work perfectly, we fix it at no charge.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Carousel */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="fade-up text-center mb-12">
            <h2 className="text-3xl font-heading font-semibold mb-4 text-rich-black">
              What Homeowners Are Saying
            </h2>
            <p className="text-xl text-muted-foreground">
              Real results from real luxury smart home installations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="fade-up card-rounded">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
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
              </div>
            ))}
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
    </div>
  );
};

export default VSLLanding;