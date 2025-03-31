
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Clock, Users, Star, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Course, Enrollment, getCurrentUser, getCourses, getEnrollmentsByUserId, createEnrollment } from "@/utils/localDatabase";

// Define an interface for courses with progress information
interface CourseWithProgress extends Course {
  progress: number;
}

const Courses = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [myEnrollments, setMyEnrollments] = useState<Enrollment[]>([]);
  const { toast } = useToast();
  
  // Load courses and enrollments on component mount
  useEffect(() => {
    // Get all courses
    const courses = getCourses();
    setAllCourses(courses);
    
    // Get current user's enrollments
    const currentUser = getCurrentUser();
    if (currentUser) {
      const enrollments = getEnrollmentsByUserId(currentUser.id);
      setMyEnrollments(enrollments);
    }
  }, []);
  
  // Filter courses based on search query and category
  const filteredCourses = (courses: Course[]) => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = category === "all" || course.category === category;
      
      return matchesSearch && matchesCategory;
    });
  };
  
  // Get my enrolled courses with progress information
  const getMyEnrolledCourses = (): CourseWithProgress[] => {
    return allCourses.filter(course => 
      myEnrollments.some(enrollment => enrollment.courseId === course.id)
    ).map(course => {
      const enrollment = myEnrollments.find(e => e.courseId === course.id);
      return {
        ...course,
        progress: enrollment?.progress || 0
      };
    });
  };
  
  const myEnrolledCourses = getMyEnrolledCourses();
  
  // Extract unique categories from courses
  const categories = [...new Set(allCourses.map(course => course.category))];
  
  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };
  
  const handleEnrollClick = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please log in to enroll in courses",
        variant: "destructive"
      });
      return;
    }
    
    // Enroll the user in the course
    createEnrollment(currentUser.id, courseId);
    
    // Update the enrollments list
    const enrollments = getEnrollmentsByUserId(currentUser.id);
    setMyEnrollments(enrollments);
    
    toast({
      title: "Enrollment successful",
      description: "You have been enrolled in the course",
    });
    
    navigate(`/courses/${courseId}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">
            Browse and manage your learning journey
          </p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses, instructors..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="sm:w-auto flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={category === "all" ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setCategory("all")}
        >
          All Categories
        </Badge>
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant={category === cat ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setCategory(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="my">My Courses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses(allCourses).map((course) => (
              <Card 
                key={course.id} 
                className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleCourseClick(course.id)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="bg-brand-primary/10 text-brand-primary border-brand-primary/20">
                      {course.category}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl mt-2">{course.title}</CardTitle>
                  <CardDescription className="text-sm text-foreground/80">
                    Instructor: {course.instructor}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm mb-4">{course.description}</p>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{course.enrolled.toLocaleString()} students</span>
                    </div>
                  </div>
                  
                  {myEnrollments.some(e => e.courseId === course.id) && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">
                          {myEnrollments.find(e => e.courseId === course.id)?.progress || 0}%
                        </span>
                      </div>
                      <Progress 
                        value={myEnrollments.find(e => e.courseId === course.id)?.progress || 0} 
                        className="h-1.5" 
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-brand-secondary hover:bg-brand-secondary/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      myEnrollments.some(enrollment => enrollment.courseId === course.id)
                        ? navigate(`/courses/${course.id}`)
                        : handleEnrollClick(e, course.id);
                    }}
                  >
                    {myEnrollments.some(enrollment => enrollment.courseId === course.id) 
                      ? "Continue Learning" 
                      : "Enroll Now"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="my" className="space-y-4">
          {filteredCourses(myEnrolledCourses).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses(myEnrolledCourses).map((course) => (
                <Card 
                  key={course.id} 
                  className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleCourseClick(course.id)}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="bg-brand-primary/10 text-brand-primary border-brand-primary/20">
                        {course.category}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl mt-2">{course.title}</CardTitle>
                    <CardDescription className="text-sm text-foreground/80">
                      Instructor: {course.instructor}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm mb-4">{course.description}</p>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.enrolled.toLocaleString()} students</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-1.5" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-brand-secondary hover:bg-brand-secondary/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/courses/${course.id}`);
                      }}
                    >
                      Continue Learning
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || category !== "all" 
                  ? "Try adjusting your search or filters" 
                  : "You haven't enrolled in any courses yet"}
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setCategory("all");
              }}>
                Browse Courses
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Courses;
