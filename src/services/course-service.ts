import courseData = require("../../data/static-data/courses");
import { type Course } from "../models/course";

class CourseService {
  getCourseById(courseId: number): Course | undefined {
    return courseData.find((course) => course.id === courseId);
  }
}

export = CourseService;
