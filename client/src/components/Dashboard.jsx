import React, { useEffect, useState } from "react";
import { Table, Badge, Container, Button, Form, Row, Col } from "react-bootstrap";
import Axios from "../api";

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
      setWorkouts(res.data);
			console.log(res);
			
			if (Array.isArray(res.data)) {
				setWorkouts(res.data);
			} else if (Array.isArray(res.data.workouts)) {
				setWorkouts(res.data.workouts);
			} else {
				console.warn("Unexpected response format:", res.data);
				setWorkouts([]);
			}
    } catch (err) {
      console.error("Error fetching workouts:", err);
    }
  };

  const handleAddWorkout = async () => {
    try {
      const res = await Axios.post("/workouts/addWorkout", newWorkout);
      setWorkouts([...workouts, res.data]);
      setNewWorkout({ name: "", duration: "", status: "pending" });
    } catch (err) {
      console.error("Error adding workout:", err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await Axios.patch(`/workouts/updateWorkout/${id}`, { status });
      setWorkouts((prev) =>
        prev.map((w) => (w._id === id ? { ...w, status: res.data.status } : w))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`/workouts/deleteWorkout/${id}`);
      setWorkouts((prev) => prev.filter((w) => w._id !== id));
    } catch (err) {
      console.error("Error deleting workout:", err);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <Container className="py-5">
      <h2 className="mb-4">Your Workout List</h2>

      {/* Add Workout Form */}
      <Row className="mb-4">
        <Col md={3}>
          <Form.Control
            placeholder="Workout name"
            value={newWorkout.name}
            onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
          />
        </Col>
        <Col md={2}>
          <Form.Control
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
          <Button onClick={handleAddWorkout}>Add Workout</Button>
        </Col>
      </Row>

      {/* Workout Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Workout Name</th>
            <th>Duration</th>
            <th>Date Added</th>
            <th>Status</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, index) => (
            <tr key={workout._id}>
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
                  onChange={(e) => handleStatusChange(workout._id, e.target.value)}
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
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;
