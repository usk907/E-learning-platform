
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, ArrowRight } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    progress: 68,
    image: "/placeholder.svg",
    lastAccessed: "2 hours ago",
    totalHours: 36,
    completedHours: 24.5,
  },
  {
    id: 2,
    title: "Advanced Web Development",
    progress: 42,
    image: "/placeholder.svg",
    lastAccessed: "Yesterday",
    totalHours: 48,
    completedHours: 20,
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    progress: 89,
    image: "/placeholder.svg",
    lastAccessed: "3 days ago",
    totalHours: 30,
    completedHours: 26.5,
  },
];

const RecentCourses = () => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Courses</CardTitle>
        <Button variant="ghost" size="sm" className="text-brand-primary">
          <span className="mr-1">View All</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded overflow-hidden shrink-0">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-medium line-clamp-1">{course.title}</h4>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{course.lastAccessed}</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-muted-foreground">
                      {course.completedHours}/{course.totalHours} hours
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentCourses;
