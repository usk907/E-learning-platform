
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hello! I'm your AI learning assistant. How can I help you with your courses today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Simulate API call to Gemini API
      // In a real implementation, this would be a call to your backend which would call the Gemini API
      setTimeout(() => {
        const sampleResponses = [
          "Based on the course material, neural networks are computational models inspired by the structure of the human brain. They consist of layers of interconnected nodes or 'neurons' that process and transform input data to produce an output.",
          "In web development, React components follow a unidirectional data flow. Props are passed from parent to child components, and state is managed within components or through state management libraries like Redux or Context API.",
          "For your data science project, I recommend starting with exploratory data analysis (EDA). This will help you understand the dataset's structure, identify patterns, and spot any anomalies before applying machine learning algorithms.",
          "The difference between supervised and unsupervised learning is that supervised learning uses labeled data to train models, while unsupervised learning works with unlabeled data to discover patterns and relationships.",
        ];
        
        const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
        
        const botMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          content: randomResponse,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">AI Learning Assistant</h1>
        <p className="text-muted-foreground">
          Ask questions about your courses, get help with assignments, or explore new topics
        </p>
      </div>
      
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle>Chat with AI Assistant</CardTitle>
          <CardDescription>
            Powered by Gemini API to help with your learning journey
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-4 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[80%] md:max-w-[70%] ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar className={`h-8 w-8 ${message.role === "user" ? "ml-2" : "mr-2"}`}>
                      <AvatarFallback className={message.role === "assistant" ? "bg-brand-primary text-white" : ""}>
                        {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 text-sm ${
                        message.role === "user"
                          ? "bg-brand-primary text-white"
                          : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.role === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%] md:max-w-[70%]">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback className="bg-brand-primary text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-3 bg-muted">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        
        <CardFooter className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex w-full gap-2">
            <Input
              placeholder="Type your question here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} className="bg-brand-primary hover:bg-brand-primary/90">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Chat;
