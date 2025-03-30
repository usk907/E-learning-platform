
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Users, MessageSquare, Calendar, PieChart, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoginModal from "@/components/auth/LoginModal";
import FeaturedCourses from "@/components/courses/FeaturedCourses";
import HeroSection from "@/components/layout/HeroSection";

const Index = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-brand-primary" />,
      title: "Interactive Courses",
      description: "Access a wide range of interactive courses designed for effective learning"
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-brand-secondary" />,
      title: "AI-Powered Assistance",
      description: "Get instant help from our AI assistant with any course-related questions"
    },
    {
      icon: <Calendar className="h-10 w-10 text-brand-accent" />,
      title: "Attendance Tracking",
      description: "Keep track of your learning journey with our smart attendance system"
    },
    {
      icon: <PieChart className="h-10 w-10 text-brand-success" />,
      title: "Performance Analytics",
      description: "Visualize your progress with detailed analytics and insights"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      {/* Top right login button */}
      <div className="absolute top-4 right-4 z-10">
        <Button 
          onClick={() => setIsLoginModalOpen(true)} 
          className="flex items-center gap-2"
        >
          <LogIn className="h-4 w-4" />
          <span>Login</span>
        </Button>
      </div>
      
      <HeroSection 
        onLoginClick={() => setIsLoginModalOpen(true)}
        onExploreClick={() => navigate('/courses')}
      />
      
      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Courses */}
      <section className="py-16 bg-muted/30 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
          <FeaturedCourses />
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of students already learning on our platform. Get started today!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default" className="bg-white text-brand-primary hover:bg-white/90" onClick={() => setIsLoginModalOpen(true)}>
              Sign Up Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => navigate('/courses')}>
              Browse Courses
            </Button>
          </div>
        </div>
      </section>
      
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
};

export default Index;
