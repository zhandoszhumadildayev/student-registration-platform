import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";
import { fetchCourses } from "../services/courseService";

function CourseDetailPage() {
  const { id } = useParams();
  const { data: apiCourses, loading, error } = useFetch(fetchCourses, []);
  const [customCourses] = useLocalStorage("custom_courses", []);

  const course = useMemo(() => {
    const allCourses = [...apiCourses, ...customCourses];
    return allCourses.find((item) => item.id === id);
  }, [apiCourses, customCourses, id]);

  if (loading) {
    return <div className="panel">Loading course details...</div>;
  }

  if (error) {
    return <div className="panel error-text">{error}</div>;
  }

  if (!course) {
    return (
      <div className="panel">
        <h2>Course not found</h2>
        <Link to="/dashboard/courses" className="link-button">
          Back to courses
        </Link>
      </div>
    );
  }

  return (
    <article className="panel">
      <h2>{course.title}</h2>
      <p className="tag">{course.category}</p>
      <p>{course.description}</p>

      <Link to="/dashboard/courses" className="link-button">
        Back to courses
      </Link>
    </article>
  );
}

export default CourseDetailPage;
