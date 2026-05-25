import { useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";
import { fetchCourses } from "../services/courseService";
import { normalizeCourse } from "../utils/courseHelpers";
import SearchFilterBar from "../components/SearchFilterBar";
import StatsPanel from "../components/StatsPanel";
import AddCourseForm from "../components/AddCourseForm";
import CourseCard from "../components/CourseCard";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

function CoursesPage() {
  const { addNotification } = useAuth();
  const { t } = useLanguage();

  const { data: apiCourses, loading, error } = useFetch(fetchCourses, []);

  const [customCourses, setCustomCourses] = useLocalStorage("custom_courses", []);
  const [deletedCourseIds, setDeletedCourseIds] = useLocalStorage(
    "deleted_course_ids",
    []
  );

  const [selectedCourseIds, setSelectedCourseIds] = useLocalStorage(
    "selected_course_ids",
    []
  );

  const [search, setSearch] = useLocalStorage("course_search", "");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [feedback, setFeedback] = useState("");

  const allCourses = useMemo(() => {
    return [...apiCourses, ...customCourses].filter(
      (course) => !deletedCourseIds.includes(course.id)
    );
  }, [apiCourses, customCourses, deletedCourseIds]);

  const filteredCourses = useMemo(() => {
    return allCourses
      .filter((course) =>
        course.title.toLowerCase().includes(search.trim().toLowerCase())
      )
      .filter((course) =>
        selectedCategory === "All" ? true : course.category === selectedCategory
      );
  }, [allCourses, search, selectedCategory]);

  const myCourses = useMemo(() => {
    return allCourses.filter((course) => selectedCourseIds.includes(course.id));
  }, [allCourses, selectedCourseIds]);

  const handleAddCourse = (form) => {
    const newCourse = normalizeCourse({
      ...form,
      id: `custom-${Date.now()}`
    });

    setCustomCourses((previous) => [newCourse, ...previous]);
    setFeedback(t.courseAdded);
    addNotification(`Course registered: ${form.title}.`);
  };

  const handleToggleCourse = (courseId) => {
    const isSelected = selectedCourseIds.includes(courseId);

    if (isSelected) {
      setSelectedCourseIds((previous) =>
        previous.filter((id) => id !== courseId)
      );
      addNotification("You unsubscribed from a course.");
    } else {
      setSelectedCourseIds((previous) => [...previous, courseId]);
      addNotification("You registered for a course.");
    }
  };

  const handleDeleteCourse = (courseId) => {
    const isCustomCourse = String(courseId).startsWith("custom-");

    if (isCustomCourse) {
      setCustomCourses((previous) =>
        previous.filter((course) => course.id !== courseId)
      );
    } else {
      setDeletedCourseIds((previous) => [...previous, courseId]);
    }

    setSelectedCourseIds((previous) =>
      previous.filter((id) => id !== courseId)
    );

    setFeedback(t.courseDeleted);
    addNotification("Course was removed from the list.");
  };

  return (
    <section className="stack">
      <div className="section-heading">
        <div>
          <p className="section-label">{t.courseManagement}</p>
          <h2>{t.courseTitle}</h2>
          <p className="section-text">{t.courseText}</p>
        </div>
      </div>

      <StatsPanel
        totalCourses={allCourses.length}
        visibleCourses={filteredCourses.length}
        selectedTitle={`${myCourses.length} selected`}
      />

      {myCourses.length > 0 && (
        <div className="my-courses-box">
          <div>
            <p className="section-label">My courses</p>
            <h3>Selected courses</h3>
          </div>

          <div className="my-courses-list">
            {myCourses.map((course) => (
              <span key={course.id} className="my-course-pill">
                {course.title}
              </span>
            ))}
          </div>
        </div>
      )}

      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <AddCourseForm onAddCourse={handleAddCourse} />

      {feedback && <p className="success-text">{feedback}</p>}

      {loading && <div className="panel">{t.loadingCourses}</div>}

      {error && <div className="panel error-text">{error}</div>}

      {!loading && !error && filteredCourses.length === 0 && (
        <div className="panel">{t.noCoursesFound}</div>
      )}

      <div className="courses-grid-modern">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            selectedCourseIds={selectedCourseIds}
            onToggleCourse={handleToggleCourse}
            onDeleteCourse={handleDeleteCourse}
          />
        ))}
      </div>
    </section>
  );
}

export default CoursesPage;