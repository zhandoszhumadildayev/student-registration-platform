import { useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";
import { fetchCourses } from "../services/courseService";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

function SchedulePage() {
  const { addNotification } = useAuth();
  const { t } = useLanguage();

  const { data: apiCourses } = useFetch(fetchCourses, []);
  const [customCourses] = useLocalStorage("custom_courses", []);
  const [selectedCourseIds] = useLocalStorage("selected_course_ids", []);
  const [schedule, setSchedule] = useLocalStorage("student_schedule", []);

  const [form, setForm] = useState({
    courseId: "",
    day: "",
    time: ""
  });

  const [error, setError] = useState("");

  const myCourses = useMemo(() => {
    return [...apiCourses, ...customCourses].filter((course) =>
      selectedCourseIds.includes(course.id)
    );
  }, [apiCourses, customCourses, selectedCourseIds]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSchedule = (event) => {
    event.preventDefault();

    if (!form.courseId || !form.day || !form.time) {
      setError("Please select course, day and time.");
      return;
    }

    const selectedCourse = myCourses.find((course) => course.id === form.courseId);

    const newItem = {
      id: Date.now(),
      courseId: form.courseId,
      subject: selectedCourse?.title || "",
      day: form.day,
      time: form.time
    };

    setSchedule((prev) => [newItem, ...prev]);
    addNotification(`Schedule added: ${newItem.subject} on ${newItem.day}.`);

    setForm({
      courseId: "",
      day: "",
      time: ""
    });

    setError("");
  };

  const handleDeleteSchedule = (id) => {
    setSchedule((prev) => prev.filter((item) => item.id !== id));
    addNotification("Schedule item was deleted.");
  };

  return (
    <section className="stack">
      <div className="section-heading">
        <p className="section-label">{t.schedulePage}</p>
        <h2>{t.scheduleTitle}</h2>
        <p className="section-text">
          Choose courses from My Courses and create your weekly schedule.
        </p>
      </div>

      {myCourses.length === 0 && (
        <div className="panel">
          First select courses in the Courses page. Then you can create schedule here.
        </div>
      )}

      <form className="panel" onSubmit={handleAddSchedule}>
        <h3>{t.addScheduleItem}</h3>

        <div className="form-grid">
          <label>
            Course
            <select
              name="courseId"
              value={form.courseId}
              onChange={handleChange}
            >
              <option value="">Select course</option>
              {myCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            {t.day}
            <select name="day" value={form.day} onChange={handleChange}>
              <option value="">Select day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
          </label>

          <label>
            {t.time}
            <input
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
            />
          </label>
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit">{t.addToSchedule}</button>
      </form>

      <div className="table-card">
        <h3>{t.mySchedule}</h3>

        {schedule.length === 0 ? (
          <p className="muted">{t.noSchedule}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>{t.day}</th>
                <th>{t.time}</th>
                <th>{t.action}</th>
              </tr>
            </thead>

            <tbody>
              {schedule.map((item) => (
                <tr key={item.id}>
                  <td>{item.subject}</td>
                  <td>{item.day}</td>
                  <td>{item.time}</td>
                  <td>
                    <button
                      className="course-delete-btn"
                      type="button"
                      onClick={() => handleDeleteSchedule(item.id)}
                    >
                      {t.delete}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default SchedulePage;