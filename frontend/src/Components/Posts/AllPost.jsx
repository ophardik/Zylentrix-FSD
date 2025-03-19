import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("/post/allPost", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-cache",
        });
        setPosts(response.data.allPosts);
      } catch (error) {
        toast.error("Failed to fetch posts");
      }
    };

    fetchPosts();
  }, []);

  const handleEditClick = (post) => {
    setEditingPostId(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleUpdate = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `/post/updatePost/${id}`,
        { title: editTitle, content: editContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Post updated successfully!");
      setPosts(
        posts.map((post) =>
          post._id === id ? { ...post, title: editTitle, content: editContent } : post
        )
      );
      setEditingPostId(null);
    } catch (error) {
      toast.error("Unauthorized! Please log in again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`/post/deletePost/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Post deleted successfully!");
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      toast.error("Unauthorized! Please log in again.");
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="text-center mb-4">All Posts</h2>

      <div className="row">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="col-md-4 mb-3" key={post._id}>
              <div className="card shadow p-3">
                {editingPostId === post._id ? (
                  <>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <textarea
                      className="form-control mb-2"
                      rows="3"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    ></textarea>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleUpdate(post._id)}
                    >
                      ✅ Save
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingPostId(null)}>
                      ❌ Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h5>{post.title}</h5>
                    <p>{post.content}</p>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(post)}>
                        ✏️ Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(post._id)}>
                        🗑️ Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Posts;
