
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

interface HeroSectionProps {
  onLoginClick: () => void;
  onExploreClick: () => void;
}

const HeroSection = ({ onLoginClick, onExploreClick }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden bg-background pt-16 md:pt-20 lg:pt-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-brand-primary mr-2" />
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-brand-primary">Learn</span>Lab
              </h1>
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Unlock Your Potential with AI-Powered Learning
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Join our innovative e-learning platform featuring personalized courses, 
              AI-powered assistance, and real-time progress tracking to accelerate your learning journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-brand-primary hover:bg-brand-primary/90" onClick={onLoginClick}>
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-brand-primary text-brand-primary" onClick={onExploreClick}>
                Explore Courses
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-br from-brand-primary/10 via-brand-secondary/10 to-brand-accent/10 aspect-video rounded-xl flex items-center justify-center">
                <img 
                  src="/placeholder.svg" 
                  alt="E-learning platform interface" 
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center cursor-pointer shadow-lg">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-brand-primary border-b-8 border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default HeroSection;
