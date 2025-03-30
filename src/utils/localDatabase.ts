
import { v4 as uuidv4 } from 'uuid';

// Define types
export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  instructor: string;
  duration: string;
  enrolled: number;
  rating: number;
  category: string;
  createdAt: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  enrolledAt: string;
  lastAccessedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

// Initialize the database with default data if it doesn't exist
const initDatabase = () => {
  if (!localStorage.getItem('courses')) {
    const defaultCourses: Course[] = [
      {
        id: uuidv4(),
        title: "Introduction to Machine Learning",
        description: "Learn the fundamentals of machine learning algorithms and applications",
        image: "/placeholder.svg",
        instructor: "Dr. Sarah Chen",
        duration: "8 weeks",
        enrolled: 1240,
        rating: 4.8,
        category: "Computer Science",
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        title: "Advanced Web Development",
        description: "Master modern web technologies like React, Node.js and GraphQL",
        image: "/placeholder.svg",
        instructor: "Mark Johnson",
        duration: "10 weeks",
        enrolled: 890,
        rating: 4.7,
        category: "Web Development",
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        title: "Data Science Fundamentals",
        description: "Explore data analysis, visualization and statistical methods",
        image: "/placeholder.svg",
        instructor: "Dr. Michael Rodriguez",
        duration: "12 weeks",
        enrolled: 1650,
        rating: 4.9,
        category: "Data Science",
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        title: "Mobile App Development with Flutter",
        description: "Build cross-platform mobile applications with Flutter framework",
        image: "/placeholder.svg",
        instructor: "Jessica Williams",
        duration: "8 weeks",
        enrolled: 760,
        rating: 4.6,
        category: "Mobile Development",
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        title: "Artificial Intelligence Ethics",
        description: "Explore ethical considerations and implications of AI systems",
        image: "/placeholder.svg",
        instructor: "Dr. Robert Chen",
        duration: "6 weeks",
        enrolled: 520,
        rating: 4.5,
        category: "Computer Science",
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        title: "Blockchain Technology",
        description: "Understand blockchain principles and smart contract development",
        image: "/placeholder.svg",
        instructor: "Michael Anderson",
        duration: "8 weeks",
        enrolled: 680,
        rating: 4.4,
        category: "Blockchain",
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem('courses', JSON.stringify(defaultCourses));
  }

  if (!localStorage.getItem('enrollments')) {
    localStorage.setItem('enrollments', JSON.stringify([]));
  }

  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }

  if (!localStorage.getItem('currentUser')) {
    localStorage.setItem('currentUser', JSON.stringify(null));
  }
};

// Get all courses
export const getCourses = (): Course[] => {
  initDatabase();
  return JSON.parse(localStorage.getItem('courses') || '[]');
};

// Get course by id
export const getCourseById = (id: string): Course | undefined => {
  const courses = getCourses();
  return courses.find(course => course.id === id);
};

// Add a new course
export const addCourse = (course: Omit<Course, 'id' | 'createdAt'>): Course => {
  const courses = getCourses();
  const newCourse: Course = {
    ...course,
    id: uuidv4(),
    createdAt: new Date().toISOString()
  };
  localStorage.setItem('courses', JSON.stringify([...courses, newCourse]));
  return newCourse;
};

// Update a course
export const updateCourse = (id: string, updates: Partial<Course>): Course | undefined => {
  const courses = getCourses();
  const courseIndex = courses.findIndex(course => course.id === id);
  
  if (courseIndex === -1) return undefined;
  
  const updatedCourse = { ...courses[courseIndex], ...updates };
  courses[courseIndex] = updatedCourse;
  localStorage.setItem('courses', JSON.stringify(courses));
  
  return updatedCourse;
};

// Delete a course
export const deleteCourse = (id: string): boolean => {
  const courses = getCourses();
  const filteredCourses = courses.filter(course => course.id !== id);
  
  if (filteredCourses.length === courses.length) return false;
  
  localStorage.setItem('courses', JSON.stringify(filteredCourses));
  return true;
};

// Get all enrollments
export const getEnrollments = (): Enrollment[] => {
  initDatabase();
  return JSON.parse(localStorage.getItem('enrollments') || '[]');
};

// Get enrollments by user id
export const getEnrollmentsByUserId = (userId: string): Enrollment[] => {
  const enrollments = getEnrollments();
  return enrollments.filter(enrollment => enrollment.userId === userId);
};

// Get enrollment by user id and course id
export const getEnrollment = (userId: string, courseId: string): Enrollment | undefined => {
  const enrollments = getEnrollments();
  return enrollments.find(enrollment => enrollment.userId === userId && enrollment.courseId === courseId);
};

// Create a new enrollment
export const createEnrollment = (userId: string, courseId: string): Enrollment => {
  const enrollments = getEnrollments();
  
  // Check if already enrolled
  const existingEnrollment = enrollments.find(
    enrollment => enrollment.userId === userId && enrollment.courseId === courseId
  );
  
  if (existingEnrollment) return existingEnrollment;
  
  const newEnrollment: Enrollment = {
    id: uuidv4(),
    userId,
    courseId,
    progress: 0,
    enrolledAt: new Date().toISOString(),
    lastAccessedAt: new Date().toISOString()
  };
  
  localStorage.setItem('enrollments', JSON.stringify([...enrollments, newEnrollment]));
  
  // Update course enrollment count
  const course = getCourseById(courseId);
  if (course) {
    updateCourse(courseId, { enrolled: course.enrolled + 1 });
  }
  
  return newEnrollment;
};

// Update enrollment progress
export const updateEnrollmentProgress = (
  userId: string, 
  courseId: string, 
  progress: number
): Enrollment | undefined => {
  const enrollments = getEnrollments();
  const enrollmentIndex = enrollments.findIndex(
    enrollment => enrollment.userId === userId && enrollment.courseId === courseId
  );
  
  if (enrollmentIndex === -1) return undefined;
  
  const updatedEnrollment = { 
    ...enrollments[enrollmentIndex], 
    progress,
    lastAccessedAt: new Date().toISOString()
  };
  
  enrollments[enrollmentIndex] = updatedEnrollment;
  localStorage.setItem('enrollments', JSON.stringify(enrollments));
  
  return updatedEnrollment;
};

// User functions
export const getCurrentUser = (): User | null => {
  initDatabase();
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
};

export const setCurrentUser = (user: User | null): void => {
  localStorage.setItem('currentUser', JSON.stringify(user));
  
  // If there's a user and they don't exist in the users list, add them
  if (user) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!users.some((u: User) => u.id === user.id)) {
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }
};

// Get user by id
export const getUserById = (id: string): User | undefined => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users.find((user: User) => user.id === id);
};

export default {
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
  getEnrollments,
  getEnrollmentsByUserId,
  getEnrollment,
  createEnrollment,
  updateEnrollmentProgress,
  getCurrentUser,
  setCurrentUser,
  getUserById
};
