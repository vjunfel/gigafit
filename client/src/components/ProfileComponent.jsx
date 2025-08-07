import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const ProfileComponent = () => {
  const { user } = useAuth();
  
  const userInfo = {
    name: "John Doe",
    email: "john@example.com",
    membership: "Pro Member",
    joined: "January 2024",
    avatar: "https://i.pravatar.cc/150?img=68", // Replace with real avatar URL
  };
  
  console.log(user);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <Row className="align-items-center">
                <Col md={4} className="text-center mb-3 mb-md-0">
                  <img
                    src={userInfo.avatar}
                    alt="User avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                </Col>
                <Col md={8}>
                  <h3 className="fw-bold mb-2">{user.firstName}</h3>
                  <p className="text-muted mb-1">{user.email}</p>
                  <p className="mb-2">
                    <strong>Membership:</strong> {userInfo.membership}
                  </p>
                  <p className="mb-4">
                    <strong>Joined:</strong> {user.joined}
                  </p>
                  {/* <div className="d-flex gap-2">
                    <Button variant="primary">Edit Profile</Button>
                    <Button variant="outline-danger">Logout</Button>
                  </div> */}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileComponent;
