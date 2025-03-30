
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex items-center justify-center mb-4">
          <GraduationCap className="h-12 w-12 text-brand-primary" />
        </div>
        
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        
        <p className="text-muted-foreground text-lg">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Button 
            className="bg-brand-primary hover:bg-brand-primary/90"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
