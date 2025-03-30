
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Calendar, Users, Star, Play, FileText, CheckCircle, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Mock course data
const courseData = {
  id: 1,
  title: "Introduction to Machine Learning",
  description: "Learn the fundamentals of machine learning algorithms and applications through hands-on projects and real-world examples. This comprehensive course covers everything from basic concepts to advanced techniques.",
  image: "/placeholder.svg",
  instructor: {
    name: "Dr. Sarah Chen",
    avatar: "/placeholder.svg",
    bio: "AI Research Scientist with 10+ years of experience in machine learning and data science. Ph.D. in Computer Science from Stanford University.",
  },
  duration: "8 weeks",
  enrolled: 1240,
  rating: 4.8,
  totalReviews: 256,
  category: "Computer Science",
  tags: ["Machine Learning", "AI", "Data Science", "Python"],
  progress: 68,
  lastAccessed: "2 hours ago",
  modules: [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      description: "Overview of machine learning concepts and applications",
      lessons: [
        { id: 1, title: "What is Machine Learning?", duration: "15 mins", type: "video", completed: true },
        { id: 2, title: "Types of Machine Learning", duration: "20 mins", type: "video", completed: true },
        { id: 3, title: "Applications of ML", duration: "25 mins", type: "video", completed: true },
        { id: 4, title: "Module Quiz", duration: "15 mins", type: "quiz", completed: true },
      ],
    },
    {
      id: 2,
      title: "Supervised Learning",
      description: "Understand supervised learning algorithms and implementation",
      lessons: [
        { id: 5, title: "Linear Regression", duration: "30 mins", type: "video", completed: true },
        { id: 6, title: "Logistic Regression", duration: "25 mins", type: "video", completed: true },
        { id: 7, title: "Decision Trees", duration: "35 mins", type: "video", completed: false },
        { id: 8, title: "Support Vector Machines", duration: "40 mins", type: "video", completed: false },
        { id: 9, title: "Supervised Learning Assignment", duration: "1 hour", type: "assignment", completed: false },
      ],
    },
    {
      id: 3,
      title: "Unsupervised Learning",
      description: "Explore clustering, dimensionality reduction, and other unsupervised techniques",
      lessons: [
        { id: 10, title: "Clustering Algorithms", duration: "35 mins", type: "video", completed: false },
        { id: 11, title: "K-means Clustering", duration: "30 mins", type: "video", completed: false },
        { id: 12, title: "Principal Component Analysis", duration: "40 mins", type: "video", completed: false },
        { id: 13, title: "Unsupervised Learning Project", duration: "2 hours", type: "project", completed: false },
      ],
    },
  ],
};

const CourseDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  const [activeModule, setActiveModule] = useState(1);
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  
  // Calculate course stats
  const totalLessons = courseData.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = courseData.modules.reduce((acc, module) => acc + module.lessons.filter(lesson => lesson.completed).length, 0);
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
  
  const handleStartLearning = () => {
    // Find the first incomplete lesson
    for (const module of courseData.modules) {
      const incompleteLesson = module.lessons.find(lesson => !lesson.completed);
      if (incompleteLesson) {
        setActiveModule(module.id);
        setActiveLesson(incompleteLesson.id);
        break;
      }
    }
  };
  
  const handleLessonClick = (moduleId: number, lessonId: number) => {
    setActiveModule(moduleId);
    setActiveLesson(lessonId);
  };
  
  const handleMarkAsComplete = () => {
    toast({
      title: "Lesson Completed",
      description: "Your progress has been updated.",
    });
    
    // In a real app, this would update the lesson completion status
  };
  
  return (
    <div className="space-y-6">
      {/* Course Header */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-4">
            <img
              src={courseData.image}
              alt={courseData.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">{courseData.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {courseData.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-sm">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{courseData.duration}</span>
            </div>
            
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{courseData.enrolled.toLocaleString()} enrolled</span>
            </div>
            
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-400" />
              <span>{courseData.rating} ({courseData.totalReviews} reviews)</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>Last accessed {courseData.lastAccessed}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground">{courseData.description}</p>
        </div>
        
        {/* Course Sidebar */}
        <div className="lg:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{completedLessons} of {totalLessons} lessons completed</span>
                  <span className="font-medium">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              
              <div className="pt-2 pb-2">
                <h4 className="text-sm font-medium mb-2">Instructor</h4>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={courseData.instructor.avatar} />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{courseData.instructor.name}</p>
                    <p className="text-xs text-muted-foreground">{courseData.category}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-brand-primary hover:bg-brand-primary/90"
                onClick={handleStartLearning}
              >
                <Play className="h-4 w-4 mr-2" />
                Continue Learning
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-4">
            <Button variant="outline" className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask AI Assistant
            </Button>
          </div>
        </div>
      </div>
      
      {/* Course Content */}
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {courseData.modules.length} modules • {totalLessons} lessons • {courseData.duration}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {courseData.modules.map((module) => (
                  <div key={module.id} className="py-2">
                    <div className="px-6 py-3">
                      <div 
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => setActiveModule(activeModule === module.id ? 0 : module.id)}
                      >
                        <h3 className="font-medium">{module.title}</h3>
                        <div className="flex items-center text-xs">
                          <span className="text-muted-foreground mr-2">
                            {module.lessons.filter(l => l.completed).length}/{module.lessons.length} completed
                          </span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${activeModule === module.id ? "rotate-180" : ""}`} />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                    
                    {activeModule === module.id && (
                      <div className="bg-muted/50 px-6 py-2">
                        <ul className="space-y-1">
                          {module.lessons.map((lesson) => (
                            <li 
                              key={lesson.id}
                              className={`py-2 px-3 rounded-md flex justify-between items-center ${
                                activeLesson === lesson.id 
                                  ? "bg-brand-primary/10 text-brand-primary" 
                                  : "hover:bg-muted cursor-pointer"
                              }`}
                              onClick={() => handleLessonClick(module.id, lesson.id)}
                            >
                              <div className="flex items-center">
                                {lesson.completed 
                                  ? <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" /> 
                                  : lesson.type === "video" 
                                    ? <Play className="h-4 w-4 mr-2 flex-shrink-0" />
                                    : lesson.type === "quiz"
                                      ? <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                                      : <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                                }
                                <span className="text-sm">{lesson.title}</span>
                              </div>
                              <div className="flex items-center">
                                <Badge variant="outline" className="text-xs mr-2">
                                  {lesson.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
              <CardDescription>
                About this course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">
                    {courseData.description}
                  </p>
                  <p className="text-muted-foreground mt-2">
                    This course is designed for beginners who want to understand the fundamentals of machine learning. 
                    You'll learn how to implement various algorithms, work with datasets, and apply machine learning 
                    to solve real-world problems. By the end of this course, you'll have a solid understanding of 
                    both supervised and unsupervised learning techniques.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">What You'll Learn</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Understand core machine learning concepts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Implement supervised learning algorithms</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Build unsupervised learning models</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Work with real-world datasets</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Evaluate model performance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Apply ML to solve practical problems</span>
                    </li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Prerequisites</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                      <span>Basic understanding of programming concepts</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                      <span>Familiarity with Python programming language</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                      <span>Basic knowledge of statistics and probability</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="discussion">
          <Card>
            <CardHeader>
              <CardTitle>Discussion Forum</CardTitle>
              <CardDescription>
                Engage with other students and instructors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded-md">
                <div className="text-center p-4">
                  <MessageSquare className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <h3 className="text-lg font-medium">Discussion Forum</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This section will allow you to discuss course topics with fellow students
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Your Notes</CardTitle>
              <CardDescription>
                Keep track of important concepts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded-md">
                <div className="text-center p-4">
                  <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <h3 className="text-lg font-medium">Notes Feature</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This section will allow you to take and organize notes for the course
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Lesson Viewer (would be displayed when a lesson is selected) */}
      {activeLesson && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>
                  {courseData.modules
                    .find(m => m.id === activeModule)
                    ?.lessons.find(l => l.id === activeLesson)?.title}
                </CardTitle>
                <CardDescription>
                  Module: {courseData.modules.find(m => m.id === activeModule)?.title}
                </CardDescription>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleMarkAsComplete}>
                Mark as Complete
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <div className="text-center p-4">
                <Play className="h-16 w-16 text-muted-foreground/50 mx-auto mb-2" />
                <h3 className="text-lg font-medium">Lesson Content Placeholder</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This is where the actual lesson content would be displayed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Import missing components
import { ChevronDown, ArrowRight } from "lucide-react";

export default CourseDetail;
