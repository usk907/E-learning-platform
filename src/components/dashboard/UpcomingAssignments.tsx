
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ClipboardCheck, ArrowRight } from "lucide-react";

const assignments = [
  {
    id: 1,
    title: "Machine Learning Quiz",
    course: "Introduction to Machine Learning",
    dueDate: "Tomorrow, 11:59 PM",
    status: "pending"
  },
  {
    id: 2,
    title: "React Component Assignment",
    course: "Advanced Web Development",
    dueDate: "Oct 15, 11:59 PM",
    status: "pending"
  },
  {
    id: 3,
    title: "Data Visualization Project",
    course: "Data Science Fundamentals",
    dueDate: "Oct 20, 11:59 PM",
    status: "pending"
  },
  {
    id: 4,
    title: "Neural Networks Quiz",
    course: "Introduction to Machine Learning",
    dueDate: "Completed on Oct 5",
    status: "completed"
  }
];

const UpcomingAssignments = () => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Upcoming Assignments</CardTitle>
        <Button variant="ghost" size="sm" className="text-brand-primary">
          <span className="mr-1">View All</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <ClipboardCheck className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">{assignment.title}</h4>
                  <Badge variant={assignment.status === "completed" ? "outline" : "default"} className={assignment.status === "completed" ? "bg-green-100 text-green-800 border-green-200" : ""}>
                    {assignment.status === "completed" ? "Completed" : "Pending"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{assignment.course}</p>
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{assignment.dueDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAssignments;
