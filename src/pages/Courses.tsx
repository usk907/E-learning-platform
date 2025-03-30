
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Clock, Users, Star, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  instructor: string;
  duration: string;
  enrolled: number;
  rating: number;
  category: string;
  progress?: number;
}

const Courses = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  
  const allCourses: Course[] = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      description: "Learn the fundamentals of machine learning algorithms and applications",
      image: "/placeholder.svg",
      instructor: "Dr. Sarah Chen",
      duration: "8 weeks",
      enrolled: 1240,
      rating: 4.8,
      category: "Computer Science",
      progress: 68
    },
    {
      id: 2,
      title: "Advanced Web Development",
      description: "Master modern web technologies like React, Node.js and GraphQL",
      image: "/placeholder.svg",
      instructor: "Mark Johnson",
      duration: "10 weeks",
      enrolled: 890,
      rating: 4.7,
      category: "Web Development",
      progress: 42
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      description: "Explore data analysis, visualization and statistical methods",
      image: "/placeholder.svg",
      instructor: "Dr. Michael Rodriguez",
      duration: "12 weeks",
      enrolled: 1650,
      rating: 4.9,
      category: "Data Science",
      progress: 89
    },
    {
      id: 4,
      title: "Mobile App Development with Flutter",
      description: "Build cross-platform mobile applications with Flutter framework",
      image: "/placeholder.svg",
      instructor: "Jessica Williams",
      duration: "8 weeks",
      enrolled: 760,
      rating: 4.6,
      category: "Mobile Development"
    },
    {
      id: 5,
      title: "Artificial Intelligence Ethics",
      description: "Explore ethical considerations and implications of AI systems",
      image: "/placeholder.svg",
      instructor: "Dr. Robert Chen",
      duration: "6 weeks",
      enrolled: 520,
      rating: 4.5,
      category: "Computer Science"
    },
    {
      id: 6,
      title: "Blockchain Technology",
      description: "Understand blockchain principles and smart contract development",
      image: "/placeholder.svg",
      instructor: "Michael Anderson",
      duration: "8 weeks",
      enrolled: 680,
      rating: 4.4,
      category: "Blockchain"
    }
  ];
  
  const myEnrolledCourses = allCourses.filter(course => course.progress !== undefined);
  
  const filteredCourses = (courses: Course[]) => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = category === "all" || course.category === category;
      
      return matchesSearch && matchesCategory;
    });
  };
  
  const categories = ["Computer Science", "Web Development", "Data Science", "Mobile Development", "Blockchain"];
  
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
              <Card key={course.id} className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
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
                  
                  {course.progress !== undefined && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-1.5" />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-brand-secondary hover:bg-brand-secondary/90"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    {course.progress !== undefined ? "Continue Learning" : "Enroll Now"}
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
                <Card key={course.id} className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
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
                      onClick={() => navigate(`/courses/${course.id}`)}
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
