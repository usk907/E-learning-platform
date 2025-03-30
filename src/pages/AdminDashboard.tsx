
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, MoreVertical, PenSquare, Trash2, BookOpen, Users, FileText, BarChart, PanelLeft, PanelLeftClose } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useSidebar } from "@/components/ui/sidebar";

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  category: string;
  duration: string;
  status: "published" | "draft";
  enrolledCount: number;
}

const AdminDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Introduction to Machine Learning",
      description: "Learn the fundamentals of machine learning algorithms and applications",
      instructor: "Dr. Sarah Chen",
      category: "Computer Science",
      duration: "8 weeks",
      status: "published",
      enrolledCount: 1240
    },
    {
      id: 2,
      title: "Advanced Web Development",
      description: "Master modern web technologies like React, Node.js and GraphQL",
      instructor: "Mark Johnson",
      category: "Web Development",
      duration: "10 weeks",
      status: "published",
      enrolledCount: 890
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      description: "Explore data analysis, visualization and statistical methods",
      instructor: "Dr. Michael Rodriguez",
      category: "Data Science",
      duration: "12 weeks",
      status: "draft",
      enrolledCount: 0
    }
  ]);
  
  const [isAddCourseDialogOpen, setIsAddCourseDialogOpen] = useState(false);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: "",
    description: "",
    instructor: "",
    category: "",
    duration: "",
    status: "draft"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const { toggleSidebar, open } = useSidebar();
  
  const { toast } = useToast();
  
  // Filter courses based on search query
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.description || !newCourse.instructor) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (editingCourseId) {
      // Update existing course
      setCourses(courses.map(course => 
        course.id === editingCourseId 
          ? { ...course, ...newCourse as Course } 
          : course
      ));
      
      toast({
        title: "Course Updated",
        description: `${newCourse.title} has been updated successfully.`,
      });
    } else {
      // Add new course
      const newId = Math.max(0, ...courses.map(c => c.id)) + 1;
      setCourses([...courses, { 
        ...newCourse as Course, 
        id: newId,
        enrolledCount: 0
      }]);
      
      toast({
        title: "Course Added",
        description: `${newCourse.title} has been added successfully.`,
      });
    }
    
    // Reset form
    setNewCourse({
      title: "",
      description: "",
      instructor: "",
      category: "",
      duration: "",
      status: "draft"
    });
    setEditingCourseId(null);
    setIsAddCourseDialogOpen(false);
  };
  
  const handleEditCourse = (course: Course) => {
    setNewCourse(course);
    setEditingCourseId(course.id);
    setIsAddCourseDialogOpen(true);
  };
  
  const handleDeleteCourse = (courseId: number) => {
    setCourses(courses.filter(course => course.id !== courseId));
    
    toast({
      title: "Course Deleted",
      description: "The course has been deleted successfully.",
    });
  };
  
  // Stats for admin dashboard
  const totalCourses = courses.length;
  const publishedCourses = courses.filter(course => course.status === "published").length;
  const totalStudents = courses.reduce((sum, course) => sum + course.enrolledCount, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="md:hidden"
          >
            {open ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage courses, students, and content
            </p>
          </div>
        </div>
        
        <Button 
          onClick={() => {
            setEditingCourseId(null);
            setNewCourse({
              title: "",
              description: "",
              instructor: "",
              category: "",
              duration: "",
              status: "draft"
            });
            setIsAddCourseDialogOpen(true);
          }}
          className="bg-brand-primary hover:bg-brand-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Course
        </Button>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCourses}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {publishedCourses} published, {totalCourses - publishedCourses} drafts
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all courses
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Course Materials</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">
              Videos, documents, and quizzes
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Course management tabs */}
      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Input
                type="search"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Course Management</CardTitle>
              <CardDescription>
                Add, edit, or remove courses from your platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        <TableCell>{course.duration}</TableCell>
                        <TableCell>
                          <Badge variant={course.status === "published" ? "default" : "outline"}>
                            {course.status === "published" ? "Published" : "Draft"}
                          </Badge>
                        </TableCell>
                        <TableCell>{course.enrolledCount}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditCourse(course)}>
                                <PenSquare className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteCourse(course.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No courses found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>
                View and manage student enrollments and progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded-md">
                <div className="flex flex-col items-center text-center p-4">
                  <Users className="h-10 w-10 text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium">Student Management Coming Soon</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This section will allow you to manage student accounts and track their progress
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>
                View detailed analytics and generate reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded-md">
                <div className="flex flex-col items-center text-center p-4">
                  <BarChart className="h-10 w-10 text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium">Reports Coming Soon</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This section will provide detailed analytics and reporting capabilities
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add/Edit Course Dialog */}
      <Dialog open={isAddCourseDialogOpen} onOpenChange={setIsAddCourseDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingCourseId ? "Edit Course" : "Add New Course"}</DialogTitle>
            <DialogDescription>
              {editingCourseId 
                ? "Update the course information below" 
                : "Fill in the details to create a new course"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="title">Course Title *</Label>
              <Input
                id="title"
                value={newCourse.title || ""}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                placeholder="Enter course title"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={newCourse.description || ""}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                placeholder="Enter course description"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="instructor">Instructor *</Label>
                <Input
                  id="instructor"
                  value={newCourse.instructor || ""}
                  onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                  placeholder="Enter instructor name"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newCourse.category || ""}
                  onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                  placeholder="Enter course category"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={newCourse.duration || ""}
                  onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                  placeholder="e.g., 8 weeks"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={newCourse.status || "draft"}
                  onChange={(e) => setNewCourse({ 
                    ...newCourse, 
                    status: e.target.value as "published" | "draft" 
                  })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCourseDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCourse} className="bg-brand-primary hover:bg-brand-primary/90">
              {editingCourseId ? "Save Changes" : "Add Course"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
