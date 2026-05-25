export function normalizeCourse(rawCourse) {
  return {
    id: rawCourse.id,
    title: rawCourse.title.trim(),
    category: rawCourse.category.trim(),
    description: rawCourse.description.trim()
  };
}
