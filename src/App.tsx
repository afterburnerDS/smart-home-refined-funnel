import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VSLLanding from "./pages/VSLLanding";
import Quiz from "./pages/Quiz";
import QuizResults from "./pages/QuizResults";
import Booking from "./pages/Booking";
import Confirmation from "./pages/Confirmation";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import DSL from "./pages/DSL";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Determine if we're running under /vsl path
const basename = window.location.pathname.startsWith('/vsl') ? '/vsl' : '';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<VSLLanding />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<QuizResults />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/dsl" element={<DSL />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
