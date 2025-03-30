
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star } from "lucide-react";
import { Course, getCourses } from "@/utils/localDatabase";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get all courses and take the top 3 with highest ratings
    const allCourses = getCourses();
    const featuredCourses = [...allCourses]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    
    setCourses(featuredCourses);
  }, []);

  const handleViewCourse = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
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
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-brand-secondary hover:bg-brand-secondary/90"
              onClick={() => handleViewCourse(course.id)}
            >
              View Course
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedCourses;
