import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { Star, ArrowRight, Calendar, Clock, Mail, CheckCircle } from "lucide-react";

const VSLLanding = () => {
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
    <div className="min-h-screen bg-background">
      <ProgressBar currentStep={1} totalSteps={4} stepLabel="Watch Video" />
      
      <div className="container mx-auto px-4 max-w-4xl py-20">
        {/* Main Headline */}
        <div className="fade-up text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-rich-black">
            <span className="text-primary">Smart Home Companies</span>
          </h1>
          
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-rich-black">
            <span className="text-primary">Get 40 Pre-Qualified Leads in 90 Days or Don't Pay!</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Start with a 30-day test drive today and start receiving <span className="font-semibold text-primary">pre-qualified, high income leads</span> within 72 hours...
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 italic">
            Get started in 30 seconds...
          </p>
          
          <Link to="/quiz" className="btn-orange inline-flex items-center gap-2 text-xl px-8 py-4">
            👉 START YOUR 30-DAY TEST DRIVE!
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <p className="text-lg text-muted-foreground mt-4">
            Receive 20+ test leads before you commit...
          </p>
        </div>

        {/* Pain Points Section */}
        <div className="fade-up mb-16">
          <h3 className="text-3xl font-heading font-bold mb-8 text-center text-rich-black">
            Stop Wasting Time On Low Value Leads...
          </h3>
          
          <p className="text-xl text-muted-foreground mb-8 text-center">
            Start receiving <span className="font-semibold text-primary">pre-qualified</span>, high value <span className="font-semibold text-primary">LUXURY</span> leads within <span className="font-semibold text-primary">72 hours</span>...
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 text-center italic">
            Get started in 30 seconds...
          </p>
          
          <div className="text-center mb-8">
            <Link to="/quiz" className="btn-orange inline-flex items-center gap-2 text-xl px-8 py-4">
              👉 START YOUR 30-DAY TEST DRIVE!
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <p className="text-lg text-muted-foreground text-center">
            Receive 20+ test leads before you commit...
          </p>
        </div>

        {/* Value Proposition */}
        <div className="fade-up mb-16">
          <p className="text-xl text-muted-foreground mb-8 text-center">
            Add an <span className="font-semibold text-primary">extra $50-100,000</span> per month to your smart home business by targeting <span className="font-semibold text-primary">high-end luxury clients</span>...
          </p>
          
          <p className="text-lg text-muted-foreground mb-8">
            Most smart home companies struggle with cash flow, low margins & difficult clients because they focus TOO much on basic installations.
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
            <Link to="/quiz" className="btn-orange inline-flex items-center gap-2 text-xl px-8 py-4">
              👉 START YOUR 30-DAY TEST DRIVE!
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <p className="text-lg text-muted-foreground text-center">
            Receive 20+ test leads before you commit...
          </p>
        </div>

        {/* Value Proposition Repeat */}
        <div className="fade-up mb-16">
          <p className="text-xl text-muted-foreground mb-8 text-center">
            Add an <span className="font-semibold text-primary">extra $50-100,000 per month</span> to your smart home business by targeting <span className="font-semibold text-primary">high-end luxury clients</span>...
          </p>
          
          <p className="text-lg text-muted-foreground mb-8">
            Most smart home companies struggle with cash flow, low margins & difficult clients because they focus TOO much on basic installations.
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
          <h3 className="text-2xl font-heading font-bold mb-6 text-center text-rich-black">
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
            <Link to="/quiz" className="btn-orange inline-flex items-center gap-2 text-xl px-8 py-4">
              👉 START YOUR 30-DAY TEST DRIVE!
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <p className="text-lg text-muted-foreground text-center">
            Receive 20+ test leads before you commit...
          </p>
        </div>

        {/* Comparison Section */}
        <div className="fade-up mb-16">
          <h3 className="text-3xl font-heading font-bold mb-8 text-center text-rich-black">
            Why switch to WattLeads?
          </h3>
          
          <h4 className="text-2xl font-heading font-bold mb-6 text-center text-rich-black">
            Us vs Other Marketing Agencies...
          </h4>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="card-rounded border-red-200 bg-red-50 p-6">
              <h5 className="text-xl font-semibold mb-4 text-red-800">Most agencies</h5>
              <ul className="space-y-3 text-red-700">
                <li>• 6 month contracts</li>
                <li>• Zero guarantees</li>
                <li>• Up front fees</li>
                <li>• Poor quality leads</li>
                <li>• 14-30 day setup</li>
                <li>• Non-responsive leads</li>
                <li>• Zero lead qualification</li>
              </ul>
            </div>
            
            <div className="card-rounded border-green-200 bg-green-50 p-6">
              <h5 className="text-xl font-semibold mb-4 text-green-800">WattLeads</h5>
              <ul className="space-y-3 text-green-700">
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
          <h3 className="text-2xl font-heading font-bold mb-6 text-center text-rich-black">
            How we are able to HYPER TARGET the best luxury deals for your smart home company...
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
            <Link to="/quiz" className="btn-orange inline-flex items-center gap-2 text-xl px-8 py-4">
              👉 START YOUR 30-DAY TEST DRIVE!
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <p className="text-lg text-muted-foreground text-center">
            Receive 20+ test leads before you commit...
          </p>
          
          <div className="text-center">
            <Link to="/quiz" className="btn-orange inline-flex items-center gap-2 text-xl px-8 py-4">
              👉 FIND OUT MORE!
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="fade-up text-center py-8 border-t border-border">
          <p className="text-lg font-semibold text-rich-black mb-2">WattLeads © 2024</p>
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