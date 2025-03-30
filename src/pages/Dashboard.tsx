
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Calendar, Clock, GraduationCap, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import RecentCourses from "@/components/dashboard/RecentCourses";
import UpcomingAssignments from "@/components/dashboard/UpcomingAssignments";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
        <Button className="bg-brand-primary hover:bg-brand-primary/90">View All Courses</Button>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground mt-1">2 in progress</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Hours Learned</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.5</div>
            <p className="text-xs text-muted-foreground mt-1">+12.4 this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">4 pending</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <Progress value={92} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>
      
      {/* Performance overview */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Your learning progress across all courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center border rounded-md">
            <div className="flex flex-col items-center text-center p-4">
              <BarChart className="h-10 w-10 text-gray-400 mb-2" />
              <h3 className="text-lg font-medium">Performance Chart Placeholder</h3>
              <p className="text-sm text-muted-foreground mt-1">
                This will display your performance analytics with charts and graphs
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Two-column layout for recent activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentCourses />
        <UpcomingAssignments />
      </div>
    </div>
  );
};

export default Dashboard;
