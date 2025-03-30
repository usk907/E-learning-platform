
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of machine learning algorithms and applications",
    image: "/placeholder.svg",
    instructor: "Dr. Sarah Chen",
    duration: "8 weeks",
    enrolled: 1240,
    rating: 4.8,
    category: "Computer Science"
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
    category: "Web Development"
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
    category: "Data Science"
  }
];

const FeaturedCourses = () => {
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
            <Button className="w-full bg-brand-secondary hover:bg-brand-secondary/90">
              View Course
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedCourses;
