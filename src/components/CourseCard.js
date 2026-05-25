import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function CourseCard({ course, selectedCourseIds, onToggleCourse, onDeleteCourse }) {
  const { t } = useLanguage();

  const isSelected = selectedCourseIds.includes(course.id);

  const categoryIcon =
    course.category === "Frontend"
      ? "🎨"
      : course.category === "Backend"
      ? "⚙️"
      : "📘";

  return (
    <div className={`course-card-premium ${isSelected ? "course-card-selected" : ""}`}>
      {isSelected && <div className="selected-ribbon">{t.chosen}</div>}

      <div className="course-card-top">
        <div className="course-icon-wrap">{categoryIcon}</div>

        <button
          className="course-delete-btn"
          type="button"
          onClick={() => onDeleteCourse(course.id)}
        >
          {t.delete}
        </button>
      </div>

      <div className="course-badge-row">
        <span className={`course-category-badge badge-${course.category.toLowerCase()}`}>
          {course.category}
        </span>
      </div>

      <h3 className="course-title">{course.title}</h3>

      <p className="course-description">
        {course.description.length > 120
          ? `${course.description.slice(0, 120)}...`
          : course.description}
      </p>

      <div className="course-card-actions">
        <button
          type="button"
          className="course-select-btn"
          onClick={() => onToggleCourse(course.id)}
        >
          {isSelected ? "Unsubscribe" : t.select}
        </button>

        <Link className="course-details-btn" to={`/dashboard/courses/${course.id}`}>
          {t.details}
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;