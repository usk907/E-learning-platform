
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Lock, LogOut, Calendar, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Learning Street, Education City, EC 12345",
    avatar: "/placeholder.svg",
    joinDate: "September 2023",
    coursesEnrolled: 3,
    coursesCompleted: 1,
    certificatesEarned: 1,
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  
  const handleSaveProfile = () => {
    // Basic validation
    if (!editedProfile.firstName || !editedProfile.lastName || !editedProfile.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Update profile
    setProfile(editedProfile);
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would connect to an API to update the password
    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully.",
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    
    // In a real app, this would clear the auth token and redirect to login
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
        
        <Button
          variant="outline"
          className="text-red-600 border-red-200 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} />
                <AvatarFallback className="text-2xl">
                  {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>{profile.firstName} {profile.lastName}</CardTitle>
            <CardDescription>Student</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{profile.address}</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Joined {profile.joinDate}</span>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h4 className="text-sm font-medium mb-3">Learning Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                    Courses Enrolled
                  </span>
                  <span className="font-medium">{profile.coursesEnrolled}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <CheckSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                    Courses Completed
                  </span>
                  <span className="font-medium">{profile.coursesCompleted}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                    Certificates Earned
                  </span>
                  <span className="font-medium">{profile.certificatesEarned}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Profile Management Tabs */}
        <div className="md:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </div>
                  {!isEditing && (
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName" 
                            value={editedProfile.firstName}
                            onChange={(e) => setEditedProfile({
                              ...editedProfile,
                              firstName: e.target.value
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName" 
                            value={editedProfile.lastName}
                            onChange={(e) => setEditedProfile({
                              ...editedProfile,
                              lastName: e.target.value
                            })}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) => setEditedProfile({
                            ...editedProfile,
                            email: e.target.value
                          })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          value={editedProfile.phone}
                          onChange={(e) => setEditedProfile({
                            ...editedProfile,
                            phone: e.target.value
                          })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          value={editedProfile.address}
                          onChange={(e) => setEditedProfile({
                            ...editedProfile,
                            address: e.target.value
                          })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="avatar">Profile Picture URL</Label>
                        <Input 
                          id="avatar" 
                          value={editedProfile.avatar}
                          onChange={(e) => setEditedProfile({
                            ...editedProfile,
                            avatar: e.target.value
                          })}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">First Name</h4>
                          <p>{profile.firstName}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Last Name</h4>
                          <p>{profile.lastName}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                        <p>{profile.email}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Phone</h4>
                        <p>{profile.phone}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Address</h4>
                        <p>{profile.address}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                {isEditing && (
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => {
                      setIsEditing(false);
                      setEditedProfile(profile);
                    }}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile} className="bg-brand-primary hover:bg-brand-primary/90">
                      Save Changes
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Update your password and security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    
                    <Button type="submit" className="w-full mt-2 bg-brand-primary hover:bg-brand-primary/90">
                      Update Password
                    </Button>
                  </form>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-base font-medium mb-3">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <Button variant="outline">
                      Enable 2FA
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>
                    Customize your learning experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-medium mb-3">Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Email Notifications</span>
                          <Switch checked={true} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Course Updates</span>
                          <Switch checked={true} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Assignment Reminders</span>
                          <Switch checked={true} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="text-base font-medium mb-3">Appearance</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Dark Mode</span>
                          <Switch checked={false} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Compact View</span>
                          <Switch checked={false} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="text-base font-medium mb-3">Privacy</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Show Profile to Other Students</span>
                          <Switch checked={true} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Share Learning Progress</span>
                          <Switch checked={false} />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-brand-primary hover:bg-brand-primary/90">
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Import the missing components
import { Switch } from "@/components/ui/switch";
import { CheckSquare, BookOpen } from "lucide-react";

export default Profile;
