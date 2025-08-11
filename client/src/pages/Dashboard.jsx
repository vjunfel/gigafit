import { useEffect, useState } from "react";
import { Table, Badge, Container, Button, Form, Row, Col } from "react-bootstrap";
import Axios from "../api";
import { toast } from "react-toastify";
import ProfileComponent from "../components/ProfileComponent";
import CompletedWorkouts from "../components/CompletedWorkouts";

// Status color mapping
const getStatusVariant = (status) => {
  switch (status) {
    case "completed":
      return "success";
    case "pending":
      return "warning";
    case "missed":
      return "danger";
    default:
      return "secondary";
  }
};

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    name: "",
    duration: "",
    status: "pending",
  });
  
  const fetchWorkouts = async () => {
    try {
      const res = await Axios.get("/workouts/getMyWorkouts");
      const data = res.data;
			
			const fetched = Array.isArray(data)
      ? data
      : Array.isArray(data.workouts)
      ? data.workouts
      : [];

      setWorkouts(fetched);
      } catch (err) {
        console.error("Error fetching workouts:", err);
        setWorkouts([]); 
      }
    };

  const handleAddWorkout = async () => {
    if (!newWorkout.name) return toast.error(`Workout name is required!`);
    if (!newWorkout.duration) return toast.error(`Duration is required!`);
    
    try {
      const res = await Axios.post("/workouts/addWorkout", newWorkout);
      
      if (res.status !== 201) {
				throw new Error("Adding failed");
			}

      setWorkouts([...workouts, res.data]);
      setNewWorkout({ name: "", duration: "", status: "pending" });
      fetchWorkouts();
    } catch (err) {
      console.error("Error adding workout:", err);
      toast.error(err || "Adding failed");
    }
  };

  const handleStatusChange = async (workoutData) => {
    try {
      const res = await Axios.patch(`/workouts/updateWorkout`, { 
        _id: workoutData._id,
        name: workoutData.name,
        status: workoutData.status,
        dateAdded: workoutData.dateAdded,
       });
       
      setWorkouts((prev) =>
        prev.map((w) => (w._id === workoutData._id ? { ...w, status: res.data.status } : w))
      );
      fetchWorkouts();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (workoutId) => {
    try {
      const res = await Axios.delete(`/workouts/deleteWorkout`, { data: {_id: workoutId }});
      if (res.status !== 200) {
				throw new Error("Deleting failed");
			}
      
      setWorkouts((prev) => prev.filter((w) => w._id !== workoutId));
      fetchWorkouts();
    } catch (err) {
      console.error("Error deleting workout:", err);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <Container className="py-5">
      <ProfileComponent />
      
      <h2 className="mb-4">Your Workout List</h2>

      {/* Add Workout Form */}
      <Row className="mb-4 d-flex gap-2 gap-md-0">
        <Col md={3}>
          <Form.Control
            placeholder="Workout name"
            value={newWorkout.name}
            onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
            required
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="number"
            placeholder="Duration (e.g. 30 mins)"
            value={newWorkout.duration}
            onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })}
          />
        </Col>
        <Col md={2}>
          <Form.Select
            value={newWorkout.status}
            onChange={(e) => setNewWorkout({ ...newWorkout, status: e.target.value })}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="missed">Missed</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button 
            onClick={handleAddWorkout} 
            disabled={!newWorkout.name || !newWorkout.duration}
          >
            Add Workout
          </Button>
        </Col>
      </Row>

      {/* Workout Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Workout Name</th>
            <th>Duration <span>(minutes)</span></th>
            <th>Date Added</th>
            <th>Status</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
           {Array.isArray(workouts) && workouts.length > 0 ? (
            workouts.map((workout, index) => (
            <tr key={workout._id || index }>
              <td>{index + 1}</td>
              <td>{workout.name}</td>
              <td>{workout.duration}</td>
              <td>{new Date(workout.dateAdded).toLocaleDateString()}</td>
              <td>
                <Badge bg={getStatusVariant(workout.status)} className="text-uppercase">
                  {workout.status}
                </Badge>
              </td>
              <td>
                <Form.Select
                  value={workout.status}
                  onChange={(e) => handleStatusChange({
                    _id: workout._id,
                    name:workout.name, 
                    duration: workout.duration, 
                    status: e.target.value,
                    dateAdded: new Date(workout.dateAdded).toLocaleDateString()
                  })}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="missed">Missed</option>
                </Form.Select>
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(workout._id)}>
                  Delete
                </Button>
              </td>
            </tr>
            ))) : (
            <tr>
              <td colSpan="7" className="text-center">
                No workouts found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      
      {/* <CompletedWorkouts workouts={workouts}/> */} 
    </Container>
  );
};

export default Dashboard;
