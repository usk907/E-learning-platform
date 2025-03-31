
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import GoogleLoginButton from "./GoogleLoginButton";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || (isSignUp && !name)) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Simple validation
    if (!email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    // Since we're using a local db, we'll just log the user in
    login(email, name || email.split('@')[0]);
    
    toast({
      title: isSignUp ? "Account Created" : "Login Successful",
      description: isSignUp 
        ? "Your account has been created successfully" 
        : "You have been logged in successfully",
    });
    
    onClose();
  };

  const handleGoogleLogin = () => {
    // For now, just create a basic user with Google domain
    const googleEmail = `user${Math.floor(Math.random() * 1000)}@gmail.com`;
    const googleName = `Google User ${Math.floor(Math.random() * 1000)}`;
    
    login(googleEmail, googleName);
    
    toast({
      title: "Google Login Successful",
      description: "You have been logged in with Google successfully",
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isSignUp ? "Create an Account" : "Log In"}</DialogTitle>
          <DialogDescription>
            {isSignUp 
              ? "Sign up to access all features of our learning platform" 
              : "Log in to your account to continue learning"
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="John Doe" 
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="your.email@example.com" 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {!isSignUp && (
                <Button type="button" variant="link" className="px-0 text-xs">
                  Forgot password?
                </Button>
              )}
            </div>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          
          <Button type="submit" className="w-full">
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
        </form>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        
        <GoogleLoginButton onClick={handleGoogleLogin} />
        
        <div className="text-center text-sm">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <Button 
            type="button" 
            variant="link" 
            className="p-0 text-sm h-auto" 
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
