import { Table, Badge } from "react-bootstrap";

const CompletedWorkouts = ({ workouts }) => {
  const completed = workouts.filter(w => w.status === "completed");

  return (
    <>
      <h4 className="mt-5 mb-3">Completed Workouts</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Duration</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {completed.map((workout, idx) => (
            <tr key={workout._id}>
              <td>{idx + 1}</td>
              <td>{workout.name}</td>
              <td>{workout.duration}</td>
              <td>{new Date(workout.dateAdded).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default CompletedWorkouts;
