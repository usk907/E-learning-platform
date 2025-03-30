
import { useState } from "react";
import { Bell, Search, User } from "lucide-react";
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

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <header className="bg-white border-b border-border h-16 flex items-center justify-between px-4 md:px-6">
      {/* Search bar */}
      <div className="w-full max-w-md">
        <div className="relative">
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
        {/* Notifications */}
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
                    <p className="font-medium">New quiz available</p>
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
        
        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
