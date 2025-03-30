
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import GoogleLoginButton from "./GoogleLoginButton";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [activeTab, setActiveTab] = useState<"student" | "admin">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }
    
    // TODO: Implement actual admin authentication
    console.log("Admin login with:", { email, password });
    
    toast({
      title: "Admin Login",
      description: "This feature will be implemented with backend integration.",
    });
    
    // Close modal after login attempt
    onClose();
  };

  const handleStudentGoogleLogin = () => {
    // TODO: Implement Google authentication
    console.log("Student login with Google");
    
    toast({
      title: "Google Login",
      description: "This feature will be implemented with Firebase/Google auth integration.",
    });
    
    // Close modal after login attempt
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-brand-primary mr-2" />
            <span className="text-2xl font-bold">LearnLab</span>
          </div>
          <DialogTitle className="text-center">Welcome Back</DialogTitle>
          <DialogDescription className="text-center">
            Sign in to your account to continue learning
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="student" value={activeTab} onValueChange={(value) => setActiveTab(value as "student" | "admin")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          
          <TabsContent value="student" className="space-y-4">
            <div className="flex flex-col gap-4">
              <GoogleLoginButton onClick={handleStudentGoogleLogin} />
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Students use Google Sign In
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="admin" className="space-y-4">
            <form onSubmit={handleAdminLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="admin@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-primary/90">
                  Sign In
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
