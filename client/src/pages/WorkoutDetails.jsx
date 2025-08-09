import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

const WorkoutDetails = () => {
  const { workoutId } = useParams();
  const { user } = useAuth();
  const [workout, setWorkout] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWorkout = async () => {
    setLoading(true);
    try {
      const res = await API.get("/workouts/getMyWorkouts");
      console.log('WORKOUTS -----------------', res);
      console.log(workout);
      
      const data = res.data;
			
			const fetched = Array.isArray(data)
      ? data
      : Array.isArray(data.workouts)
      ? data.workouts
      : [];

      setWorkout(fetched);
      console.log(workout);
    } catch (err) {
      console.error("Error fetching workout:", err);
      toast.error("Failed to load blog workout.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkout();
  }, [workoutId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return toast.error("Comment cannot be empty");

    try {
      const res = await API.patch(`/workouts/workout/comment/${workoutId}`, {
        comment: commentText,
      });
      
      if (res.status !== 200) {
				throw new Error("Add comment failed");
			}
      
      toast.success("Comment added");
      setCommentText("");
      fetchWorkout();
    } catch (err) {
      console.error("Error adding comment:", err);
      toast.error("Failed to add comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await API.delete(`/workouts/workout/${workoutId}/comment/${commentId}`);
      
      if (res.status !== 200) {
				throw new Error("Add comment failed");
			}
      
      toast.success("Comment deleted");
      fetchWorkout();
    } catch (err) {
      console.error("Error deleting comment:", err);
      toast.error("Failed to delete comment");
    }
  };

  if (!workout) {
    return <div className="container py-4 text-center">Loading...</div>;
  }
  
  if (loading)
		return (
			<div className="text-center my-5 py-5">
				<div className="spinner-border m-3"></div>
				<p>Loading...</p>
			</div>
		);

  return (
    <div className="container py-5">
      <div className="mb-4">
        <Link to="/" className="btn btn-outline-secondary">
          ← Back to Blogs
        </Link>
      </div>

      <h1 className="mb-3">{workout.title}</h1>
      <p className="text-muted">
        By <strong>{workout.author || "Admin"}</strong> •{" "}
        {new Date(workout.createdAt).toLocaleDateString()}
      </p>

      <hr />

      <div className="mt-4" style={{ whiteSpace: "pre-line" }}>
        {workout.content}
      </div>

      {/* Comments Section */}
      <div className="mt-5">
        <h4 className="mb-3">Comments</h4>

        {/* List Comments */}
        {workout.comments?.length > 0 ? (
          <ul className="list-group mb-4">
            {workout.comments.map((cmt) => (
              <li key={cmt._id} className="list-group-item d-flex justify-content-between align-items-start">
                <div>
                  <strong>{cmt.userId || "Anonymous"}:</strong> {cmt.comment}
                  <br />
                  <small className="text-muted">{new Date(cmt.createdAt).toLocaleString()}</small>
                </div>
                {user?.isAdmin && (
                  <button
                    onClick={() => handleDeleteComment(cmt._id)}
                    className="btn btn-sm btn-danger ms-3"
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}

        {/* Add Comment Form */}
        {user ? (
          <form onSubmit={handleCommentSubmit}>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">Add a comment</label>
              <textarea
                id="comment"
                className="form-control"
                rows="3"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit Comment</button>
          </form>
        ) : (
          <p><Link to="/login">Log in</Link> to workout a comment.</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutDetails;
