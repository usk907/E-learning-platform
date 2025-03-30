
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, Home, BookOpen, MessageSquare, 
  Calendar, BarChart, User, Settings, PanelLeftClose, PanelLeft
} from "lucide-react";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { useTheme } from "@/hooks/use-theme";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const { theme } = useTheme();
  
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Chat Assistant", href: "/chat", icon: MessageSquare },
    { name: "Attendance", href: "/attendance", icon: Calendar },
    { name: "Performance", href: "/performance", icon: BarChart },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Admin", href: "/admin", icon: Settings },
  ];
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <SidebarProvider defaultOpen={isOpen} onOpenChange={setIsOpen}>
      <SidebarComponent>
        <SidebarHeader className="p-4">
          <NavLink to="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-brand-primary" />
            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>LearnLab</span>
          </NavLink>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarMenu>
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    isActive={isActive}
                    tooltip={item.name}
                    asChild
                  >
                    <NavLink
                      to={item.href}
                      className={`flex items-center gap-2 w-full ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      <item.icon className={`h-5 w-5 ${
                        isActive 
                          ? 'text-brand-primary' 
                          : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        
        <SidebarFooter className="p-4 border-t border-border">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Demo User</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>student@example.com</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className={`w-full mt-4 ${
              theme === 'dark' 
                ? 'text-white border-white/20' 
                : 'text-brand-primary border-brand-primary/20'
            }`}
          >
            Sign Out
          </Button>
        </SidebarFooter>
      </SidebarComponent>
    </SidebarProvider>
  );
};

export default Sidebar;
