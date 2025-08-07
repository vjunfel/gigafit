import React, { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import Axios from "../api";

const CompletedWorkouts = () => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const res = await Axios.get("/workouts/getMyWorkouts");
        const filtered = res.data.filter((w) => w.status === "completed");
        setCompleted(filtered);
      } catch (err) {
        console.error("Error fetching completed workouts:", err);
      }
    };
    fetchCompleted();
  }, []);

  return (
    <Container className="py-4">
      <h3>Completed Workouts</h3>
      <ListGroup>
        {completed.map((workout) => (
          <ListGroup.Item key={workout._id}>
            {workout.name} — {workout.duration}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default CompletedWorkouts;
