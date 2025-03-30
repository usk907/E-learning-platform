
import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type AttendanceStatus = "present" | "absent" | "late" | "excused" | null;

interface AttendanceRecord {
  date: Date;
  status: AttendanceStatus;
  course: string;
}

const Attendance = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  
  // Sample attendance data for demonstration
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    { date: new Date(2023, 9, 2), status: "present", course: "Introduction to Machine Learning" },
    { date: new Date(2023, 9, 3), status: "present", course: "Advanced Web Development" },
    { date: new Date(2023, 9, 4), status: "late", course: "Data Science Fundamentals" },
    { date: new Date(2023, 9, 9), status: "present", course: "Introduction to Machine Learning" },
    { date: new Date(2023, 9, 10), status: "absent", course: "Advanced Web Development" },
    { date: new Date(2023, 9, 11), status: "excused", course: "Data Science Fundamentals" },
    { date: new Date(2023, 9, 16), status: "present", course: "Introduction to Machine Learning" },
    { date: new Date(2023, 9, 17), status: "present", course: "Advanced Web Development" },
    { date: new Date(2023, 9, 18), status: "present", course: "Data Science Fundamentals" },
  ]);
  
  const courses = [
    "Introduction to Machine Learning", 
    "Advanced Web Development", 
    "Data Science Fundamentals"
  ];
  
  // Get attendance stats for the selected month and course
  const getAttendanceStats = () => {
    const filteredRecords = selectedCourse === "all" 
      ? attendanceRecords 
      : attendanceRecords.filter(record => record.course === selectedCourse);
    
    const total = filteredRecords.length;
    const present = filteredRecords.filter(record => record.status === "present").length;
    const late = filteredRecords.filter(record => record.status === "late").length;
    const absent = filteredRecords.filter(record => record.status === "absent").length;
    const excused = filteredRecords.filter(record => record.status === "excused").length;
    
    const attendanceRate = total > 0 ? Math.round((present + late) / total * 100) : 0;
    
    return { total, present, late, absent, excused, attendanceRate };
  };
  
  const stats = getAttendanceStats();
  
  const renderDayContents = (day: Date) => {
    // Find attendance for this day
    const record = attendanceRecords.find(r => 
      r.date.getDate() === day.getDate() && 
      r.date.getMonth() === day.getMonth() && 
      r.date.getFullYear() === day.getFullYear() &&
      (selectedCourse === "all" || r.course === selectedCourse)
    );
    
    if (!record) return null;
    
    let bgColor = "";
    switch (record.status) {
      case "present":
        bgColor = "bg-green-500";
        break;
      case "late":
        bgColor = "bg-yellow-500";
        break;
      case "absent":
        bgColor = "bg-red-500";
        break;
      case "excused":
        bgColor = "bg-blue-500";
        break;
    }
    
    return (
      <div className="absolute bottom-0 left-0 right-0 h-1.5 rounded-b-md" style={{ backgroundColor: bgColor ? bgColor : "transparent" }}></div>
    );
  };
  
  const prevMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
  };
  
  const nextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance Tracker</h1>
          <p className="text-muted-foreground">
            Keep track of your attendance and performance
          </p>
        </div>
        
        <div className="w-full md:w-auto">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-full md:w-[240px]">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Attendance Calendar</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium">
                  {date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </div>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>
              View and track your attendance for each class
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => setDate(date || new Date())}
              className="rounded-md border"
              components={{
                DayContent: ({ date }) => (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <span>{date.getDate()}</span>
                    {renderDayContents(date)}
                  </div>
                ),
              }}
            />
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1.5"></div>
                <span className="text-sm">Present</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1.5"></div>
                <span className="text-sm">Late</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></div>
                <span className="text-sm">Absent</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1.5"></div>
                <span className="text-sm">Excused</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
            <CardDescription>
              {selectedCourse === "all" ? "All courses" : selectedCourse}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Attendance Rate</span>
                <Badge className="bg-brand-primary hover:bg-brand-primary/90">{stats.attendanceRate}%</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Classes</span>
                  <span className="font-medium">{stats.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Present</span>
                  <span className="font-medium text-green-600">{stats.present}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Late</span>
                  <span className="font-medium text-yellow-600">{stats.late}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Absent</span>
                  <span className="font-medium text-red-600">{stats.absent}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Excused</span>
                  <span className="font-medium text-blue-600">{stats.excused}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Monthly Progress</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>September</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>October</span>
                      <span>{stats.attendanceRate}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: `${stats.attendanceRate}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Attendance;
