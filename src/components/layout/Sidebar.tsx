
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Home, BookOpen, MessageSquare, Calendar, BarChart, User, Settings, Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Chat Assistant", href: "/chat", icon: MessageSquare },
    { name: "Attendance", href: "/attendance", icon: Calendar },
    { name: "Performance", href: "/performance", icon: BarChart },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Admin", href: "/admin", icon: Settings },
  ];
  
  // Function to toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <>
      {/* Mobile toggle button - visible only on small screens */}
      <button
        type="button"
        className="md:hidden fixed top-4 left-4 z-50 rounded-md p-2 text-gray-400 hover:bg-gray-100 focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-border overflow-y-auto flex-shrink-0 
          ${isOpen ? "w-64" : "w-0"} md:w-64 transition-all duration-300 fixed md:relative 
          h-full z-40 shadow-sm`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center px-4">
            <NavLink to="/" className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-brand-primary" />
              <span className="text-xl font-bold">LearnLab</span>
            </NavLink>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-primary/10 text-brand-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-brand-primary" : "text-gray-500"}`} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
          
          {/* User section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Demo User</p>
                <p className="text-xs text-gray-500">student@example.com</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-4 text-brand-primary border-brand-primary/20"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Overlay for mobile - closes sidebar when clicking outside */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
