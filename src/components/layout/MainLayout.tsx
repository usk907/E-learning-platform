
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const MainLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  
  // Simulating auth check - this would normally check a token in localStorage or a context
  useEffect(() => {
    // For demo purposes, we'll consider the user not authenticated
    // In a real app, this would check if the user is logged in
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this section. For the demo, we'll pretend you're authenticated.",
        variant: "destructive",
      });
      
      // For demo purposes, we'll set authenticated to true after showing the message
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 1000);
    }
  }, []);
  
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Checking authentication...</h2>
          <p className="text-muted-foreground">Please wait while we verify your credentials</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
