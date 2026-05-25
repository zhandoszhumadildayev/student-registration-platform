import { useState } from "react";

const initialValues = {
  title: "",
  category: "Custom",
  description: ""
};

function AddCourseForm({ onAddCourse }) {
  const [form, setForm] = useState(initialValues);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.category.trim() || !form.description.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    onAddCourse(form);
    setForm(initialValues);
    setError("");
  };

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h3>Add new course</h3>

      <div className="form-grid">
        <label>
          Title
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="React Fundamentals"
          />
        </label>

        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="Custom">Custom</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </label>
      </div>

      <label>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Write a short description..."
          rows="4"
        />
      </label>

      {error && <p className="error-text">{error}</p>}

      <button type="submit">Add course</button>
    </form>
  );
}

export default AddCourseForm;
