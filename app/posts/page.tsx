"use client";

import { useEffect, useState } from "react";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch posts
  async function loadPosts() {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  }

  // Load posts on page load
  useEffect(() => {
    loadPosts();
  }, []);

  // Create new post
  async function createPost(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);

    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title }),
    });

    setTitle("");
    setLoading(false);

    loadPosts(); // refresh list
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>

      {/* Create post form */}
      <form onSubmit={createPost} className="flex gap-3 mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New post title..."
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      {/* Posts list */}
      <ul className="space-y-4">
        {posts.map((post: any) => (
          <li
            key={post.id}
            className="border p-4 rounded bg-white shadow-sm"
          >
            <p className="text-gray-600 font-medium">{post.title}</p>
            <p className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </li>
        ))}

        {posts.length === 0 && (
          <p className="text-gray-500">No posts yet.</p>
        )}
      </ul>
    </div>
  );
}
