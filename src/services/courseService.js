const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function fetchCourses(signal) {
  const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error("Unable to load courses from API.");
  }

  const posts = await response.json();

  return posts.slice(0, 12).map((post) => ({
    id: String(post.id),
    title: post.title,
    category: post.id % 2 === 0 ? "Frontend" : "Backend",
    description: post.body
  }));
}
