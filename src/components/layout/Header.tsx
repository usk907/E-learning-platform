
import { useState, useRef, useEffect } from "react";
import { Bell, Search, User, Sun, Moon, Settings, LogOut, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/auth/LoginModal";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user, logout, isAuthenticated } = useAuth();
  
  const handleProfileImageClick = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUserImage(result);
        localStorage.setItem('userProfileImage', result);
        toast({
          title: "Profile Updated",
          description: "Your profile image has been updated successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Load profile image from localStorage on component mount
  useEffect(() => {
    const savedImage = localStorage.getItem('userProfileImage');
    if (savedImage) {
      setUserImage(savedImage);
    }
  }, []);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/');
  };
  
  return (
    <header className={`border-b border-border h-16 flex items-center justify-between px-4 md:px-6 ${
      theme === 'dark' ? 'bg-background text-foreground' : 'bg-background text-foreground'
    }`}>
      {/* Sidebar toggle and search section */}
      <div className="flex items-center w-full max-w-md gap-2">
        <SidebarTrigger className="mr-2" />
        
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses, assignments..."
            className="w-full pl-9 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Right section - notifications and profile */}
      <div className="flex items-center space-x-4">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        {/* Notifications */}
        {isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-brand-accent"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <DropdownMenuItem key={i} className="p-4 cursor-pointer">
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>New quiz available</p>
                      <p className="text-sm text-muted-foreground">
                        A new quiz has been added to the Machine Learning course
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center">
                <Button variant="ghost" size="sm" className="w-full">
                  View all notifications
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
        {/* Profile dropdown or login button */}
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  {userImage ? (
                    <AvatarImage src={userImage} alt="User profile" />
                  ) : (
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <Avatar className="h-10 w-10 cursor-pointer" onClick={handleProfileImageClick}>
                  {userImage ? (
                    <AvatarImage src={userImage} alt="User profile" />
                  ) : (
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileImageClick} className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                <span>Change Profile Picture</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button 
            variant="default" 
            size="sm"
            onClick={() => setIsLoginModalOpen(true)}
            className="flex items-center gap-1"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Login
          </Button>
        )}
      </div>
      
      {/* Hidden file input for image upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  );
};

export default Header;
